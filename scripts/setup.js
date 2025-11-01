#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 ERONII Setup Script');
console.log('=======================\n');

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error(`❌ Node.js 18+ required. Current version: ${nodeVersion}`);
  process.exit(1);
}

console.log(`✅ Node.js ${nodeVersion} detected`);

// Check for .env.local
const envLocalPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envLocalPath)) {
  console.log('⚠️  .env.local file not found');
  
  if (fs.existsSync(envExamplePath)) {
    console.log('📋 Copying .env.example to .env.local...');
    fs.copyFileSync(envExamplePath, envLocalPath);
    console.log('✅ Environment file created from template');
  } else {
    console.log('📝 Creating .env.local with default configuration...');
    const defaultEnv = `# Local Development Environment
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_WIX_CLIENT_ID=cbf77863-cedf-4588-b7a8-fc430cf6a816
NEXT_PUBLIC_WIX_SITE_ID=4b296c48-4a6b-4db1-9813-d74e37a5e3ea
WIX_API_KEY=IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcImQ2ZGEwZGZmLWExYzEtNDc2My1iNzJmLTNmMDYxMTUxMmQzNlwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcImIyMTg2NmRiLWU4NjItNDM5NC04MDI2LWZmNzA3YzI3YjIxZVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCIzMGYwM2NlZC1jZjc4LTQ1ZjYtOTMxMS0yZjQxYmMzNGE3M2ZcIn19IiwiaWF0IjoxNzYxMTUwNzA4fQ.dktz1mD2SoaNwmzGkhjieqPDzjaNaOwSxzr7QeJ3Cr4sqts5NKs9QkkBoS5RXEMlRMUDzvgePIKTH0LKBXVDzqXvyS5KT6U21_J1baJoxl5A8VM6oiz7AKxzkjWP2vokoJX156USQfE8KVMSLplU6sTtxYgeJMoisH87y9iAf7NmNMSG3odUrPwoRB-LcYd2n44TBIVT_noKQJ_TYAyzH1PzJ-q9Aw3s4DmSgchb0tbodkWCWAVTmhUSOVxASF1GWhwOR4reJvTQNyQsQfzmjH1n87jCa7oVDE5qvFlmlHIFT7sBinxzn4kE6aRvbR5-dssLMgj0pIg_lvOC3rfAEg`;
    
    fs.writeFileSync(envLocalPath, defaultEnv);
    console.log('✅ Environment file created with default values');
  }
} else {
  console.log('✅ .env.local file already exists');
}

// Verify environment variables
console.log('🔍 Verifying environment variables...');
try {
  require('dotenv').config({ path: envLocalPath });
  const requiredVars = [
    'NEXT_PUBLIC_WIX_SITE_ID',
    'NEXT_PUBLIC_WIX_CLIENT_ID',
    'WIX_API_KEY'
  ];
  
  let allPresent = true;
  requiredVars.forEach(varName => {
    if (process.env[varName]) {
      console.log(`✅ ${varName}: Present`);
    } else {
      console.log(`❌ ${varName}: Missing`);
      allPresent = false;
    }
  });
  
  if (allPresent) {
    console.log('✅ All required environment variables are present');
  } else {
    console.log('⚠️  Some environment variables are missing');
  }
} catch (error) {
  console.log('⚠️  Could not verify environment variables');
}

// Test build
console.log('🏗️  Testing build configuration...');
try {
  execSync('npm run build', { stdio: 'pipe' });
  console.log('✅ Build test successful');
} catch (error) {
  console.log('⚠️  Build test failed. Run "npm run build" for details');
}

console.log('\n🎉 Setup complete!');
console.log('==================');
console.log('Next steps:');
console.log('1. Review .env.local file');
console.log('2. Run: npm run dev');
console.log('3. Open: http://localhost:3000');
console.log('\n📚 Documentation:');
console.log('- README.md (overview)');
console.log('- SETUP.md (detailed guide)');