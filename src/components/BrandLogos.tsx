import React from 'react';
import mainLogoImg from '../assets/images/aditya_main_logo_1790692269495.jpg';
import foodsEmblemImg from '../assets/images/aditya_foods_emblem_1790692289869.jpg';
import mediaEmblemImg from '../assets/images/aditya_media_emblem_1790692305095.jpg';

export { mainLogoImg, foodsEmblemImg, mediaEmblemImg };

interface LogoProps {
  className?: string;
  size?: number | string;
  useImage?: boolean;
}

/**
 * Official Aditya Foods & Media Circular Emblem
 * Matches the uploaded WhatsApp-Image-2026-09-27-at-10.58.40-AM-Photoroom.png
 */
export const AdityaMainLogo: React.FC<LogoProps> = ({
  className = 'w-12 h-12',
  useImage = false,
}) => {
  if (useImage) {
    return (
      <img
        src={mainLogoImg}
        alt="Aditya Foods & Media Logo"
        className={`rounded-full object-cover shadow-lg ${className}`}
      />
    );
  }

  // 32 radiant sun rays
  const rays = Array.from({ length: 32 }, (_, i) => {
    const angle = (i * 360) / 32;
    const isLong = i % 2 === 0;
    const r1 = 30;
    const r2 = isLong ? 48 : 42;
    const rad = (angle * Math.PI) / 180;
    const radLeft = ((angle - 4) * Math.PI) / 180;
    const radRight = ((angle + 4) * Math.PI) / 180;

    const x1 = 100 + r1 * Math.cos(radLeft);
    const y1 = 100 + r1 * Math.sin(radLeft);
    const x2 = 100 + r2 * Math.cos(rad);
    const y2 = 100 + r2 * Math.sin(rad);
    const x3 = 100 + r1 * Math.cos(radRight);
    const y3 = 100 + r1 * Math.sin(radRight);

    return `${x1},${y1} ${x2},${y2} ${x3},${y3}`;
  });

  return (
    <svg
      viewBox="0 0 200 200"
      className={`shrink-0 drop-shadow-md select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Radial Sun Gradient */}
        <radialGradient id="sunGlow" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFF4B8" />
          <stop offset="45%" stopColor="#F5B81C" />
          <stop offset="85%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#9A4802" />
        </radialGradient>

        {/* Brown Emblem Gradient */}
        <radialGradient id="emblemBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6C2814" />
          <stop offset="70%" stopColor="#551F0F" />
          <stop offset="100%" stopColor="#43170B" />
        </radialGradient>

        {/* Curved Text Paths */}
        {/* Top Arc for ADITYA (clockwise over the top from left to right) */}
        <path
          id="topArc"
          d="M 28 100 A 72 72 0 0 1 172 100"
          fill="none"
        />
        {/* Bottom Arc for FOOD & MEDIA (clockwise along the bottom from left to right) */}
        <path
          id="bottomArc"
          d="M 22 100 A 78 78 0 0 0 178 100"
          fill="none"
        />
      </defs>

      {/* Main Brown Disc */}
      <circle cx="100" cy="100" r="97" fill="url(#emblemBg)" stroke="#391206" strokeWidth="2" />

      {/* Outer border ring */}
      <circle cx="100" cy="100" r="92" fill="none" stroke="#87371D" strokeWidth="1" opacity="0.6" />

      {/* Sun Ray Spikes */}
      <g fill="#E59E15">
        {rays.map((points, idx) => (
          <polygon key={idx} points={points} fill={idx % 2 === 0 ? '#F3B423' : '#D98207'} />
        ))}
      </g>

      {/* Sun Sphere with Glow */}
      <circle
        cx="100"
        cy="100"
        r="28"
        fill="url(#sunGlow)"
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
      />
      {/* Sun Specular Highlight */}
      <ellipse cx="94" cy="92" rx="10" ry="7" fill="#FFFFFF" opacity="0.35" />

      {/* Top Arched Text: ADITYA */}
      <text
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontWeight="900"
        fontSize="21"
        fill="#FFFFFF"
        letterSpacing="4.5"
      >
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">
          ADITYA
        </textPath>
      </text>

      {/* Bottom Arched Text: FOOD & MEDIA */}
      <text
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontWeight="800"
        fontSize="14"
        fill="#FFFFFF"
        letterSpacing="3.5"
      >
        <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
          FOOD &amp; MEDIA
        </textPath>
      </text>
    </svg>
  );
};

/**
 * Official Aditya Foods Red Shield Badge
 * Matches Food_joz4if-Photoroom.png with Odia Script and "FOODS"
 */
export const AdityaFoodsBadge: React.FC<LogoProps> = ({
  className = 'w-44 h-auto',
  useImage = false,
}) => {
  if (useImage) {
    return (
      <img
        src={foodsEmblemImg}
        alt="Aditya Foods Official Emblem"
        className={`object-contain ${className}`}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 280 200"
      className={`shrink-0 select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="redBadgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E50914" />
          <stop offset="50%" stopColor="#C4050D" />
          <stop offset="100%" stopColor="#870207" />
        </linearGradient>
        <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.4" floodColor="#000000" />
        </filter>
      </defs>

      {/* Leaf / Shield Body */}
      <path
        d="M 140 188 C 65 188 15 152 15 100 C 15 48 65 12 140 12 C 220 12 265 42 265 75 C 265 65 240 45 220 45 C 190 45 200 85 245 85 C 265 85 265 125 240 152 C 210 185 180 188 140 188 Z"
        fill="url(#redBadgeGradient)"
        stroke="#FFCC00"
        strokeWidth="3.5"
        filter="url(#badgeShadow)"
      />

      {/* Sunburst Rays on the Left */}
      <g fill="#FFD700" stroke="#FFCC00" strokeWidth="0.5">
        <polygon points="26,102 46,101 26,98" />
        <polygon points="28,88 48,90 29,84" />
        <polygon points="33,74 51,80 34,70" />
        <polygon points="41,61 57,70 42,57" />
        <polygon points="52,49 65,62 53,46" />
        <polygon points="66,39 76,55 67,37" />
        <polygon points="82,32 88,50 83,30" />
        <polygon points="101,27 102,46 102,26" />
        <polygon points="28,116 48,112 28,120" />
        <polygon points="34,130 52,123 33,134" />
        <polygon points="43,143 59,133 41,147" />
        <polygon points="56,155 68,142 54,159" />
        <polygon points="72,165 80,150 70,169" />
        <polygon points="90,172 94,155 88,175" />
      </g>

      {/* Stylized Odia Script: "ଆଦିତ୍ୟ" (Aditya) */}
      <text
        x="152"
        y="114"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', 'Noto Sans Oriya', 'Kalinga', sans-serif"
        fontWeight="900"
        fontSize="58"
        fill="#FFFFFF"
        letterSpacing="2"
        filter="drop-shadow(0 2px 3px rgba(0,0,0,0.4))"
      >
        ଆଦିତ୍ୟ
      </text>

      {/* Sub-Brand Text: FOODS */}
      <text
        x="148"
        y="148"
        textAnchor="middle"
        fontFamily="'Cinzel', Georgia, serif"
        fontWeight="800"
        fontSize="21"
        fill="#FFDE00"
        letterSpacing="3.5"
      >
        FOODS
      </text>

      {/* White underline */}
      <line
        x1="98"
        y1="156"
        x2="238"
        y2="156"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Official Aditya Media Red Shield Badge
 * Matches Media_khh7pa-Photoroom.png with Odia Script and "MEDIA"
 */
export const AdityaMediaBadge: React.FC<LogoProps> = ({
  className = 'w-44 h-auto',
  useImage = false,
}) => {
  if (useImage) {
    return (
      <img
        src={mediaEmblemImg}
        alt="Aditya Media Official Emblem"
        className={`object-contain ${className}`}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 280 200"
      className={`shrink-0 select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="redMediaBadgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E50914" />
          <stop offset="50%" stopColor="#C4050D" />
          <stop offset="100%" stopColor="#870207" />
        </linearGradient>
        <filter id="mediaBadgeShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.4" floodColor="#000000" />
        </filter>
      </defs>

      {/* Leaf / Shield Body */}
      <path
        d="M 140 188 C 65 188 15 152 15 100 C 15 48 65 12 140 12 C 220 12 265 42 265 75 C 265 65 240 45 220 45 C 190 45 200 85 245 85 C 265 85 265 125 240 152 C 210 185 180 188 140 188 Z"
        fill="url(#redMediaBadgeGradient)"
        stroke="#FFCC00"
        strokeWidth="3.5"
        filter="url(#mediaBadgeShadow)"
      />

      {/* Sunburst Rays on the Left */}
      <g fill="#FFD700" stroke="#FFCC00" strokeWidth="0.5">
        <polygon points="26,102 46,101 26,98" />
        <polygon points="28,88 48,90 29,84" />
        <polygon points="33,74 51,80 34,70" />
        <polygon points="41,61 57,70 42,57" />
        <polygon points="52,49 65,62 53,46" />
        <polygon points="66,39 76,55 67,37" />
        <polygon points="82,32 88,50 83,30" />
        <polygon points="101,27 102,46 102,26" />
        <polygon points="28,116 48,112 28,120" />
        <polygon points="34,130 52,123 33,134" />
        <polygon points="43,143 59,133 41,147" />
        <polygon points="56,155 68,142 54,159" />
        <polygon points="72,165 80,150 70,169" />
        <polygon points="90,172 94,155 88,175" />
      </g>

      {/* Stylized Odia Script: "ଆଦିତ୍ୟ" (Aditya) */}
      <text
        x="152"
        y="114"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', 'Noto Sans Oriya', 'Kalinga', sans-serif"
        fontWeight="900"
        fontSize="58"
        fill="#FFFFFF"
        letterSpacing="2"
        filter="drop-shadow(0 2px 3px rgba(0,0,0,0.4))"
      >
        ଆଦିତ୍ୟ
      </text>

      {/* Sub-Brand Text: MEDIA */}
      <text
        x="148"
        y="148"
        textAnchor="middle"
        fontFamily="'Cinzel', Georgia, serif"
        fontWeight="800"
        fontSize="21"
        fill="#FFDE00"
        letterSpacing="3.5"
      >
        MEDIA
      </text>

      {/* White underline */}
      <line
        x1="98"
        y1="156"
        x2="238"
        y2="156"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
