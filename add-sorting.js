const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const dashboardDir = path.join(__dirname, 'src', 'app', '(dashboard)', 'dashboard');

let modified = 0;

walkDir(dashboardDir, (filePath) => {
  if (filePath.endsWith('page.tsx') && !filePath.includes('[id]')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it has a table and data
    if (content.includes('<Table') && (content.includes('const elements =') || content.includes('const mockData ='))) {
      
      // Determine array name
      const arrayName = content.includes('const elements =') ? 'elements' : 'mockData';
      
      // Extract keys from the first object in the array
      const arrayMatch = content.match(new RegExp(`const ${arrayName} = \\[([\\s\\S]*?)\\];`));
      if (!arrayMatch) return;
      
      const firstObjectMatch = arrayMatch[1].match(/\{([^\}]+)\}/);
      if (!firstObjectMatch) return;
      
      const keys = [];
      const props = firstObjectMatch[1].split(',');
      props.forEach(p => {
        const kv = p.split(':');
        if (kv.length >= 2) {
          const key = kv[0].trim().replace(/['"]/g, '');
          if (key && key !== 'color' && key !== 'icon') {
            keys.push(key);
          }
        }
      });

      if (keys.length === 0) return;

      let changed = false;

      // Ensure IconSelector, IconChevronUp, IconChevronDown are imported
      if (!content.includes('IconSelector')) {
        content = content.replace(/import\s+{([^}]+)}\s+from\s+["']@tabler\/icons-react["']/, (match, p1) => {
          let newImports = p1;
          if (!p1.includes('IconSelector')) newImports += ', IconSelector';
          if (!p1.includes('IconChevronUp')) newImports += ', IconChevronUp';
          if (!p1.includes('IconChevronDown')) newImports += ', IconChevronDown';
          return `import { ${newImports} } from "@tabler/icons-react"`;
        });
        changed = true;
      }
      
      // Ensure UnstyledButton, Group, Center are imported from @mantine/core
      if (!content.includes('UnstyledButton')) {
        content = content.replace(/import\s+{([^}]+)}\s+from\s+["']@mantine\/core["']/, (match, p1) => {
          let newImports = p1;
          if (!p1.includes('UnstyledButton')) newImports += ', UnstyledButton';
          if (!p1.includes('Center')) newImports += ', Center';
          return `import { ${newImports} } from "@mantine/core"`;
        });
        changed = true;
      }

      // Inject sorting state
      if (!content.includes('sortConfig')) {
        const funcMatch = content.match(/export default function\s+\w+\s*\([^)]*\)\s*{/);
        if (funcMatch) {
          const sortState = `
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...${arrayName}].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });
`;
          content = content.replace(funcMatch[0], funcMatch[0] + sortState);
          changed = true;
        }
      }

      // Replace elements.map or mockData.map with sortedData.map
      const mapRegex = new RegExp(`(?<!\\.)\\b${arrayName}\\.map\\s*\\(`, 'g');
      if (mapRegex.test(content)) {
        content = content.replace(mapRegex, `sortedData.map(`);
        changed = true;
      } else {
        // sometimes it's like { mockData.slice(...).map(...) }
        const sliceMapRegex = new RegExp(`\\b${arrayName}\\.slice`, 'g');
        if (sliceMapRegex.test(content)) {
          content = content.replace(sliceMapRegex, `sortedData.slice`);
          changed = true;
        }
      }

      // Now update the headers
      let thMatches = [...content.matchAll(/<Table\.Th([^>]*)>(.*?)<\/Table\.Th>/g)];
      
      // Filter out empty or whitespace-only headers
      thMatches = thMatches.filter(m => m[2].trim() !== '');

      // Skip the last header (usually Actions)
      let sortableCount = Math.min(thMatches.length - 1, keys.length);
      
      // Limit to max 4 sortable columns
      sortableCount = Math.min(sortableCount, 4);
      
      for (let i = 0; i < sortableCount; i++) {
        const match = thMatches[i];
        const key = keys[i];
        
        if (match[0].includes('UnstyledButton')) continue;

        const props = match[1];
        const innerContent = match[2];
        
        // Prevent wrapping already wrapped headers
        if (innerContent.includes('<UnstyledButton')) continue;

        const newTh = `<Table.Th${props}>
                <UnstyledButton onClick={() => handleSort('${key}')} style={{ width: '100%', color: 'inherit' }}>
                  <Group justify="space-between" wrap="nowrap">
                    <span>${innerContent}</span>
                    <Center>
                      {sortConfig?.key === '${key}' ? (
                        sortConfig.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
                      ) : (
                        <IconSelector size={14} color="gray" />
                      )}
                    </Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>`;
              
        content = content.replace(match[0], newTh);
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(filePath, content);
        modified++;
      }
    }
  }
});

console.log(`Modified ${modified} files for sorting.`);
