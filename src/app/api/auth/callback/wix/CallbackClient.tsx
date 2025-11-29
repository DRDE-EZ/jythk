'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const CLIENT_ID = '8ddda745-5ec1-49f1-ab74-5cc13da5c94f';
const WIX_OAUTH_DATA_COOKIE = `wix_oauth_data_${CLIENT_ID}`;

export default function CallbackClient() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get OAuth data from sessionStorage
    const oAuthData = sessionStorage.getItem(WIX_OAUTH_DATA_COOKIE);
    
    if (oAuthData) {
      console.log('📦 Retrieved OAuth data from sessionStorage');
      
      // Add it as a query parameter and reload
      const url = new URL(window.location.href);
      if (!url.searchParams.has('oauth_data')) {
        url.searchParams.set('oauth_data', oAuthData);
        window.location.href = url.toString();
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Completing sign in...</p>
      </div>
    </div>
  );
}
