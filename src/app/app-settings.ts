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
      // SHA-256 hash of 'test123' - in production, use bcrypt or similar
      passwordHash: 'ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae'
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
  // Use built-in browser crypto API for SHA-256 hashing
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    return sha256Hash(password).then(hash => hash === storedHash);
  } else {
    // Unsupported environment
    console.error('SHA-256 hashing is not supported in this environment.');
    return Promise.resolve(false);
  }
}

// Helper for browser SHA-256 hashing
function sha256Hash(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  return window.crypto.subtle.digest('SHA-256', data).then(buffer => {
    return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  });
}
// Removed custom simpleHash function; now using SHA-256