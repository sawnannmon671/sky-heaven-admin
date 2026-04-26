const fs = require('fs');
const path = require('path');

const dir = 'c:\\sky-heaven-admin\\src\\app\\(dashboard)\\dashboard';

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file === 'page.tsx') {
      let content = fs.readFileSync(fullPath, 'utf-8');
      if (content.includes('comingSoon')) {
        // Extract the main Icon from the file
        const iconMatch = content.match(/<ThemeIcon[^>]*>\s*<([A-Za-z0-9]+)\s+size=\{20\}\s*\/>/);
        const iconName = iconMatch ? iconMatch[1] : 'IconList';
        
        // Add imports if missing
        if (!content.includes('Table')) {
          content = content.replace(/import\s+\{\s*([^}]+)\s*\}\s+from\s+"@mantine\/core";/, (match, p1) => {
            const imports = new Set(p1.split(',').map(s => s.trim()).filter(Boolean));
            ['Table', 'TextInput', 'ActionIcon', 'Badge'].forEach(i => imports.add(i));
            return `import { ${Array.from(imports).join(', ')} } from "@mantine/core";`;
          });
        }
        
        if (!content.includes('IconSearch')) {
          content = content.replace(/import\s+\{\s*([^}]+)\s*\}\s+from\s+"@tabler\/icons-react";/, (match, p1) => {
            const imports = new Set(p1.split(',').map(s => s.trim()).filter(Boolean));
            ['IconSearch', 'IconEye', 'IconEdit', 'IconTrash', 'IconPlus'].forEach(i => imports.add(i));
            return `import { ${Array.from(imports).join(', ')} } from "@tabler/icons-react";`;
          });
        }
        
        // Create generic table structure to replace the Coming Soon Paper
        const genericTable = `
      <Paper p="md" radius="lg" withBorder shadow="sm" style={{ border: '1px solid #e9ecef' }}>
        <Group justify="space-between" mb="md">
          <TextInput
            placeholder="Search..."
            leftSection={<IconSearch size={16} />}
            size="md"
            radius="md"
            style={{ flex: 1, maxWidth: 400 }}
          />
          <Button leftSection={<IconPlus size={16} />} color="#014F86" radius="md">
            Add New
          </Button>
        </Group>

        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead bg="gray.0">
            <Table.Tr>
              <Table.Th fw={700} fz="sm" c="dark">ID</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Name / Description</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark">Status</Table.Th>
              <Table.Th fw={700} fz="sm" c="dark" ta="right">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[1, 2, 3].map((item) => (
              <Table.Tr key={item}>
                <Table.Td>
                  <Text size="sm" fw={700}>#00{item}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <ThemeIcon size="md" variant="light" color="blue" radius="md">
                      <${iconName} size={18} />
                    </ThemeIcon>
                    <Text size="sm" fw={500}>Sample Record {item}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={item === 1 ? 'green' : 'blue'} fw={700}>
                    {item === 1 ? 'Active' : 'Pending'}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={4} justify="flex-end">
                    <ActionIcon variant="subtle" color="gray"><IconEye size={16} /></ActionIcon>
                    <ActionIcon variant="subtle" color="blue"><IconEdit size={16} /></ActionIcon>
                    <ActionIcon variant="subtle" color="red"><IconTrash size={16} /></ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>`;
        
        // Replace the coming soon block
        content = content.replace(/<Paper[^>]*>[\s\S]*?<Stack[^>]*>[\s\S]*?<Text[^>]*>\{t\.comingSoon\}<\/Text>[\s\S]*?<\/Stack>\s*<\/Paper>/, genericTable);
        
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(dir);
