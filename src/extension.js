const vscode = require('vscode');
const fs = require('fs');
const pdf = require('pdf-parse');

function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.extractTextFromPDF', async function () {

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

    const pdfPath = uri[0].fsPath;

    try {
      const dataBuffer = fs.readFileSync(pdfPath);
      const pdfData = await pdf(dataBuffer);
      const pdf_text = pdfData.text.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, ' ');
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const insertPosition = editor.selection.active;
        editor.edit(editBuilder => {
          editBuilder.insert(insertPosition, pdf_text);
        });
        vscode.window.showInformationMessage('PDF text extracted and inserted successfully.');
      } else {
        vscode.window.showErrorMessage('No active editor found. Please open a file to insert the extracted text.');
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
