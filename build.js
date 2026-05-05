#!/usr/bin/env node
// Сборка: Стратегия + Архив 139 файлов в один HTML

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FOLDERS = ['КОНТЕКСТ', 'КОНТЕКСТ СМЕЖНЫЕ'];
const OUT = path.join(__dirname, 'index.html');

// Читаем стратегический контент
const strategyContent = fs.readFileSync(path.join(__dirname, 'strategy-content.js'), 'utf8');

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
      html += `<a class="file-link" href="#archive/${item.id}" data-file="${item.id}" style="--d:${depth}"><span class="file-icon">📄</span>${escapeHtml(item.name.replace(/\.md$/, ''))}</a>`;
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

const trees = FOLDERS.map(f => ({
  name: f,
  children: walk(path.join(ROOT, f))
}));

trees.forEach(t => assignIds(t.children));

const totalFiles = trees.reduce((sum, t) => sum + flattenFiles(t.children).length, 0);

let archiveSidebar = '';
let archiveContent = '';
trees.forEach(t => {
  archiveSidebar += `<div class="root-folder"><div class="root-name">${escapeHtml(t.name)}</div>${renderSidebar(t.children)}</div>`;
  archiveContent += renderContent(t.children, t.name);
});

const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Стратегия ДонПлафон 20М → 40М</title>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body { background:#0a0e1a; color:#e2e8f0; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Inter,sans-serif; line-height:1.6; -webkit-font-smoothing:antialiased; }

  /* TOP NAV */
  .topnav { background:#0a0e1a; border-bottom:1px solid #1e293b; padding:14px 28px; position:sticky; top:0; z-index:50; backdrop-filter:blur(8px); }
  .topnav-inner { display:flex; align-items:center; gap:32px; max-width:1600px; margin:0 auto; }
  .brand { display:flex; flex-direction:column; }
  .brand-name { font-size:14px; font-weight:700; color:#f1f5f9; letter-spacing:-0.01em; }
  .brand-sub { font-size:11px; color:#64748b; }
  .mode-switcher { display:flex; gap:4px; background:#1e293b; padding:4px; border-radius:8px; margin-left:auto; }
  .mode-btn { padding:7px 16px; font-size:12px; font-weight:600; color:#94a3b8; background:transparent; border:none; border-radius:6px; cursor:pointer; transition:all 0.15s; }
  .mode-btn:hover { color:#e2e8f0; }
  .mode-btn.active { background:#3b82f6; color:white; }

  .target-pill { display:flex; align-items:center; gap:8px; padding:6px 12px; background:#172554; border-radius:20px; font-size:12px; color:#60a5fa; font-weight:600; border:1px solid #1e3a5f; }
  .target-pill .dot { width:6px; height:6px; background:#22c55e; border-radius:50%; box-shadow:0 0 0 0 rgba(34, 197, 94, 0.7); animation:pulse 2s infinite; }
  @keyframes pulse { 0% { box-shadow:0 0 0 0 rgba(34, 197, 94, 0.7); } 70% { box-shadow:0 0 0 8px rgba(34, 197, 94, 0); } 100% { box-shadow:0 0 0 0 rgba(34, 197, 94, 0); } }

  /* APP LAYOUT */
  .app { display:grid; grid-template-columns:300px 1fr; min-height:calc(100vh - 60px); max-width:1600px; margin:0 auto; }

  /* SIDEBAR */
  .sidebar { background:#0a0e1a; border-right:1px solid #1e293b; padding:20px 0; overflow-y:auto; max-height:calc(100vh - 60px); position:sticky; top:60px; }
  .sidebar-section { display:none; }
  .sidebar-section.active { display:block; }

  .sidebar-header { padding:0 20px 14px; border-bottom:1px solid #1e293b; margin-bottom:10px; }
  .sidebar-title { font-size:13px; font-weight:700; color:#f1f5f9; }
  .sidebar-meta { font-size:11px; color:#64748b; margin-top:2px; }

  /* Strategy nav */
  .strategy-nav { padding:0; }
  .strategy-part { font-size:10px; font-weight:700; color:#3b82f6; text-transform:uppercase; letter-spacing:0.5px; padding:14px 20px 6px; }
  .strategy-link { display:flex; gap:10px; padding:9px 20px; font-size:13px; color:#cbd5e1; text-decoration:none; transition:all 0.1s; border-left:2px solid transparent; align-items:flex-start; }
  .strategy-link:hover { background:#1e293b; color:#f1f5f9; }
  .strategy-link.active { background:#172554; color:#60a5fa; border-left-color:#3b82f6; font-weight:600; }
  .strategy-link .nav-num { color:#475569; font-size:11px; font-weight:600; min-width:18px; flex-shrink:0; }
  .strategy-link.active .nav-num { color:#3b82f6; }

  /* Archive nav */
  .search-box { padding:0 20px 12px; }
  .search-input { width:100%; background:#1e293b; border:1px solid #334155; color:#e2e8f0; font-size:12px; padding:8px 10px; border-radius:6px; outline:none; transition:border-color 0.15s; }
  .search-input:focus { border-color:#3b82f6; }
  .search-input::placeholder { color:#64748b; }

  .root-folder { padding:6px 0; }
  .root-name { font-size:10px; font-weight:700; color:#3b82f6; text-transform:uppercase; letter-spacing:0.5px; padding:8px 20px 6px; border-top:1px solid #1e293b; margin-top:6px; }
  .root-folder:first-child .root-name { border-top:none; margin-top:0; }
  .dir { padding:0; }
  .dir-name { font-size:12px; font-weight:600; color:#cbd5e1; padding:5px 20px; padding-left:calc(20px + var(--d, 0) * 14px); cursor:pointer; user-select:none; transition:background 0.1s; }
  .dir-name:hover { background:#1e293b; }
  .dir.collapsed .dir-children { display:none; }
  .file-link { display:block; padding:5px 20px; padding-left:calc(20px + var(--d, 0) * 14px); font-size:12px; color:#94a3b8; text-decoration:none; transition:all 0.1s; line-height:1.5; }
  .file-link:hover { background:#1e293b; color:#e2e8f0; }
  .file-link.active { background:#172554; color:#60a5fa; border-left:2px solid #3b82f6; padding-left:calc(18px + var(--d, 0) * 14px); }
  .file-icon { margin-right:6px; opacity:0.5; }

  /* CONTENT */
  .content { padding:32px 56px 80px; max-width:1100px; min-width:0; }
  .content-section { display:none; }
  .content-section.active { display:block; }

  /* STRATEGY DOC */
  .strategy-doc { display:none; max-width:880px; }
  .strategy-doc.active { display:block; }
  .doc-meta { font-size:11px; color:#3b82f6; text-transform:uppercase; letter-spacing:0.5px; font-weight:700; margin-bottom:8px; }
  .doc-title { font-size:32px; font-weight:700; color:#f1f5f9; line-height:1.2; letter-spacing:-0.01em; }
  .doc-subtitle { font-size:16px; color:#94a3b8; margin-top:8px; }
  .doc-body { margin-top:32px; padding-top:28px; border-top:1px solid #1e293b; }
  .doc-body h3 { font-size:18px; font-weight:600; color:#f1f5f9; margin:32px 0 14px; }
  .doc-body h3:first-child { margin-top:0; }
  .doc-body h4 { font-size:15px; font-weight:600; color:#cbd5e1; margin:20px 0 10px; }
  .doc-body p { font-size:14px; color:#cbd5e1; margin:10px 0; line-height:1.7; }
  .doc-body ul, .doc-body ol { margin:10px 0 12px 22px; }
  .doc-body li { font-size:14px; color:#cbd5e1; padding:4px 0; line-height:1.6; }
  .doc-body strong, .doc-body b { color:#f1f5f9; font-weight:600; }
  .doc-body em { color:#94a3b8; }

  .big-list { margin-left:0; padding-left:0; counter-reset:item; list-style:none; }
  .big-list li { counter-increment:item; padding:12px 0 12px 50px; position:relative; border-top:1px solid #1e293b; font-size:14px; }
  .big-list li:first-child { border-top:none; }
  .big-list li::before { content:counter(item); position:absolute; left:0; top:14px; width:32px; height:32px; background:#172554; color:#60a5fa; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; }
  .big-list-tasks li::before { background:#0f3460; color:#22c55e; }

  /* HERO STAT */
  .hero-stat { display:flex; align-items:center; gap:24px; padding:28px; background:linear-gradient(135deg, #172554 0%, #1e293b 100%); border-radius:12px; margin:8px 0 24px; flex-wrap:wrap; justify-content:space-between; }
  .hero-stat-block { text-align:center; flex:1; min-width:120px; }
  .hero-stat-value { font-size:36px; font-weight:800; color:#3b82f6; line-height:1; letter-spacing:-0.02em; }
  .hero-stat-value.target { color:#22c55e; }
  .hero-stat-value.warn { color:#f97316; }
  .hero-stat-label { font-size:11px; color:#94a3b8; text-transform:uppercase; letter-spacing:0.5px; margin-top:8px; font-weight:600; }
  .hero-stat-arrow { font-size:24px; color:#475569; }

  /* KPI TABLE */
  .kpi-table { width:100%; border-collapse:collapse; margin:14px 0; font-size:13px; }
  .kpi-table th { background:#0f172a; color:#94a3b8; text-align:left; padding:11px 14px; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; font-weight:600; border-bottom:1px solid #334155; }
  .kpi-table td { padding:10px 14px; border-bottom:1px solid #1e293b; color:#cbd5e1; vertical-align:top; line-height:1.5; }
  .kpi-table tr:hover td { background:#0f172a; }
  .kpi-table td b, .kpi-table td strong { color:#f1f5f9; }
  .kpi-table .muted { color:#64748b; font-size:12px; font-style:italic; }

  /* PILLS */
  .pill { display:inline-block; padding:2px 9px; border-radius:10px; font-size:10px; font-weight:600; white-space:nowrap; }
  .pill-green { background:#052e16; color:#22c55e; }
  .pill-blue { background:#172554; color:#60a5fa; }
  .pill-orange { background:#431407; color:#fb923c; }
  .pill-red { background:#450a0a; color:#f87171; }
  .pill-gray { background:#1e293b; color:#94a3b8; }

  /* CALLOUT */
  .callout { padding:16px 20px; border-radius:8px; margin:18px 0; border-left:3px solid #3b82f6; background:#172554; }
  .callout-success { border-left-color:#22c55e; background:#052e16; }
  .callout-warn { border-left-color:#f97316; background:#431407; }
  .callout-info { border-left-color:#3b82f6; background:#172554; }
  .callout-label { font-size:10px; font-weight:700; color:#3b82f6; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px; }
  .callout-success .callout-label { color:#22c55e; }
  .callout-warn .callout-label { color:#fb923c; }
  .callout-text { font-size:14px; color:#cbd5e1; line-height:1.6; }

  /* FORMULA */
  .formula-box { background:#0f172a; border:1px solid #334155; border-radius:10px; padding:20px; margin:14px 0; }
  .formula-line { display:flex; align-items:center; justify-content:center; gap:10px; padding:10px 0; flex-wrap:wrap; }
  .formula-line + .formula-line { border-top:1px dashed #334155; }
  .formula-line .num { color:#3b82f6; font-weight:700; font-size:20px; }
  .formula-line .op { color:#64748b; font-size:18px; }
  .formula-line .res { color:#22c55e; font-weight:700; font-size:22px; }
  .formula-line .res.target { color:#22c55e; }
  .formula-line .caption { font-size:11px; color:#64748b; text-transform:uppercase; letter-spacing:0.5px; margin-left:14px; }

  /* CARDS GRID */
  .cards-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:14px; margin:16px 0; }
  .big-card { background:#0f172a; border:1px solid #334155; border-radius:10px; padding:18px; transition:all 0.15s; }
  .big-card:hover { border-color:#3b82f6; transform:translateY(-2px); }
  .big-card-num { width:32px; height:32px; background:#3b82f6; color:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; margin-bottom:12px; }
  .big-card-title { font-size:15px; font-weight:600; color:#f1f5f9; margin-bottom:6px; }
  .big-card-text { font-size:13px; color:#cbd5e1; line-height:1.55; margin-bottom:10px; }
  .big-card-meta { font-size:11px; color:#64748b; padding-top:8px; border-top:1px solid #1e293b; }

  /* RISK SUMMARY */
  .risk-summary { display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:12px; margin:14px 0 20px; }
  .risk-block { padding:18px; border-radius:8px; text-align:center; border:1px solid; }
  .risk-critical { background:#450a0a; border-color:#7f1d1d; }
  .risk-high { background:#431407; border-color:#7c2d12; }
  .risk-medium { background:#172554; border-color:#1e3a5f; }
  .risk-low { background:#1e293b; border-color:#334155; }
  .risk-num { font-size:32px; font-weight:800; line-height:1; }
  .risk-critical .risk-num { color:#f87171; }
  .risk-high .risk-num { color:#fb923c; }
  .risk-medium .risk-num { color:#60a5fa; }
  .risk-low .risk-num { color:#94a3b8; }
  .risk-label { font-size:11px; color:#cbd5e1; margin-top:6px; font-weight:600; }
  .risk-desc { font-size:10px; color:#64748b; margin-top:4px; }

  /* QUARTER */
  .quarter-block { background:#0f172a; border:1px solid #334155; border-radius:10px; padding:18px; margin:14px 0; }
  .quarter-target { font-size:12px; color:#22c55e; padding:8px 12px; background:#052e16; border-radius:6px; margin-bottom:14px; font-weight:600; }
  .quarter-block h4 { font-size:13px; color:#f1f5f9; margin-top:14px; padding-top:10px; border-top:1px solid #1e293b; }
  .quarter-block h4:first-of-type { padding-top:0; border-top:none; margin-top:0; }

  /* ARCHIVE DOC */
  .doc { display:none; }
  .doc.active { display:block; }
  .doc-header { padding-bottom:18px; margin-bottom:24px; border-bottom:1px solid #1e293b; }
  .breadcrumb { font-size:11px; color:#64748b; text-transform:uppercase; letter-spacing:0.5px; font-family:ui-monospace,Menlo,monospace; }
  .doc-content { font-size:14px; line-height:1.7; }
  .doc-content h1 { font-size:24px; color:#f1f5f9; margin:24px 0 12px; line-height:1.3; }
  .doc-content h2 { font-size:20px; color:#f1f5f9; margin:22px 0 10px; padding-bottom:6px; border-bottom:1px solid #1e293b; }
  .doc-content h3 { font-size:16px; color:#cbd5e1; margin:18px 0 8px; font-weight:600; }
  .doc-content h4 { font-size:14px; color:#cbd5e1; margin:14px 0 6px; font-weight:600; }
  .doc-content p { font-size:14px; color:#cbd5e1; margin:10px 0; line-height:1.7; }
  .doc-content ul, .doc-content ol { margin:10px 0 10px 22px; }
  .doc-content li { padding:3px 0; }
  .doc-content strong { color:#f1f5f9; font-weight:600; }
  .doc-content code { background:#1e293b; color:#fbbf24; padding:1px 6px; border-radius:3px; font-size:12px; }
  .doc-content blockquote { border-left:3px solid #3b82f6; padding:6px 14px; margin:12px 0; background:#172554; border-radius:0 6px 6px 0; color:#cbd5e1; font-style:italic; }
  .doc-content table { width:100%; border-collapse:collapse; margin:12px 0; font-size:13px; }
  .doc-content th { background:#0f172a; color:#94a3b8; text-align:left; padding:10px 12px; border:1px solid #334155; font-size:12px; font-weight:600; }
  .doc-content td { padding:9px 12px; border:1px solid #1e293b; color:#cbd5e1; vertical-align:top; }

  /* EMPTY STATE */
  .empty-state { display:flex; align-items:center; justify-content:center; min-height:60vh; color:#64748b; font-size:14px; flex-direction:column; gap:12px; }
  .empty-state .icon { font-size:48px; opacity:0.3; }

  /* SCROLLBARS */
  .sidebar::-webkit-scrollbar, .content::-webkit-scrollbar { width:8px; }
  .sidebar::-webkit-scrollbar-track, .content::-webkit-scrollbar-track { background:#0a0e1a; }
  .sidebar::-webkit-scrollbar-thumb, .content::-webkit-scrollbar-thumb { background:#334155; border-radius:4px; }
  .sidebar::-webkit-scrollbar-thumb:hover, .content::-webkit-scrollbar-thumb:hover { background:#475569; }

  .menu-toggle { display:none; }
  @media (max-width: 900px) {
    .topnav-inner { flex-wrap:wrap; gap:12px; }
    .target-pill { display:none; }
    .app { grid-template-columns:1fr; }
    .sidebar { position:fixed; left:-100%; top:60px; bottom:0; width:85%; max-width:340px; z-index:100; transition:left 0.2s; box-shadow:2px 0 20px rgba(0,0,0,0.5); }
    .sidebar.open { left:0; }
    .menu-toggle { display:flex; position:fixed; bottom:20px; right:20px; width:52px; height:52px; border-radius:50%; background:#3b82f6; color:white; align-items:center; justify-content:center; font-size:22px; cursor:pointer; z-index:101; border:none; box-shadow:0 4px 16px rgba(59,130,246,0.4); }
    .content { padding:24px 20px 80px; }
    .doc-title { font-size:24px; }
    .hero-stat { gap:16px; padding:18px; }
    .hero-stat-value { font-size:24px; }
    .hero-stat-arrow { display:none; }
    .kpi-table { font-size:12px; }
    .kpi-table th, .kpi-table td { padding:8px 10px; }
  }
</style>
</head>
<body>

<nav class="topnav">
  <div class="topnav-inner">
    <div class="brand">
      <div class="brand-name">ДонПлафон · Стратегия роста</div>
      <div class="brand-sub">Внутренний документ для команды</div>
    </div>
    <div class="target-pill"><span class="dot"></span>20М → 40М к декабрю 2026</div>
    <div class="mode-switcher">
      <button class="mode-btn active" data-mode="strategy">📋 Стратегия</button>
      <button class="mode-btn" data-mode="archive">📚 Архив (${totalFiles})</button>
    </div>
  </div>
</nav>

<div class="app">
  <aside class="sidebar" id="sidebar">

    <div class="sidebar-section active" id="sidebar-strategy">
      <div class="sidebar-header">
        <div class="sidebar-title">📋 Стратегический документ</div>
        <div class="sidebar-meta">13 разделов · ~25 минут чтения</div>
      </div>
      <div class="strategy-nav" id="strategyNav"><!-- generated by JS --></div>
    </div>

    <div class="sidebar-section" id="sidebar-archive">
      <div class="sidebar-header">
        <div class="sidebar-title">📚 Полный архив</div>
        <div class="sidebar-meta">${totalFiles} файлов исследования</div>
      </div>
      <div class="search-box">
        <input type="text" class="search-input" id="search" placeholder="🔍 Поиск по файлам...">
      </div>
      ${archiveSidebar}
    </div>

  </aside>

  <main class="content" id="content">

    <div class="content-section active" id="content-strategy">
      <div id="strategyDocs"><!-- generated by JS --></div>
    </div>

    <div class="content-section" id="content-archive">
      <div class="empty-state" id="empty">
        <div class="icon">📚</div>
        <div>Выбери файл слева для чтения</div>
        <div style="font-size:12px; opacity:0.7;">${totalFiles} документов готовы к просмотру</div>
      </div>
      ${archiveContent}
    </div>

  </main>
</div>

<button class="menu-toggle" id="menuToggle">☰</button>

<script>
${strategyContent}
</script>

<script>
  // Build strategy nav and docs
  const navEl = document.getElementById('strategyNav');
  const docsEl = document.getElementById('strategyDocs');
  let currentPart = '';
  STRATEGY.forEach((s, idx) => {
    if (s.part !== currentPart) {
      currentPart = s.part;
      const p = document.createElement('div');
      p.className = 'strategy-part';
      p.textContent = s.part;
      navEl.appendChild(p);
    }
    const link = document.createElement('a');
    link.className = 'strategy-link' + (idx === 0 ? ' active' : '');
    link.href = '#strategy/' + s.id;
    link.dataset.strategy = s.id;
    link.innerHTML = '<span class="nav-num">' + (idx + 1) + '</span><span>' + s.title + '</span>';
    navEl.appendChild(link);

    const doc = document.createElement('article');
    doc.className = 'strategy-doc' + (idx === 0 ? ' active' : '');
    doc.id = 'strategy-' + s.id;
    doc.innerHTML = '<div class="doc-meta">' + s.part + '</div><h1 class="doc-title">' + s.title + '</h1>' + (s.subtitle ? '<div class="doc-subtitle">' + s.subtitle + '</div>' : '') + '<div class="doc-body">' + s.body + '</div>';
    docsEl.appendChild(doc);
  });

  // Render markdown for archive
  document.querySelectorAll('script[type="text/markdown"]').forEach(s => {
    const id = s.dataset.for;
    const target = document.querySelector('#' + id + ' [data-md]');
    if (target && window.marked) target.innerHTML = marked.parse(s.textContent);
  });

  // Mode switch
  const modeBtns = document.querySelectorAll('.mode-btn');
  const sidebarSections = { strategy: document.getElementById('sidebar-strategy'), archive: document.getElementById('sidebar-archive') };
  const contentSections = { strategy: document.getElementById('content-strategy'), archive: document.getElementById('content-archive') };

  function switchMode(mode) {
    modeBtns.forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
    Object.keys(sidebarSections).forEach(k => {
      sidebarSections[k].classList.toggle('active', k === mode);
      contentSections[k].classList.toggle('active', k === mode);
    });
    if (history.replaceState && !window.location.hash.startsWith('#' + mode)) {
      history.replaceState(null, '', mode === 'strategy' ? '#strategy/' + STRATEGY[0].id : '#archive');
    }
  }

  modeBtns.forEach(b => b.addEventListener('click', () => switchMode(b.dataset.mode)));

  // Strategy navigation
  document.querySelectorAll('.strategy-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.dataset.strategy;
      document.querySelectorAll('.strategy-link').forEach(l => l.classList.remove('active'));
      document.querySelectorAll('.strategy-doc').forEach(d => d.classList.remove('active'));
      link.classList.add('active');
      document.getElementById('strategy-' + id).classList.add('active');
      window.scrollTo({top:0, behavior:'smooth'});
      if (window.innerWidth < 900) document.getElementById('sidebar').classList.remove('open');
      if (history.replaceState) history.replaceState(null, '', '#strategy/' + id);
    });
  });

  // Archive navigation
  const empty = document.getElementById('empty');
  function showArchiveFile(id) {
    document.querySelectorAll('.doc').forEach(d => d.classList.remove('active'));
    document.querySelectorAll('.file-link').forEach(l => l.classList.remove('active'));
    const doc = document.getElementById(id);
    const link = document.querySelector('.file-link[data-file="' + id + '"]');
    if (doc) {
      doc.classList.add('active');
      empty.style.display = 'none';
    }
    if (link) link.classList.add('active');
    if (window.innerWidth < 900) document.getElementById('sidebar').classList.remove('open');
    window.scrollTo({top:0});
    if (history.replaceState) history.replaceState(null, '', '#archive/' + id);
  }

  document.querySelectorAll('.file-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      switchMode('archive');
      showArchiveFile(link.dataset.file);
    });
  });

  document.querySelectorAll('.dir-name').forEach(d => {
    d.addEventListener('click', () => d.parentElement.classList.toggle('collapsed'));
  });

  // Mobile menu
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Search
  const search = document.getElementById('search');
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

  // Hash routing
  function handleHash() {
    const h = window.location.hash;
    if (h.startsWith('#archive/')) {
      switchMode('archive');
      const id = h.slice(9);
      if (document.getElementById(id)) showArchiveFile(id);
    } else if (h.startsWith('#archive')) {
      switchMode('archive');
    } else if (h.startsWith('#strategy/')) {
      switchMode('strategy');
      const id = h.slice(10);
      const link = document.querySelector('.strategy-link[data-strategy="' + id + '"]');
      if (link) link.click();
    }
  }
  handleHash();
  window.addEventListener('hashchange', handleHash);
</script>

</body>
</html>
`;

fs.writeFileSync(OUT, html);
console.log(`✓ Built ${OUT}`);
console.log(`  Strategy sections: 13`);
console.log(`  Archive files: ${totalFiles}`);
console.log(`  Size: ${(fs.statSync(OUT).size / 1024).toFixed(1)} KB`);
