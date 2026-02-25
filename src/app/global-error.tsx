'use client';

import { RefreshCw, AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 24px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <AlertTriangle size={40} color="#ef4444" />
            </div>

            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '16px',
            }}>
              Kritik Hata!
            </h1>
            
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '24px',
              lineHeight: '1.6',
            }}>
              Uygulama beklenmeyen bir hatayla karşılaştı. Lütfen sayfayı yenileyin.
            </p>

            <button
              onClick={() => reset()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              <RefreshCw size={20} />
              Sayfayı Yenile
            </button>

            {error?.digest && (
              <p style={{
                marginTop: '24px',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.4)',
              }}>
                Hata ID: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
