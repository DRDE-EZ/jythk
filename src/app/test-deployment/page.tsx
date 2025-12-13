export default function SimpleTestPage() {
  const buildTime = new Date().toISOString();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-2xl p-12 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">
          ✅ Site is LIVE and Updated!
        </h1>
        
        <div className="space-y-6">
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Deployment Status</h2>
            <p className="text-lg text-green-600">
              ✅ This page was built: <strong>{buildTime}</strong>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              If you see this page with a recent timestamp, the deployment is working!
            </p>
          </div>

          <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Test Links</h2>
            <div className="space-y-3">
              <a 
                href="/" 
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
              >
                🏠 Go to Home Page
              </a>
              <a 
                href="/login" 
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
              >
                🔐 Go to Login Page
              </a>
              <a 
                href="/debug-auth" 
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
              >
                🔍 Debug Auth Page
              </a>
              <a 
                href="/products" 
                className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
              >
                🛍️ Browse Products
              </a>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-yellow-700 mb-4">Quick Checks</h2>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Vercel deployment completed</li>
              <li>✅ Next.js config fixed (removed deprecated eslint)</li>
              <li>✅ Legacy peer deps enabled (.npmrc + .vercel.json)</li>
              <li>✅ WIX_API_KEY updated in Vercel</li>
              <li>✅ All environment variables set</li>
              <li>⏳ OAuth redirect URLs configured in Wix</li>
            </ul>
          </div>

          <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-3">Environment Info</h2>
            <div className="text-sm font-mono space-y-1">
              <p>Build: <span className="text-green-600">Production</span></p>
              <p>Framework: <span className="text-blue-600">Next.js 16</span></p>
              <p>React: <span className="text-blue-600">19.2.3</span></p>
              <p>Deployment: <span className="text-purple-600">Vercel</span></p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>🔄 Hard refresh this page (Ctrl+Shift+R) to see the latest build time</p>
        </div>
      </div>
    </div>
  );
}
