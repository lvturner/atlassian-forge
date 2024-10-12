import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('atlassian-forge.runForgeTunnel', (args) => {
    runForgeTunnel().then((output) => {
      console.log(output);
      if (vscode.window.activeTextEditor) {
        const selection = vscode.window.activeTextEditor.selection;
        vscode.window.showInformationMessage(`Selected text: ${selection}`);
      }
    }).catch((error) => {
      console.error(error);
      vscode.window.showErrorMessage('Failed to run shell command.');
    });
  });

  context.subscriptions.push(disposable);
}

function runForgeTunnel(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec('forge tunnel', (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message);
        return;
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

export function deactivate() {}