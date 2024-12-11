"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupManager = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const shell = __importStar(require("shelljs"));
const env_docs_generator_1 = require("./env-docs-generator");
class SetupManager {
    constructor(projectPath) {
        this.projectPath = projectPath;
    }
    async setupIntegration(integration, config) {
        var _a, _b, _c;
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
            if ((_a = config.dependencies.additional) === null || _a === void 0 ? void 0 : _a.length) {
                shell.exec(`npm install ${config.dependencies.additional.join(' ')}`);
            }
            if ((_b = config.dependencies.devDependencies) === null || _b === void 0 ? void 0 : _b.length) {
                shell.exec(`npm install -D ${config.dependencies.devDependencies.join(' ')}`);
            }
        }
        // Run post-install commands
        (_c = config.postInstall) === null || _c === void 0 ? void 0 : _c.forEach(cmd => {
            shell.exec(cmd);
        });
    }
    updateEnvFile(vars) {
        const envPath = path.join(this.projectPath, '.env');
        const envContent = Object.entries(vars)
            .map(([key, value]) => `${key}="${value}"`)
            .join('\n');
        fs.appendFileSync(envPath, `\n${envContent}\n`);
    }
    async generateProjectDocs(selectedIntegrations) {
        const { envContent, docsContent } = (0, env_docs_generator_1.generateEnvAndDocs)(selectedIntegrations);
        // Write .env.local
        fs.writeFileSync(path.join(this.projectPath, '.env.local'), envContent);
        // Write setup documentation
        fs.writeFileSync(path.join(this.projectPath, 'SETUP.md'), docsContent);
    }
}
exports.SetupManager = SetupManager;
