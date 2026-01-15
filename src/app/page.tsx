'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function checkConnection() {
      try {
        const { error } = await supabase.auth.getSession();

        if (error) {
          if (error.message.includes('network') || error.message.includes('fetch')) {
            setError(error.message);
            setConnectionStatus('error');
          } else {
            setConnectionStatus('connected');
          }
        } else {
          setConnectionStatus('connected');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setConnectionStatus('error');
      }
    }

    checkConnection();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Next.js with TypeScript & Tailwind CSS
        </h1>
        <p className="text-lg mb-8">
          Your project is ready to go. Start building something amazing!
        </p>

        <div className="mt-8 p-4 rounded-lg border-2 border-gray-300">
          <h2 className="text-2xl font-semibold mb-2">Supabase Connection Status:</h2>
          {connectionStatus === 'checking' && (
            <p className="text-yellow-600">Checking connection...</p>
          )}
          {connectionStatus === 'connected' && (
            <p className="text-green-600 font-bold">✓ Connected successfully!</p>
          )}
          {connectionStatus === 'error' && (
            <div>
              <p className="text-red-600 font-bold">✗ Connection error</p>
              <p className="text-sm text-red-500 mt-2">{error}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
