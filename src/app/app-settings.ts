export interface AppSettings {
  auth: {
    demoCredentials: {
      username: string;
      passwordHash: string;
    };
    sessionTimeout: number; // in minutes
  };
  api: {
    baseUrl: string;
    timeout: number; // in milliseconds
  };
  features: {
    enableLogging: boolean;
    enableAnalytics: boolean;
  };
}

export const APP_SETTINGS: AppSettings = {
  auth: {
    demoCredentials: {
      username: 'test',
      // SHA-1 hash of 'test123' - in production, use bcrypt or similar
      passwordHash: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'
    },
    sessionTimeout: 30 // 30 minutes
  },
  api: {
    baseUrl: 'https://api.example.com',
    timeout: 10000 // 10 seconds
  },
  features: {
    enableLogging: true,
    enableAnalytics: false
  }
};

// Helper function to get auth settings
export function getAuthSettings() {
  return APP_SETTINGS.auth;
}

// Helper function to get demo credentials
export function getDemoCredentials() {
  return APP_SETTINGS.auth.demoCredentials;
}

// Helper function to validate password hash
export function validatePasswordHash(password: string, storedHash: string): Promise<boolean> {
  // Use built-in browser crypto API for SHA-1 hashing
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    return sha1Hash(password).then(hash => hash === storedHash);
  } else {
    // Unsupported environment
    console.error('SHA-1 hashing is not supported in this environment.');
    return Promise.resolve(false);
  }
}

// Helper for browser SHA-1 hashing
function sha1Hash(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  return window.crypto.subtle.digest('SHA-1', data).then(buffer => {
    return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  });
}
// Removed custom simpleHash function; now using SHA-1