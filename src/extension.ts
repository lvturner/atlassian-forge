import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
  const commands = [
    vscode.commands.registerCommand('atlassian-forge.runForgeTunnel', () => {
      runForgeTunnel();
    }),

    vscode.commands.registerCommand('atlassian-forge.runForgeDeploy', () => {
      runForgeDeploy();
    })
  ];

  for (const command of commands) {
    context.subscriptions.push(command);
  }
}

function runForgeTunnel() {
  const terminal = vscode.window.createTerminal('Forge Tunnel');
  terminal.show();
  terminal.sendText('forge tunnel');
}

function runForgeDeploy() {
  const terminal = vscode.window.createTerminal('Forge Deploy');
  terminal.show();
  terminal.sendText('forge deploy');
}

export function deactivate() {}