// Вспомогательный скрипт: вывести все файлы с присвоенными ID
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const FOLDERS = ['КОНТЕКСТ', 'КОНТЕКСТ СМЕЖНЫЕ'];

function walk(dir, base = '') {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'ru'));
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.join(base, e.name);
    if (e.isDirectory()) out.push({ type: 'dir', name: e.name, path: rel, children: walk(full, rel) });
    else if (e.name.endsWith('.md')) out.push({ type: 'file', name: e.name, path: rel, full });
  }
  return out;
}

let counter = 0;
function flatten(tree, parent = '') {
  const result = [];
  for (const item of tree) {
    if (item.type === 'file') {
      counter++;
      result.push({ id: 'f' + counter, name: item.name, path: path.join(parent, item.name) });
    } else if (item.children) {
      const sub = flatten(item.children, path.join(parent, item.name));
      result.push(...sub);
    }
  }
  return result;
}

const trees = FOLDERS.map(f => ({ name: f, children: walk(path.join(ROOT, f)) }));
const allFiles = [];
trees.forEach(t => allFiles.push(...flatten(t.children, t.name)));

allFiles.forEach(f => console.log(`${f.id}\t${f.path}`));
