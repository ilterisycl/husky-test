import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

function removeConsoleLogs(dir) {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other directories you might want to exclude
      if (file !== 'node_modules' && !file.startsWith('.')) {
        removeConsoleLogs(filePath);
      }
    } else if (
      file.endsWith('.js') ||
      file.endsWith('.jsx') ||
      file.endsWith('.ts') ||
      file.endsWith('.tsx')
    ) {
      let content = readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Remove console.log statements
      content = content.replace(/console\.log\([^)]*\);?\n?/g, '');
      
      if (content !== originalContent) {
        writeFileSync(filePath, content, 'utf8');
              }
    }
  });
}

removeConsoleLogs(process.cwd());