# PDF Text Extractor for Visual Studio Code

This Visual Studio Code extension allows you to extract text from a PDF file and insert it directly into the active text editor.

## Features

- Select and open a PDF file.
- Extracts text content from the PDF.
- Inserts the extracted text at the current cursor position in the active editor.
- Shows appropriate error messages when no PDF is selected or if the extraction fails.

## Installation

1. Clone this repository or download the source files.
2. Open the project folder in Visual Studio Code.
3. Run the extension by pressing `F5` (this will open a new VS Code window with the extension loaded).
4. To permanently install it, follow <https://marketplace.visualstudio.com/items?itemName=doosik71.pdf-text-extractor>.

## Usage

1. Open a text editor in VS Code.
2. Run the command `Extract Text From PDF` from the Command Palette (`Ctrl+Shift+P`) or press `Ctrl`+`Alt`+`E`.
3. Select a PDF file from the file dialog that appears.
4. The extracted text will be inserted into the currently active text editor at the cursor's position.

## Extension Settings

There are no specific settings for this extension.

## Known Issues

- Text extraction may not preserve the original formatting or layout from the PDF.
- Some special characters or non-standard encodings in the PDF might not be handled properly.

## Contributing

Feel free to submit issues or pull requests to improve the extension.

## Release Notes

### 1.0.3

- Fixed an error that removed all new lines.

### 1.0.2

- Remove double spaces and trailing spaces in line endings.

### 1.0.1

- Remove control characters in PDF text.

### 1.0.0

- Initial release with basic PDF text extraction functionality.

## License

This extension is licensed under the MIT License.
