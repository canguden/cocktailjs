#!/usr/bin/env node

import inquirer from "inquirer";
import * as shell from "shelljs";
import { frameworks, getTemplates } from "./templates";

async function runCocktailShaker() {
  const { framework } = await inquirer.prompt({
    type: "list",
    name: "framework",
    message: "Choose a framework:",
    choices: Object.keys(frameworks),
  });

  const { template } = await inquirer.prompt({
    type: "list",
    name: "template",
    message: `Choose a template for ${framework}:`,
    choices: getTemplates(framework),
  });

  const githubUrl = frameworks[framework][template];

  shell.exec(`git clone ${githubUrl} my-project`);
  shell.cd("my-project");
  shell.exec("npm install");

  console.log("Your cocktail is ready! 🍹");
}

runCocktailShaker();
