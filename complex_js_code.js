// filename: complex_js_code.js

/* 
   Complex JavaScript Code - File System Analyzer

   This code analyzes and displays various attributes of a file system.
   It collects information about files and directories recursively and calculates statistics.

   Disclaimer: This is a simplified and pseudo code version. It doesn't handle all edge cases.
*/

const fs = require('fs'); // Importing Node.js FileSystem module

// Main function to start analyzing the file system
function analyzeFileSystem(path) {
  const fileStats = {
    totalFiles: 0,
    totalDirectories: 0,
    largestFile: { name: '', size: 0 },
  };

  // Helper function to analyze a single file/directory
  function analyzeItem(itemPath) {
    const stats = fs.statSync(itemPath); // Synchronously get file/directory stats

    if (stats.isFile()) {
      // If it's a file
      fileStats.totalFiles++;
      if (stats.size > fileStats.largestFile.size) {
        fileStats.largestFile.name = itemPath;
        fileStats.largestFile.size = stats.size;
      }
    } else if (stats.isDirectory()) {
      // If it's a directory
      fileStats.totalDirectories++;
      
      const subItems = fs.readdirSync(itemPath); // Synchronously read the directory
      subItems.forEach((subItem) => {
        const subItemPath = `${itemPath}/${subItem}`;
        analyzeItem(subItemPath); // Recursively analyze each item inside the directory
      });
    }
  }

  analyzeItem(path); // Start analyzing from the root path

  // Display the statistics
  console.log('File System Analysis:');
  console.log('---------------------');
  console.log(`Total Files: ${fileStats.totalFiles}`);
  console.log(`Total Directories: ${fileStats.totalDirectories}`);
  console.log(`Largest File: ${fileStats.largestFile.name} (Size: ${fileStats.largestFile.size} bytes)`);
}

// Usage - Analyze the file system starting from the given path
analyzeFileSystem('/path/to/start/analysis');