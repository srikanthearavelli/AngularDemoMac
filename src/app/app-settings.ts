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
export function validatePasswordHash(password: string, storedHash: string): boolean {
  const inputHash = simpleHash(password);
  return inputHash === storedHash;
}

// Simple hash function (for demo purposes)
// In production, use proper encryption libraries like bcrypt
function simpleHash(str: string): string {
  let hash = 0;
  if (str.length === 0) return hash.toString();
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(16);
} 