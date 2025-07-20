const fs = require('fs');
const path = require('path');

// Function to add proxy for local development
function setupLocalDevelopment() {
  const packagePath = path.join(__dirname, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  // Add proxy for local development
  packageJson.proxy = "http://localhost:3002";
  
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Local development proxy configured');
}

// Function to remove proxy for production
function setupProduction() {
  const packagePath = path.join(__dirname, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  // Remove proxy for production
  delete packageJson.proxy;
  
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Production configuration ready');
}

// Check command line arguments
const args = process.argv.slice(2);
const command = args[0];

if (command === 'local') {
  setupLocalDevelopment();
} else if (command === 'production') {
  setupProduction();
} else {
  console.log('Usage:');
  console.log('  node setup-env.js local     - Setup for local development');
  console.log('  node setup-env.js production - Setup for production/Vercel');
} 