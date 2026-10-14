import emailjs from '@emailjs/browser';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

// EmailJS Configuration from Vite Environment Variables with exact requested fallbacks
const getEnvVar = (key: string, fallback: string): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return String(import.meta.env[key]).trim();
  }
  return fallback;
};

const EMAILJS_SERVICE_ID = getEnvVar('VITE_EMAILJS_SERVICE_ID', 'service_8t9hii7');
const EMAILJS_TEMPLATE_ID = getEnvVar('VITE_EMAILJS_TEMPLATE_ID', 'template_5cr2p9r');
const EMAILJS_PUBLIC_KEY = getEnvVar('VITE_EMAILJS_PUBLIC_KEY', 'NRR8qm8gASuExLMKY');
export const OFFICIAL_ENQUIRY_RECIPIENT = 'adityafoodsandmedia.it@gmail.com';

// Local storage rate-limiting key
const RATE_LIMIT_KEY = 'afm_last_enquiry_ts';
const MIN_SUBMISSION_INTERVAL_MS = 8000; // 8 seconds between submissions from same client

export interface EnquiryInput {
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  enquiryType: 'product' | 'consultation' | 'media' | 'general' | string;
  relatedItem?: string;
  message: string;
  preferredContact?: 'whatsapp' | 'email' | 'phone';
  honeypot?: string; // Hidden bot trap field
}

export interface EnquiryMetadataRecord {
  referenceNumber: string;
  enquiryType: string;
  createdAt: string;
  emailDeliveryStatus: 'delivered';
  channel: 'emailjs';
}

export type SubmissionResult =
  | {
      success: true;
      referenceNumber: string;
      status: 'fully_completed';
    }
  | {
      success: true;
      referenceNumber: string;
      status: 'email_sent_db_failed';
      warningMessageEn: string;
      warningMessageOr: string;
    }
  | {
      success: false;
      errorType: 'VALIDATION_ERROR' | 'RATE_LIMITED' | 'EMAIL_FAILED';
      messageEn: string;
      messageOr: string;
    };

/**
 * Generates a clean, unique enquiry reference code.
 * Example: AFM-20261014-9X2K
 */
