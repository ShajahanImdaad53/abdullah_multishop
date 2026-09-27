const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src/app');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

function updateFile(filePath) {
    if (!filePath.endsWith('.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // We only replace if there isn't a dark: variant already present for the background
    // bg-white -> bg-white dark:bg-[#0a192f] or dark:bg-[#020617]
    // Let's use dark:bg-[#020617] for general white backgrounds in containers, or dark:bg-[#0a192f]
    content = content.replace(/\bbg-white\b(?!\s*dark:bg-)/g, 'bg-white dark:bg-[#0a192f]');
    content = content.replace(/\bbg-gray-50\b(?!\s*dark:bg-)/g, 'bg-gray-50 dark:bg-[#060d1f]');
    content = content.replace(/\bbg-[#f8f8f8]\b(?!\s*dark:bg-)/g, 'bg-[#f8f8f8] dark:bg-[#020617]');
    
    // Borders
    content = content.replace(/\bborder-gray-100\b(?!\s*dark:border-)/g, 'border-gray-100 dark:border-white/5');
    content = content.replace(/\bborder-gray-200\b(?!\s*dark:border-)/g, 'border-gray-200 dark:border-white/10');
    content = content.replace(/\bborder-gray-300\b(?!\s*dark:border-)/g, 'border-gray-300 dark:border-white/20');

    // Text colors
    content = content.replace(/\btext-gray-900\b(?!\s*dark:text-)/g, 'text-gray-900 dark:text-gray-50');
    content = content.replace(/\btext-gray-800\b(?!\s*dark:text-)/g, 'text-gray-800 dark:text-gray-100');
    content = content.replace(/\btext-gray-700\b(?!\s*dark:text-)/g, 'text-gray-700 dark:text-gray-200');
    content = content.replace(/\btext-gray-600\b(?!\s*dark:text-)/g, 'text-gray-600 dark:text-gray-300');
    content = content.replace(/\btext-gray-500\b(?!\s*dark:text-)/g, 'text-gray-500 dark:text-gray-400');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated', filePath);
    }
}

walkDir(srcDir, updateFile);
console.log("Done.");
