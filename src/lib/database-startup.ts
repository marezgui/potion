import { initializeDatabase, isDatabaseInitialized } from './database';

let startupComplete = false;

export const initializeDatabaseOnStartup = (): void => {
  if (startupComplete) {
    return;
  }

  try {
    console.log('🚀 Starting in-memory database initialization...');
    
    if (!isDatabaseInitialized()) {
      initializeDatabase();
      console.log('✅ In-memory database successfully initialized');
    } else {
      console.log('ℹ️  Database already initialized');
    }
    
    startupComplete = true;
  } catch (error) {
    console.error('❌ Failed to initialize database on startup:', error);
    throw error;
  }
};

export const isStartupComplete = (): boolean => startupComplete;

export const resetStartupFlag = (): void => {
  startupComplete = false;
};

if (typeof window === 'undefined') {
  initializeDatabaseOnStartup();
} 