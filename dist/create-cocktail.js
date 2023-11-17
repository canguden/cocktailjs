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
async function runCocktailShaker() {
    const { framework } = await inquirer_1.default.prompt({
        type: "list",
        name: "framework",
        message: "Choose a framework:",
        choices: Object.keys(templates_1.frameworks),
    });
    const { template } = await inquirer_1.default.prompt({
        type: "list",
        name: "template",
        message: `Choose a template for ${framework}:`,
        choices: (0, templates_1.getTemplates)(framework),
    });
    const githubUrl = templates_1.frameworks[framework][template];
    shell.exec(`git clone ${githubUrl} my-project`);
    shell.cd("my-project");
    shell.exec("npm install");
    console.log("Your cocktail is ready! 🍹");
}
runCocktailShaker();
