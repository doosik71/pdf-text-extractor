const vscode = require('vscode');
const fs = require('fs');
const pdf = require('pdf-parse');

function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.extractTextFromPDF', async function () {
    // Show file open dialog.
    const uri = await vscode.window.showOpenDialog({
      canSelectMany: false,
      openLabel: 'Select PDF',
      filters: {
        'PDF files': ['pdf'],
      }
    });

    if (!uri || uri.length === 0) {
      vscode.window.showErrorMessage('No PDF file selected');
      return;
    }

    // Extract text from PDF file.
    const pdfPath = uri[0].fsPath;
    try {
      const dataBuffer = fs.readFileSync(pdfPath);
      const pdfData = await pdf(dataBuffer);

      // Insert extracted text to the cursor position.
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const insertPosition = editor.selection.active;
        editor.edit(editBuilder => {
          editBuilder.insert(insertPosition, pdfData.text);
        });
        vscode.window.showInformationMessage('PDF text extracted and inserted successfully.');
      } else {
        vscode.window.showErrorMessage('No active editor found.');
      }
    } catch (err) {
      vscode.window.showErrorMessage('Failed to extract text from PDF: ' + err.message);
    }
  });

  context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
  activate,
  deactivate
};
