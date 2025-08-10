export interface DecodedGoogleUser {
    iss: string; // Issuer (accounts.google.com)
    azp: string; // Authorized party (client_id)
    aud: string; // Audience (your Google client ID)
    sub: string; // Google user ID (unique per account)
    email: string;
    email_verified: boolean;
    name?: string; // Full name
    picture?: string; // Profile picture URL
    given_name?: string;
    family_name?: string;
    locale?: string;
    iat: number; // Issued at (UNIX timestamp)
    exp: number; // Expiration time (UNIX timestamp)
  }
  