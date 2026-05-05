#!/usr/bin/env node
// Сборка всего содержимого КОНТЕКСТ/ и КОНТЕКСТ СМЕЖНЫЕ/ в один HTML-файл с навигацией

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FOLDERS = ['КОНТЕКСТ', 'КОНТЕКСТ СМЕЖНЫЕ'];
const OUT = path.join(__dirname, 'index.html');

function walk(dir, base = '') {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'ru'));
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.join(base, e.name);
    if (e.isDirectory()) {
      out.push({ type: 'dir', name: e.name, path: rel, children: walk(full, rel) });
    } else if (e.name.endsWith('.md')) {
      out.push({ type: 'file', name: e.name, path: rel, full });
    }
  }
  return out;
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function slugify(s) {
  return s.replace(/[^a-zA-Zа-яА-Я0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
}

let fileCounter = 0;
function assignIds(tree) {
  for (const item of tree) {
    if (item.type === 'file') {
      item.id = 'f' + (++fileCounter);
    } else if (item.children) {
      assignIds(item.children);
    }
  }
}

function renderSidebar(tree, depth = 0) {
  let html = '';
  for (const item of tree) {
    if (item.type === 'dir') {
      html += `<div class="dir" style="--d:${depth}"><div class="dir-name">📁 ${escapeHtml(item.name)}</div>`;
      html += `<div class="dir-children">${renderSidebar(item.children, depth + 1)}</div>`;
      html += `</div>`;
    } else {
      html += `<a class="file-link" href="#${item.id}" data-file="${item.id}" style="--d:${depth}"><span class="file-icon">📄</span>${escapeHtml(item.name.replace(/\.md$/, ''))}</a>`;
    }
  }
  return html;
}

function renderContent(tree, parentPath = '') {
  let html = '';
  for (const item of tree) {
    if (item.type === 'dir') {
      html += renderContent(item.children, path.join(parentPath, item.name));
    } else {
      const content = fs.readFileSync(item.full, 'utf8');
      const breadcrumb = parentPath || 'root';
      html += `<article class="doc" id="${item.id}" data-file-id="${item.id}">`;
      html += `<div class="doc-header">`;
      html += `<div class="breadcrumb">${escapeHtml(breadcrumb)}</div>`;
      html += `<h1 class="doc-title">${escapeHtml(item.name.replace(/\.md$/, ''))}</h1>`;
      html += `</div>`;
      html += `<div class="doc-content" data-md></div>`;
      html += `<script type="text/markdown" data-for="${item.id}">${escapeHtml(content)}</script>`;
      html += `</article>`;
    }
  }
  return html;
}

function flattenFiles(tree, list = []) {
  for (const item of tree) {
    if (item.type === 'file') list.push(item);
    else if (item.children) flattenFiles(item.children, list);
  }
  return list;
}

// Build
const trees = FOLDERS.map(f => ({
  name: f,
  children: walk(path.join(ROOT, f))
}));

trees.forEach(t => assignIds(t.children));

const totalFiles = trees.reduce((sum, t) => sum + flattenFiles(t.children).length, 0);

let sidebarHtml = '';
let contentHtml = '';
trees.forEach(t => {
  sidebarHtml += `<div class="root-folder"><div class="root-name">${escapeHtml(t.name)}</div>${renderSidebar(t.children)}</div>`;
  contentHtml += renderContent(t.children, t.name);
});

const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ДонПлафон — Полный архив исследования (${totalFiles} файлов)</title>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body { background:#0f172a; color:#e2e8f0; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; line-height:1.6; }

  .layout { display:grid; grid-template-columns:340px 1fr; min-height:100vh; }

  /* SIDEBAR */
  .sidebar { background:#0f172a; border-right:1px solid #1e293b; padding:20px 0; overflow-y:auto; max-height:100vh; position:sticky; top:0; }
  .sidebar-header { padding:0 20px 16px; border-bottom:1px solid #1e293b; margin-bottom:12px; }
  .sidebar-title { font-size:15px; font-weight:700; color:#f1f5f9; }
  .sidebar-meta { font-size:11px; color:#64748b; margin-top:4px; }
  .search-box { padding:0 20px 12px; }
  .search-input { width:100%; background:#1e293b; border:1px solid #334155; color:#e2e8f0; font-size:12px; padding:8px 10px; border-radius:6px; outline:none; }
  .search-input:focus { border-color:#3b82f6; }
  .search-input::placeholder { color:#64748b; }

  .root-folder { padding:6px 0; }
  .root-name { font-size:11px; font-weight:700; color:#3b82f6; text-transform:uppercase; letter-spacing:0.5px; padding:8px 20px 6px; border-top:1px solid #1e293b; margin-top:6px; }
  .root-folder:first-child .root-name { border-top:none; margin-top:0; }
  .dir { padding:0; }
  .dir-name { font-size:12px; font-weight:600; color:#cbd5e1; padding:6px 20px; padding-left:calc(20px + var(--d, 0) * 14px); cursor:pointer; user-select:none; }
  .dir-name:hover { background:#1e293b; }
  .dir-children { display:block; }
  .dir.collapsed .dir-children { display:none; }
  .file-link { display:block; padding:5px 20px; padding-left:calc(20px + var(--d, 0) * 14px); font-size:12px; color:#94a3b8; text-decoration:none; transition:all 0.1s; }
  .file-link:hover { background:#1e293b; color:#e2e8f0; }
  .file-link.active { background:#172554; color:#60a5fa; border-left:2px solid #3b82f6; padding-left:calc(18px + var(--d, 0) * 14px); }
  .file-icon { margin-right:6px; opacity:0.6; }

  /* CONTENT */
  .content { padding:32px 48px 60px; max-width:1100px; overflow-x:hidden; }
  .doc { display:none; }
  .doc.active { display:block; }
  .doc-header { padding-bottom:18px; margin-bottom:24px; border-bottom:1px solid #334155; }
  .breadcrumb { font-size:11px; color:#64748b; text-transform:uppercase; letter-spacing:0.5px; font-family:monospace; }
  .doc-title { font-size:26px; font-weight:700; color:#f1f5f9; margin-top:8px; line-height:1.3; }

  /* MARKDOWN */
  .doc-content h1 { font-size:24px; color:#f1f5f9; margin:24px 0 12px; line-height:1.3; }
  .doc-content h2 { font-size:20px; color:#f1f5f9; margin:22px 0 10px; padding-bottom:6px; border-bottom:1px solid #1e293b; }
  .doc-content h3 { font-size:16px; color:#cbd5e1; margin:18px 0 8px; font-weight:600; }
  .doc-content h4 { font-size:14px; color:#cbd5e1; margin:14px 0 6px; font-weight:600; }
  .doc-content p { font-size:14px; color:#cbd5e1; margin:10px 0; line-height:1.7; }
  .doc-content ul, .doc-content ol { margin:10px 0 10px 22px; }
  .doc-content li { font-size:14px; color:#cbd5e1; padding:3px 0; line-height:1.6; }
  .doc-content strong { color:#f1f5f9; font-weight:600; }
  .doc-content em { color:#94a3b8; }
  .doc-content code { background:#1e293b; color:#fbbf24; padding:1px 6px; border-radius:3px; font-size:12px; font-family:"SF Mono",Menlo,monospace; }
  .doc-content pre { background:#1e293b; border:1px solid #334155; padding:14px; border-radius:6px; overflow-x:auto; margin:12px 0; }
  .doc-content pre code { background:none; padding:0; color:#e2e8f0; font-size:12px; }
  .doc-content blockquote { border-left:3px solid #3b82f6; padding:6px 14px; margin:12px 0; background:#172554; border-radius:0 6px 6px 0; color:#cbd5e1; font-style:italic; }
  .doc-content a { color:#60a5fa; text-decoration:none; }
  .doc-content a:hover { text-decoration:underline; }
  .doc-content hr { border:none; border-top:1px solid #334155; margin:20px 0; }
  .doc-content table { width:100%; border-collapse:collapse; margin:12px 0; font-size:13px; }
  .doc-content th { background:#0f172a; color:#94a3b8; text-align:left; padding:10px 12px; border:1px solid #334155; font-size:12px; font-weight:600; }
  .doc-content td { padding:9px 12px; border:1px solid #1e293b; color:#cbd5e1; vertical-align:top; }
  .doc-content tr:nth-child(even) td { background:#0f172a; }

  .empty-state { display:flex; align-items:center; justify-content:center; min-height:60vh; color:#64748b; font-size:14px; flex-direction:column; gap:12px; }
  .empty-state .icon { font-size:48px; opacity:0.3; }

  /* SCROLLBARS */
  .sidebar::-webkit-scrollbar, .content::-webkit-scrollbar { width:8px; }
  .sidebar::-webkit-scrollbar-track, .content::-webkit-scrollbar-track { background:#0f172a; }
  .sidebar::-webkit-scrollbar-thumb, .content::-webkit-scrollbar-thumb { background:#334155; border-radius:4px; }

  /* MOBILE */
  .menu-toggle { display:none; }
  @media (max-width: 900px) {
    .layout { grid-template-columns:1fr; }
    .sidebar { position:fixed; left:-100%; top:0; bottom:0; width:80%; max-width:340px; z-index:100; transition:left 0.2s; box-shadow:2px 0 16px rgba(0,0,0,0.5); }
    .sidebar.open { left:0; }
    .menu-toggle { display:flex; position:fixed; bottom:20px; right:20px; width:52px; height:52px; border-radius:50%; background:#3b82f6; color:white; align-items:center; justify-content:center; font-size:22px; cursor:pointer; z-index:101; border:none; box-shadow:0 4px 12px rgba(0,0,0,0.4); }
    .content { padding:24px 20px 80px; }
    .doc-title { font-size:20px; }
    .doc-content h1 { font-size:20px; }
    .doc-content h2 { font-size:18px; }
  }
</style>
</head>
<body>

<div class="layout">
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-title">ДонПлафон Архив</div>
      <div class="sidebar-meta">${totalFiles} файлов · полное исследование</div>
    </div>
    <div class="search-box">
      <input type="text" class="search-input" id="search" placeholder="🔍 Поиск по файлам...">
    </div>
    ${sidebarHtml}
  </aside>

  <main class="content" id="content">
    <div class="empty-state" id="empty">
      <div class="icon">📚</div>
      <div>Выбери файл слева для чтения</div>
      <div style="font-size:12px; opacity:0.7;">${totalFiles} документов готовы к просмотру</div>
    </div>
    ${contentHtml}
  </main>
</div>

<button class="menu-toggle" id="menuToggle">☰</button>

<script>
  // Render markdown content for all docs
  document.querySelectorAll('script[type="text/markdown"]').forEach(s => {
    const id = s.dataset.for;
    const target = document.querySelector('#' + id + ' [data-md]');
    if (target && window.marked) {
      target.innerHTML = marked.parse(s.textContent);
    }
  });

  const empty = document.getElementById('empty');
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');
  const search = document.getElementById('search');

  function showFile(id) {
    document.querySelectorAll('.doc').forEach(d => d.classList.remove('active'));
    document.querySelectorAll('.file-link').forEach(l => l.classList.remove('active'));
    const doc = document.getElementById(id);
    const link = document.querySelector('.file-link[data-file="' + id + '"]');
    if (doc) {
      doc.classList.add('active');
      empty.style.display = 'none';
    }
    if (link) link.classList.add('active');
    if (window.innerWidth < 900) sidebar.classList.remove('open');
    document.getElementById('content').scrollTo({top:0});
    if (history.replaceState) history.replaceState(null, '', '#' + id);
  }

  document.querySelectorAll('.file-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showFile(link.dataset.file);
    });
  });

  document.querySelectorAll('.dir-name').forEach(d => {
    d.addEventListener('click', () => d.parentElement.classList.toggle('collapsed'));
  });

  menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));

  search.addEventListener('input', e => {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll('.file-link').forEach(link => {
      const txt = link.textContent.toLowerCase();
      link.style.display = !q || txt.includes(q) ? 'block' : 'none';
    });
    document.querySelectorAll('.dir').forEach(d => {
      const visible = d.querySelectorAll('.file-link:not([style*="none"])').length;
      d.style.display = visible > 0 || !q ? 'block' : 'none';
    });
  });

  // Open file from hash
  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    if (document.getElementById(id)) showFile(id);
  }
</script>

</body>
</html>
`;

fs.writeFileSync(OUT, html);
console.log(`✓ Built ${OUT}`);
console.log(`  Files: ${totalFiles}`);
console.log(`  Size: ${(fs.statSync(OUT).size / 1024).toFixed(1)} KB`);
