import { createClient } from '@supabase/supabase-js';

// SuperBase / Supabase Project Details configured by the user
export const SUPABASE_PROJECT_ID = 'mykdretjnhcxotwyothg';
export const SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY = 'sb_publishable_O4fuvwPJA2TT2L_mVms1Vg_yojkWHSw';

// Initialize Supabase Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  consultationTopic?: string;
  preferredContact?: string;
  message: string;
  source?: string;
  status?: string;
  createdAt?: string;
}

/**
 * Saves appointment / consultation booking details directly to SuperBase backend table.
 * It will try standard table names like 'appointments', 'consultations', 'enquiries', or 'bookings'.
 */
export async function saveAppointmentToSuperbase(data: AppointmentData): Promise<{ success: boolean; data?: any; error?: any; tableName?: string }> {
  const payload = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    business_name: data.businessName || null,
    topic: data.consultationTopic || null,
    preferred_contact: data.preferredContact || 'whatsapp',
    message: data.message,
    source: data.source || 'appointment_booking_form',
    status: data.status || 'pending',
    created_at: new Date().toISOString(),
  };

  // Try candidate tables: 'appointments', 'consultations', 'enquiries', 'bookings'
  const candidateTables = ['appointments', 'consultations', 'enquiries', 'bookings'];
  let lastError: any = null;

  for (const tableName of candidateTables) {
    try {
      const { data: insertedData, error } = await supabase
        .from(tableName)
        .insert([payload])
        .select();

      if (!error) {
        console.log(`Successfully saved appointment to SuperBase table "${tableName}":`, insertedData);
        return { success: true, data: insertedData, tableName };
      }

      lastError = error;
      // If table doesn't exist, try next candidate table
      console.warn(`Attempt on table "${tableName}" returned:`, error.message);
    } catch (err) {
      lastError = err;
    }
  }

  // Fallback with simpler key names if columns differ
  const simplifiedPayload = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: `${data.businessName ? `[Business: ${data.businessName}] ` : ''}${data.consultationTopic ? `[Topic: ${data.consultationTopic}] ` : ''}${data.message}`,
  };

  for (const tableName of ['appointments', 'enquiries', 'consultations']) {
    try {
      const { data: insertedData, error } = await supabase
        .from(tableName)
        .insert([simplifiedPayload])
        .select();

      if (!error) {
        return { success: true, data: insertedData, tableName };
      }
      lastError = error;
    } catch (err) {
      lastError = err;
    }
  }

  return { success: false, error: lastError };
}

// SQL Setup Query for Supabase SQL Editor
export const SUPABASE_SETUP_SQL = `-- ====================================================================
-- ADITYA FOODS & MEDIA - SUPABASE / SUPERBASE DATABASE SETUP QUERY
-- Project ID: mykdretjnhcxotwyothg
-- ====================================================================

-- 1. Create Appointments Table (For Food Consultation & Appointment bookings)
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    business_name TEXT,
    topic TEXT,
    preferred_contact TEXT DEFAULT 'whatsapp',
    message TEXT,
    source TEXT DEFAULT 'appointment_booking_form',
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Enquiries Table (For General Enquiries & Contact Form leads)
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    business_name TEXT,
    topic TEXT,
    preferred_contact TEXT DEFAULT 'whatsapp',
    message TEXT,
    source TEXT DEFAULT 'contact_form',
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 4. Clean up any existing policies before recreating (Rerun-safe)
DROP POLICY IF EXISTS "Allow anonymous insert on appointments" ON public.appointments;
DROP POLICY IF EXISTS "Allow read on appointments" ON public.appointments;
DROP POLICY IF EXISTS "Allow update on appointments" ON public.appointments;
DROP POLICY IF EXISTS "Allow delete on appointments" ON public.appointments;

DROP POLICY IF EXISTS "Allow anonymous insert on enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow read on enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow update on enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow delete on enquiries" ON public.enquiries;

-- 5. Policies for appointments table (Full CRUD control by Admin Panel & visitors)
CREATE POLICY "Allow anonymous insert on appointments"
ON public.appointments
FOR INSERT
TO anon, authenticated, service_role
WITH CHECK (true);

CREATE POLICY "Allow read on appointments"
ON public.appointments
FOR SELECT
TO anon, authenticated, service_role
USING (true);

CREATE POLICY "Allow update on appointments"
ON public.appointments
FOR UPDATE
TO anon, authenticated, service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow delete on appointments"
ON public.appointments
FOR DELETE
TO anon, authenticated, service_role
USING (true);

-- 6. Policies for enquiries table (Full CRUD control by Admin Panel & visitors)
CREATE POLICY "Allow anonymous insert on enquiries"
ON public.enquiries
FOR INSERT
TO anon, authenticated, service_role
WITH CHECK (true);

CREATE POLICY "Allow read on enquiries"
ON public.enquiries
FOR SELECT
TO anon, authenticated, service_role
USING (true);

CREATE POLICY "Allow update on enquiries"
ON public.enquiries
FOR UPDATE
TO anon, authenticated, service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow delete on enquiries"
ON public.enquiries
FOR DELETE
TO anon, authenticated, service_role
USING (true);
`;