export function generateEnquiryReference(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateSegment = `${year}${month}${day}`;
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AFM-${dateSegment}-${randomChars}`;
}

/**
 * Validates form inputs for length, format, and spam checks.
 */
export function validateEnquiryInput(input: EnquiryInput): { valid: boolean; errorEn?: string; errorOr?: string } {
  // 1. Anti-spam honeypot detection
  if (input.honeypot && input.honeypot.trim().length > 0) {
    return {
      valid: false,
      errorEn: 'Submission rejected by security verification.',
      errorOr: 'ସୁରକ୍ଷା ଯାଞ୍ଚ ଦ୍ୱାରା ଅନୁରୋଧ ପ୍ରତ୍ୟାଖ୍ୟାନ କରାଗଲା।',
    };
  }

  // 2. Client-side rate-limiting check
  try {
    const lastTimestamp = localStorage.getItem(RATE_LIMIT_KEY);
    if (lastTimestamp) {
      const elapsed = Date.now() - parseInt(lastTimestamp, 10);
      if (elapsed < MIN_SUBMISSION_INTERVAL_MS) {
        return {
          valid: false,
          errorEn: 'Please wait a few seconds before submitting another enquiry.',
          errorOr: 'ଦୟାକରି ଅନ୍ୟ ଏକ ଅନୁରୋଧ ପଠାଇବା ପୂର୍ବରୁ କିଛି ସେକେଣ୍ଡ ଅପେକ୍ଷା କରନ୍ତୁ।',
        };
      }
    }
  } catch {
    // Ignore localStorage access restrictions
  }

  // 3. Name validation
  const trimmedName = (input.name || '').trim();
  if (trimmedName.length < 2 || trimmedName.length > 100) {
    return {
      valid: false,
      errorEn: 'Please enter a valid full name (2–100 characters).',
      errorOr: 'ଦୟାକରି ଏକ ବୈଧ ନାମ ପ୍ରଦାନ କରନ୍ତୁ (୨-୧୦୦ ଅକ୍ଷର)।',
    };
  }

  // 4. Email format validation (RFC-5322 simplified)
  const trimmedEmail = (input.email || '').trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 120) {
    return {
      valid: false,
      errorEn: 'Please enter a valid email address.',
      errorOr: 'ଦୟାକରି ଏକ ବୈଧ ଇମେଲ୍ ଠିକଣା ପ୍ରଦାନ କରନ୍ତୁ।',
    };
  }

  // 5. Phone validation (allows +, spaces, brackets, hyphens, min 7 digits, max 20 characters)
  const trimmedPhone = (input.phone || '').trim();
  const digitsOnly = trimmedPhone.replace(/\D/g, '');
  if (digitsOnly.length < 7 || trimmedPhone.length > 25) {
    return {
      valid: false,
      errorEn: 'Please enter a valid telephone or mobile number.',
      errorOr: 'ଦୟାକରି ଏକ ବୈଧ ଫୋନ୍ ନମ୍ବର ପ୍ରଦାନ କରନ୍ତୁ।',
    };
  }

  // 6. Message validation
  const trimmedMessage = (input.message || '').trim();
  if (trimmedMessage.length < 5 || trimmedMessage.length > 3000) {
    return {
      valid: false,
      errorEn: 'Please provide message or project details (5–3,000 characters).',
      errorOr: 'ଦୟାକରି ଆପଣଙ୍କ ବାର୍ତ୍ତା କିମ୍ବା ପ୍ରୋଜେକ୍ଟ ବିବରଣୀ ପ୍ରଦାନ କରନ୍ତୁ।',
    };
  }

  return { valid: true };
}

/**
 * Sends an email notification via EmailJS to adityafoodsandmedia.it@gmail.com
 * Never logs user PII to the console.
 */
async function sendEmailViaEmailJS(
  input: EnquiryInput,
  referenceNumber: string
): Promise<{ success: boolean; error?: unknown }> {
  const now = new Date();
  const submissionDate = now.toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const submissionTime = now.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  // Comprehensive template parameters matching any EmailJS template mapping
  const templateParams: Record<string, string> = {
    to_email: OFFICIAL_ENQUIRY_RECIPIENT,
    recipient_email: OFFICIAL_ENQUIRY_RECIPIENT,
    reference_number: referenceNumber,
    reference_id: referenceNumber,
    from_name: input.name.trim(),
    user_name: input.name.trim(),
    from_email: input.email.trim(),
    user_email: input.email.trim(),
    reply_to: input.email.trim(),
    phone: input.phone.trim(),
    user_phone: input.phone.trim(),
    business_name: (input.businessName || 'Not specified').trim(),
    enquiry_type: input.enquiryType,
    related_item: (input.relatedItem || 'General Enquiry').trim(),
    preferred_contact: input.preferredContact || 'whatsapp',
    message: input.message.trim(),
    submission_date: submissionDate,
    submission_time: submissionTime,
    timestamp: `${submissionDate} at ${submissionTime} IST`,
  };

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      {
        publicKey: EMAILJS_PUBLIC_KEY,
      }
    );

    if (response.status === 200 || response.text === 'OK') {
      return { success: true };
    }
    return { success: false, error: new Error(`EmailJS responded with status: ${response.status}`) };
  } catch (err: unknown) {
    // Note: Do not log personal input contents
    console.error('Email transmission encountered a service error.');
    return { success: false, error: err };
  }
}

/**
 * Stores ONLY operational metadata (reference number, timestamp, delivery status) in Firebase Firestore.
 * Strictly avoids storing visitor's name, email, phone, message or PII.
 */
async function recordMetadataInFirebase(referenceNumber: string, enquiryType: string): Promise<boolean> {
  try {
    const metadataDoc: EnquiryMetadataRecord = {
      referenceNumber,
      enquiryType,
      createdAt: new Date().toISOString(),
      emailDeliveryStatus: 'delivered',
      channel: 'emailjs',
    };

    // Store in the enquiries collection using referenceNumber as document ID
    const docRef = doc(db, 'enquiries', referenceNumber);
    await setDoc(docRef, metadataDoc);
    return true;
  } catch (err: unknown) {
    // Safe operational logging without exposing user information
    console.error('Firebase operational metadata recording error for ref:', referenceNumber);
    return false;
  }
}

/**
 * Unified submission workflow complying with all privacy, security and handover rules:
 * 1. Validate inputs.
 * 2. Generate unique reference.
 * 3. Send email to adityafoodsandmedia.it@gmail.com via EmailJS.
 * 4. Record operational metadata in Firebase only upon email success.
 * 5. Handle all failure and partial-success scenarios gracefully.
 */
export async function processEnquirySubmission(input: EnquiryInput): Promise<SubmissionResult> {
  // Step 1: Input validation
  const validation = validateEnquiryInput(input);
  if (!validation.valid) {
    return {
      success: false,
      errorType: 'VALIDATION_ERROR',
      messageEn: validation.errorEn || 'Please verify form fields.',
      messageOr: validation.errorOr || 'ଦୟାକରି ଫର୍ମ ତଥ୍ୟ ଯାଞ୍ଚ କରନ୍ତୁ।',
    };
  }

  // Step 2: Generate unique reference number
  const referenceNumber = generateEnquiryReference();

  // Step 3: Send email through EmailJS
  const emailResult = await sendEmailViaEmailJS(input, referenceNumber);
  if (!emailResult.success) {
    return {
      success: false,
      errorType: 'EMAIL_FAILED',
      messageEn:
        'Unable to send your enquiry email at this moment. Please check your network connection or contact us directly via WhatsApp / phone. Please do not submit repeatedly.',
      messageOr:
        'ଏହି ମୁହୂର୍ତ୍ତରେ ଆପଣଙ୍କ ଅନୁରୋଧ ଇମେଲ୍ ପଠାଯାଇପାରିଲା ନାହିଁ। ଦୟାକରି ଆପଣଙ୍କ ଇଣ୍ଟରନେଟ୍ ଯାଞ୍ଚ କରନ୍ତୁ କିମ୍ବା ସିଧାସଳଖ ହ୍ୱାଟ୍ସଆପ୍ / ଫୋନ୍ ମାଧ୍ୟମରେ ଯୋଗାଯୋଗ କରନ୍ତୁ।',
    };
  }

  // Record submission timestamp for client rate-limiting
  try {
    localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
  } catch {
    // Ignore localStorage write error
  }

  // Step 4: Record reference number and operational metadata in Firebase
  const firebaseSuccess = await recordMetadataInFirebase(referenceNumber, input.enquiryType);

  if (firebaseSuccess) {
    return {
      success: true,
      referenceNumber,
      status: 'fully_completed',
    };
  }

  // Step 5: Handling email success with Firebase write failure
  return {
    success: true,
    referenceNumber,
    status: 'email_sent_db_failed',
    warningMessageEn:
      'Your enquiry was successfully delivered to our team via email. However, recording the reference in our database encountered a temporary issue. Our team has received your message and will contact you shortly. Please DO NOT resubmit the form to avoid sending duplicate emails.',
    warningMessageOr:
      'ଆପଣଙ୍କ ଅନୁରୋଧ ସଫଳତାର ସହିତ ଆମ ଟିମ୍‌କୁ ଇମେଲ୍ ମାଧ୍ୟମରେ ପଠାଯାଇଛି। କିନ୍ତୁ ଡାଟାବେସ୍‌ରେ ସନ୍ଦର୍ଭ ପଞ୍ଜୀକରଣରେ ଏକ ସାମୟିକ ସମସ୍ୟା ଦେଖାଦେଇଛି। ଆମ ଟିମ୍ ଆପଣଙ୍କ ବାର୍ତ୍ତା ପାଇସାରିଛନ୍ତି ଏବଂ ଶୀଘ୍ର ଯୋଗାଯୋଗ କରିବେ। ଦୟାକରି ପୁନର୍ବାର ଫର୍ମ ଦାଖଲ କରନ୍ତୁ ନାହିଁ।',
  };
}
