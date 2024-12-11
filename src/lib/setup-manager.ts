import * as fs from 'fs';
import * as path from 'path';
import * as shell from 'shelljs';
import { Integration } from '../templates';
import { generateEnvAndDocs } from './env-docs-generator';

interface SetupConfig {
  files: Record<string, string>;
  envVars: Record<string, string>;
  dependencies?: {
    additional?: string[];
    devDependencies?: string[];
  };
  postInstall?: string[];
}

export class SetupManager {
  private projectPath: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;
  }

  async setupIntegration(integration: Integration, config: SetupConfig) {
    // Create files
    Object.entries(config.files).forEach(([filePath, content]) => {
      const fullPath = path.join(this.projectPath, filePath);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, content.trim());
    });

    // Update .env
    this.updateEnvFile(config.envVars);

    // Install additional dependencies
    if (config.dependencies) {
      if (config.dependencies.additional?.length) {
        shell.exec(`npm install ${config.dependencies.additional.join(' ')}`);
      }
      if (config.dependencies.devDependencies?.length) {
        shell.exec(`npm install -D ${config.dependencies.devDependencies.join(' ')}`);
      }
    }

    // Run post-install commands
    config.postInstall?.forEach(cmd => {
      shell.exec(cmd);
    });
  }

  private updateEnvFile(vars: Record<string, string>) {
    const envPath = path.join(this.projectPath, '.env');
    const envContent = Object.entries(vars)
      .map(([key, value]) => `${key}="${value}"`)
      .join('\n');

    fs.appendFileSync(envPath, `\n${envContent}\n`);
  }

  async generateProjectDocs(selectedIntegrations: Record<string, string[]>) {
    const { envContent, docsContent } = generateEnvAndDocs(selectedIntegrations);
    
    // Write .env.local
    fs.writeFileSync(
      path.join(this.projectPath, '.env.local'),
      envContent
    );
    
    // Write setup documentation
    fs.writeFileSync(
      path.join(this.projectPath, 'SETUP.md'),
      docsContent
    );
  }
} 