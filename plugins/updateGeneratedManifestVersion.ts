import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

// Custom plugin to update the version in the generated manifest.json in the dist folder
export function updateGeneratedManifestVersion(): Plugin {
  return {
    name: 'update-generated-manifest-version',
    apply: 'build',
    closeBundle() {
      // Load version from package.json
      const packageJsonPath = path.resolve(__dirname, '../package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      const distManifestPath = path.resolve(__dirname, '../dist/manifest.json');

      if (fs.existsSync(distManifestPath)) {
        // Read the generated manifest.json in the dist folder
        const manifest = JSON.parse(fs.readFileSync(distManifestPath, 'utf-8'));

        // Update the version
        manifest.version = packageJson.version;

        // Write the updated manifest back to the dist folder
        fs.writeFileSync(distManifestPath, JSON.stringify(manifest, null, 2));
        console.log(`Updated dist/manifest.json version to ${packageJson.version}`);
      } else {
        console.warn('dist/manifest.json not found.');
      }
    }
  };
}
