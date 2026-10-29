import React from 'react';

/**
 * Official WhatsApp Brand Logo
 * Standard WhatsApp brand colors & speech bubble phone glyph
 */
export function WhatsAppLogo({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="WhatsApp"
      {...props}
    >
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <path
        fill="#FFFFFF"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.04 4.5C7.9 4.5 4.54 7.86 4.54 12C4.54 13.33 4.89 14.62 5.54 15.75L4.5 19.5L8.38 18.49C9.48 19.09 10.73 19.5 12.04 19.5C16.18 19.5 19.54 16.14 19.54 12C19.54 10 18.76 8.12 17.34 6.7C15.92 5.28 14.04 4.5 12.04 4.5ZM16.2 13.88C15.97 13.77 14.85 13.22 14.64 13.14C14.43 13.06 14.28 13.02 14.13 13.25C13.98 13.48 13.55 13.99 13.42 14.14C13.29 14.29 13.15 14.31 12.92 14.2C12.69 14.09 11.96 13.85 11.09 13.07C10.41 12.46 9.95 11.71 9.82 11.48C9.69 11.25 9.81 11.13 9.92 11.02C10.02 10.92 10.15 10.76 10.27 10.63C10.38 10.49 10.42 10.4 10.5 10.25C10.58 10.1 10.54 9.97 10.49 9.85C10.43 9.74 9.99 8.66 9.81 8.22C9.63 7.79 9.45 7.85 9.31 7.85C9.19 7.84 9.04 7.84 8.89 7.84C8.74 7.84 8.5 7.9 8.3 8.11C8.09 8.33 7.52 8.87 7.52 9.97C7.52 11.07 8.32 12.13 8.43 12.28C8.54 12.43 10.01 14.69 12.25 15.66C12.78 15.89 13.2 16.03 13.53 16.13C14.06 16.3 14.55 16.28 14.93 16.22C15.36 16.16 16.25 15.68 16.43 15.16C16.62 14.64 16.62 14.19 16.56 14.1C16.5 14.01 16.39 13.96 16.2 13.88Z"
      />
    </svg>
  );
}

/**
 * Official Google Gmail Multi-Color Logo
 * Official Google 4-color palette (Blue, Red, Yellow, Green)
 */
export function GmailLogo({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Gmail"
      {...props}
    >
      {/* Background shadow M */}
      <path
        fill="#4285F4"
        d="M2.5 18.5V6.75C2.5 5.78 3.28 5 4.25 5H6V11.5L2.5 8.75V18.5Z"
      />
      {/* Right Blue/Green flap */}
      <path
        fill="#34A853"
        d="M21.5 18.5V6.75C21.5 5.78 20.72 5 19.75 5H18V11.5L21.5 8.75V18.5Z"
      />
      {/* Central Red Fold */}
      <path
        fill="#EA4335"
        d="M18 5H6L12 10.5L18 5Z"
      />
      {/* Left Red & Yellow Blend */}
      <path
        fill="#FBBC04"
        d="M2.5 6.75C2.5 5.78 3.28 5 4.25 5H6L2.5 8.75V6.75Z"
      />
      {/* Right Red & Dark Red Blend */}
      <path
        fill="#C5221F"
        d="M21.5 6.75C21.5 5.78 20.72 5 19.75 5H18L21.5 8.75V6.75Z"
      />
      {/* Main Mail Envelope Body */}
      <path
        fill="#4285F4"
        d="M6 11.5V19H4.25C3.28 19 2.5 18.22 2.5 17.25V8.75L6 11.5Z"
      />
      <path
        fill="#34A853"
        d="M18 11.5V19H19.75C20.72 19 21.5 18.22 21.5 17.25V8.75L18 11.5Z"
      />
      {/* Bottom Center White-Cut / Red fold */}
      <path
        fill="#EA4335"
        d="M6 11.5L12 16L18 11.5V19H6V11.5Z"
      />
    </svg>
  );
}

/**
 * Official Phone Call Dialer Logo
 * Vibrant Blue/Cyan circular badge with high-gloss white handset
 */
export function PhoneDialerLogo({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Phone Call"
      {...props}
    >
      <circle cx="12" cy="12" r="12" fill="#00AAEE" />
      <path
        fill="#FFFFFF"
        d="M16.5 13.97C16.14 13.77 15.3 13.35 15.07 13.25C14.84 13.15 14.68 13.1 14.52 13.34C14.36 13.58 13.8 14.26 13.63 14.45C13.46 14.65 13.29 14.67 12.93 14.49C12.57 14.31 11.41 13.93 10.03 12.71C8.96 11.76 8.23 10.59 8.03 10.23C7.83 9.87 8.01 9.68 8.19 9.5C8.35 9.34 8.55 9.08 8.73 8.88C8.91 8.67 8.97 8.52 9.09 8.28C9.21 8.04 9.15 7.83 9.06 7.65C8.97 7.47 8.28 5.77 7.99 5.07C7.71 4.39 7.42 4.48 7.21 4.47H6.55C6.32 4.47 5.95 4.56 5.63 4.9C5.31 5.25 4.41 6.1 4.41 7.82C4.41 9.55 5.67 11.22 5.85 11.45C6.02 11.69 8.33 15.23 11.85 16.75C14.5 17.9 15.37 17.7 16 17.6C16.63 17.5 18.03 16.73 18.32 15.93C18.61 15.13 18.61 14.44 18.52 14.3C18.43 14.16 18.27 14.07 17.91 13.88L16.5 13.97Z"
      />
    </svg>
  );
}

/**
 * Official Google Maps Pin Logo
 * Multi-color Google pin logo
 */
export function GoogleMapsLogo({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Google Maps"
      {...props}
    >
      <circle cx="12" cy="12" r="12" fill="#FFFFFF" />
      <path
        fill="#EA4335"
        d="M12 4C8.69 4 6 6.69 6 10C6 14.25 12 20 12 20S18 14.25 18 10C18 6.69 15.31 4 12 4ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z"
      />
      <circle cx="12" cy="10" r="2.2" fill="#FFFFFF" />
    </svg>
  );
}