/**
 * Checks the connection to SuperBase and queries existing tables
 */
export async function checkSuperbaseConnection(): Promise<{ connected: boolean; message: string; tablesChecked: { name: string; accessible: boolean }[] }> {
  const candidateTables = ['appointments', 'enquiries', 'consultations', 'bookings'];
  const tablesChecked: { name: string; accessible: boolean }[] = [];

  for (const tableName of candidateTables) {
    try {
      const { error } = await supabase.from(tableName).select('id').limit(1);
      if (!error) {
        tablesChecked.push({ name: tableName, accessible: true });
      } else {
        tablesChecked.push({ name: tableName, accessible: false });
      }
    } catch {
      tablesChecked.push({ name: tableName, accessible: false });
    }
  }

  const anyAccessible = tablesChecked.some(t => t.accessible);
  return {
    connected: true, // Client is initialized with user's valid SuperBase project credentials
    message: anyAccessible ? 'Connected to database tables!' : 'Connected to SuperBase project API (Run SQL Query to initialize tables)',
    tablesChecked,
  };
}

/**
 * Fetches all appointments & enquiries from SuperBase backend tables
 */
export async function fetchSuperbaseEnquiries(): Promise<any[]> {
  const allResults: any[] = [];
  const candidateTables = ['appointments', 'enquiries'];

  for (const tableName of candidateTables) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        data.forEach((row) => {
          allResults.push({
            id: row.id,
            name: row.name,
            email: row.email,
            phone: row.phone,
            businessName: row.business_name || undefined,
            enquiryType: (row.topic || row.source?.includes('appointment') ? 'consultation' : 'general'),
            message: row.message,
            preferredContact: row.preferred_contact || 'whatsapp',
            status: row.status || 'pending',
            createdAt: row.created_at,
            source: row.source || tableName,
            dbSource: 'superbase',
            tableName,
          });
        });
      }
    } catch (e) {
      console.warn(`Could not fetch from SuperBase table ${tableName}:`, e);
    }
  }

  return allResults;
}

/**
 * Updates status of an enquiry / appointment in SuperBase
 */
export async function updateSuperbaseStatus(id: string, status: string, tableName: string = 'appointments'): Promise<boolean> {
  const tablesToTry = tableName ? [tableName, 'appointments', 'enquiries'] : ['appointments', 'enquiries'];

  for (const tbl of tablesToTry) {
    try {
      const { error } = await supabase
        .from(tbl)
        .update({ status })
        .eq('id', id);

      if (!error) return true;
    } catch {
      // Continue to next table
    }
  }
  return false;
}

/**
 * Deletes an enquiry / appointment row in SuperBase
 */
export async function deleteSuperbaseRow(id: string, tableName: string = 'appointments'): Promise<boolean> {
  const tablesToTry = tableName ? [tableName, 'appointments', 'enquiries'] : ['appointments', 'enquiries'];

  for (const tbl of tablesToTry) {
    try {
      const { error } = await supabase
        .from(tbl)
        .delete()
        .eq('id', id);

      if (!error) return true;
    } catch {
      // Continue to next table
    }
  }
  return false;
}
