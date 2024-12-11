#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const shell = __importStar(require("shelljs"));
const templates_1 = require("./templates");
const chalk_1 = __importDefault(require("chalk"));
const setup_manager_1 = require("./lib/setup-manager");
const setup_1 = require("./templates/integrations/auth/next-auth/setup");
const setup_2 = require("./templates/integrations/ai/openai/setup");
const setup_3 = require("./templates/integrations/ai/anthropic/setup");
const setup_4 = require("./templates/integrations/payments/stripe/setup");
const setup_5 = require("./templates/integrations/icons/setup");
const setup_6 = require("./templates/integrations/ai/gemini/setup");
const setup_7 = require("./templates/integrations/ai/vercel/setup");
const setup_8 = require("./templates/integrations/database/prisma/setup");
const setup_9 = require("./templates/integrations/ui/shadcn/setup");
const setup_10 = require("./templates/integrations/state/zustand/setup");
const setup_11 = require("./templates/integrations/forms/react-hook-form/setup");
async function runBoilerkit() {
    // Framework Selection
    const { framework } = await inquirer_1.default.prompt({
        type: "list",
        name: "framework",
        message: "Choose a framework:",
        choices: Object.keys(templates_1.frameworks),
    });
    // Base Configuration
    const baseConfig = await inquirer_1.default.prompt([
        {
            type: "list",
            name: "language",
            message: "Choose a language:",
            choices: templates_1.frameworks[framework].configOptions.language,
        },
        {
            type: "list",
            name: "buildTool",
            message: "Choose a build tool:",
            choices: templates_1.frameworks[framework].configOptions.buildTool,
        },
        {
            type: "confirm",
            name: "eslint",
            message: "Do you want to use ESLint?",
            default: true,
        },
        {
            type: "confirm",
            name: "prettier",
            message: "Do you want to use Prettier?",
            default: true,
        }
    ]);
    // Integrations Selection
    const { selectedIcons } = await inquirer_1.default.prompt({
        type: "checkbox",
        name: "selectedIcons",
        message: "Select icon libraries:",
        choices: Object.entries(templates_1.integrations.icons).map(([key, value]) => ({
            name: value.name,
            value: key,
        })),
    });
    const { selectedAuth } = await inquirer_1.default.prompt({
        type: "checkbox",
        name: "selectedAuth",
        message: "Select authentication providers:",
        choices: Object.entries(templates_1.integrations.auth).map(([key, value]) => ({
            name: value.name,
            value: key,
        })),
    });
    const { selectedPayments } = await inquirer_1.default.prompt({
        type: "checkbox",
        name: "selectedPayments",
        message: "Select payment providers:",
        choices: Object.entries(templates_1.integrations.payments).map(([key, value]) => ({
            name: value.name,
            value: key,
        })),
    });
    const { selectedAI } = await inquirer_1.default.prompt({
        type: "checkbox",
        name: "selectedAI",
        message: "Select AI integrations:",
        choices: Object.entries(templates_1.integrations.ai).map(([key, value]) => ({
            name: value.name,
            value: key,
        })),
    });
    const { selectedDatabase } = await inquirer_1.default.prompt({
        type: "checkbox",
        name: "selectedDatabase",
        message: "Select database setup:",
        choices: Object.entries(templates_1.integrations.database).map(([key, value]) => ({
            name: value.name,
            value: key,
        })),
    });
    const { selectedUI } = await inquirer_1.default.prompt({
        type: "checkbox",
        name: "selectedUI",
        message: "Select UI components:",
        choices: Object.entries(templates_1.integrations.ui).map(([key, value]) => ({
            name: value.name,
            value: key,
        })),
    });
    const { selectedState } = await inquirer_1.default.prompt({
        type: "checkbox",
        name: "selectedState",
        message: "Select state management:",
        choices: Object.entries(templates_1.integrations.state).map(([key, value]) => ({
            name: value.name,
            value: key,
        })),
    });
    const { selectedForms } = await inquirer_1.default.prompt({
        type: "checkbox",
        name: "selectedForms",
        message: "Select form handling:",
        choices: Object.entries(templates_1.integrations.forms).map(([key, value]) => ({
            name: value.name,
            value: key,
        })),
    });
    // Create project
    console.log(chalk_1.default.blue("\nCreating your project... 🚀"));
    // Create Next.js app with selected configuration
    const createCommand = `npx create-next-app@latest my-project \
--typescript=${baseConfig.language === 'typescript'} \
--tailwind \
--eslint \
--app \
--src-dir \
--import-alias "@/*" \
--turbo=${baseConfig.buildTool === 'turbopack'} \
--no-git \
--use-npm \
--yes`;
    shell.exec(createCommand);
    shell.cd("my-project");
    // Install selected integrations
    const selectedIntegrations = {
        icons: selectedIcons,
        auth: selectedAuth,
        payments: selectedPayments,
        ai: selectedAI,
        database: selectedDatabase,
        ui: selectedUI,
        state: selectedState,
        forms: selectedForms
    };
    console.log(chalk_1.default.blue("\nInstalling integrations... 📦"));
    Object.entries(selectedIntegrations).forEach(([category, selected]) => {
        selected.forEach((integration) => {
            const { package: pkg, dependencies = [] } = templates_1.integrations[category][integration];
            shell.exec(`npm install ${pkg} ${dependencies.join(' ')}`);
        });
    });
    // Setup configuration files for integrations
    // TODO: Add configuration setup for each integration
    // After project creation and cd into project
    const setupManager = new setup_manager_1.SetupManager(process.cwd());
    // Setup selected integrations
    if (selectedAuth.includes('next-auth')) {
        await setupManager.setupIntegration(templates_1.integrations.auth['next-auth'], setup_1.nextAuthSetup);
    }
    if (selectedAI.includes('openai')) {
        await setupManager.setupIntegration(templates_1.integrations.ai['openai'], setup_2.openaiSetup);
    }
    if (selectedAI.includes('anthropic')) {
        await setupManager.setupIntegration(templates_1.integrations.ai['anthropic'], setup_3.anthropicSetup);
    }
    if (selectedPayments.includes('stripe')) {
        await setupManager.setupIntegration(templates_1.integrations.payments['stripe'], setup_4.stripeSetup);
    }
    if (selectedIcons.length > 0) {
        await setupManager.setupIntegration(templates_1.integrations.icons[selectedIcons[0]], // Use first selected icon library as main
        setup_5.iconsSetup);
    }
    if (selectedAI.includes('gemini')) {
        await setupManager.setupIntegration(templates_1.integrations.ai['gemini'], setup_6.geminiSetup);
    }
    if (selectedAI.includes('vercelai')) {
        await setupManager.setupIntegration(templates_1.integrations.ai['vercelai'], setup_7.vercelAISetup);
    }
    if (selectedDatabase.includes('prisma')) {
        await setupManager.setupIntegration(templates_1.integrations.database['prisma'], setup_8.prismaSetup);
    }
    if (selectedUI.includes('shadcn')) {
        await setupManager.setupIntegration(templates_1.integrations.ui['shadcn'], setup_9.shadcnSetup);
    }
    if (selectedState.includes('zustand')) {
        await setupManager.setupIntegration(templates_1.integrations.state['zustand'], setup_10.zustandSetup);
    }
    if (selectedForms.includes('react-hook-form')) {
        await setupManager.setupIntegration(templates_1.integrations.forms['react-hook-form'], setup_11.reactHookFormSetup);
    }
    // After all integrations are set up
    await setupManager.generateProjectDocs(selectedIntegrations);
    console.log(chalk_1.default.green("\nYour boilerkit is ready! 🎉"));
    console.log(chalk_1.default.yellow("\nNext steps:"));
    console.log("1. cd my-project");
    console.log("2. Check SETUP.md for configuration instructions");
    console.log("3. Add your environment variables to .env.local");
    console.log("4. npm run dev");
}
runBoilerkit();
