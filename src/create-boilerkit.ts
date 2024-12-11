#!/usr/bin/env node

import inquirer from "inquirer";
import * as shell from "shelljs";
import { frameworks, integrations, FrameworkType, IntegrationCategory } from "./templates";
import chalk from "chalk";
import { SetupManager } from './lib/setup-manager';
import { nextAuthSetup } from './templates/integrations/auth/next-auth/setup';
import { openaiSetup } from './templates/integrations/ai/openai/setup';
import { anthropicSetup } from './templates/integrations/ai/anthropic/setup';
import { stripeSetup } from './templates/integrations/payments/stripe/setup';
import { iconsSetup } from './templates/integrations/icons/setup';
import { geminiSetup } from './templates/integrations/ai/gemini/setup';
import { vercelAISetup } from './templates/integrations/ai/vercel/setup';
import { prismaSetup } from './templates/integrations/database/prisma/setup';
import { shadcnSetup } from './templates/integrations/ui/shadcn/setup';
import { zustandSetup } from './templates/integrations/state/zustand/setup';
import { reactHookFormSetup } from './templates/integrations/forms/react-hook-form/setup';

async function runBoilerkit() {
  // Framework Selection
  const { framework } = await inquirer.prompt({
    type: "list",
    name: "framework",
    message: "Choose a framework:",
    choices: Object.keys(frameworks),
  }) as { framework: FrameworkType };

  // Base Configuration
  const baseConfig = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: "Choose a language:",
      choices: frameworks[framework].configOptions.language,
    },
    {
      type: "list",
      name: "buildTool",
      message: "Choose a build tool:",
      choices: frameworks[framework].configOptions.buildTool,
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
  const { selectedIcons } = await inquirer.prompt({
    type: "checkbox",
    name: "selectedIcons",
    message: "Select icon libraries:",
    choices: Object.entries(integrations.icons).map(([key, value]) => ({
      name: value.name,
      value: key,
    })),
  });

  const { selectedAuth } = await inquirer.prompt({
    type: "checkbox",
    name: "selectedAuth",
    message: "Select authentication providers:",
    choices: Object.entries(integrations.auth).map(([key, value]) => ({
      name: value.name,
      value: key,
    })),
  });

  const { selectedPayments } = await inquirer.prompt({
    type: "checkbox",
    name: "selectedPayments",
    message: "Select payment providers:",
    choices: Object.entries(integrations.payments).map(([key, value]) => ({
      name: value.name,
      value: key,
    })),
  });

  const { selectedAI } = await inquirer.prompt({
    type: "checkbox",
    name: "selectedAI",
    message: "Select AI integrations:",
    choices: Object.entries(integrations.ai).map(([key, value]) => ({
      name: value.name,
      value: key,
    })),
  });

  const { selectedDatabase } = await inquirer.prompt({
    type: "checkbox",
    name: "selectedDatabase",
    message: "Select database setup:",
    choices: Object.entries(integrations.database).map(([key, value]) => ({
      name: value.name,
      value: key,
    })),
  });

  const { selectedUI } = await inquirer.prompt({
    type: "checkbox",
    name: "selectedUI",
    message: "Select UI components:",
    choices: Object.entries(integrations.ui).map(([key, value]) => ({
      name: value.name,
      value: key,
    })),
  });

  const { selectedState } = await inquirer.prompt({
    type: "checkbox",
    name: "selectedState",
    message: "Select state management:",
    choices: Object.entries(integrations.state).map(([key, value]) => ({
      name: value.name,
      value: key,
    })),
  });

  const { selectedForms } = await inquirer.prompt({
    type: "checkbox",
    name: "selectedForms",
    message: "Select form handling:",
    choices: Object.entries(integrations.forms).map(([key, value]) => ({
      name: value.name,
      value: key,
    })),
  });

  // Create project
  console.log(chalk.blue("\nCreating your project... 🚀"));
  
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

  console.log(chalk.blue("\nInstalling integrations... 📦"));

  Object.entries(selectedIntegrations).forEach(([category, selected]) => {
    selected.forEach((integration: string) => {
      const { package: pkg, dependencies = [] } = integrations[category as IntegrationCategory][integration];
      shell.exec(`npm install ${pkg} ${dependencies.join(' ')}`);
    });
  });

  // Setup configuration files for integrations
  // TODO: Add configuration setup for each integration

  // After project creation and cd into project
  const setupManager = new SetupManager(process.cwd());

  // Setup selected integrations
  if (selectedAuth.includes('next-auth')) {
    await setupManager.setupIntegration(
      integrations.auth['next-auth'],
      nextAuthSetup
    );
  }

  if (selectedAI.includes('openai')) {
    await setupManager.setupIntegration(
      integrations.ai['openai'],
      openaiSetup
    );
  }

  if (selectedAI.includes('anthropic')) {
    await setupManager.setupIntegration(
      integrations.ai['anthropic'],
      anthropicSetup
    );
  }

  if (selectedPayments.includes('stripe')) {
    await setupManager.setupIntegration(
      integrations.payments['stripe'],
      stripeSetup
    );
  }

  if (selectedIcons.length > 0) {
    await setupManager.setupIntegration(
      integrations.icons[selectedIcons[0]], // Use first selected icon library as main
      iconsSetup
    );
  }

  if (selectedAI.includes('gemini')) {
    await setupManager.setupIntegration(
      integrations.ai['gemini'],
      geminiSetup
    );
  }

  if (selectedAI.includes('vercelai')) {
    await setupManager.setupIntegration(
      integrations.ai['vercelai'],
      vercelAISetup
    );
  }

  if (selectedDatabase.includes('prisma')) {
    await setupManager.setupIntegration(
      integrations.database['prisma'],
      prismaSetup
    );
  }

  if (selectedUI.includes('shadcn')) {
    await setupManager.setupIntegration(
      integrations.ui['shadcn'],
      shadcnSetup
    );
  }

  if (selectedState.includes('zustand')) {
    await setupManager.setupIntegration(
      integrations.state['zustand'],
      zustandSetup
    );
  }

  if (selectedForms.includes('react-hook-form')) {
    await setupManager.setupIntegration(
      integrations.forms['react-hook-form'],
      reactHookFormSetup
    );
  }

  // After all integrations are set up
  await setupManager.generateProjectDocs(selectedIntegrations);

  console.log(chalk.green("\nYour boilerkit is ready! 🎉"));
  console.log(chalk.yellow("\nNext steps:"));
  console.log("1. cd my-project");
  console.log("2. Check SETUP.md for configuration instructions");
  console.log("3. Add your environment variables to .env.local");
  console.log("4. npm run dev");
}

runBoilerkit(); 