#!/usr/bin/env node
// Сборка: Справочник + Стратегия + Архив 139 файлов
// Editorial dark design · Fraunces serif headlines · Geist body · JetBrains Mono numbers

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FOLDERS = ['КОНТЕКСТ', 'КОНТЕКСТ СМЕЖНЫЕ'];
const OUT = path.join(__dirname, 'index.html');

const referenceContent = fs.readFileSync(path.join(__dirname, 'reference-content.js'), 'utf8');
const strategyContent = fs.readFileSync(path.join(__dirname, 'strategy-content.js'), 'utf8');
const linkMapping = fs.readFileSync(path.join(__dirname, 'link-mapping.js'), 'utf8');

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
    if (item.type === 'file') item.id = 'f' + (++fileCounter);
    else if (item.children) assignIds(item.children);
  }
}

function renderArchiveSidebar(tree, depth = 0) {
  let html = '';
  for (const item of tree) {
    if (item.type === 'dir') {
      html += `<div class="dir" style="--d:${depth}"><div class="dir-name">${escapeHtml(item.name)}</div><div class="dir-children">${renderArchiveSidebar(item.children, depth + 1)}</div></div>`;
    } else {
      html += `<a class="file-link" href="#archive/${item.id}" data-file="${item.id}" style="--d:${depth}">${escapeHtml(item.name.replace(/\.md$/, ''))}</a>`;
    }
  }
  return html;
}

function renderArchiveContent(tree, parentPath = '') {
  let html = '';
  for (const item of tree) {
    if (item.type === 'dir') {
      html += renderArchiveContent(item.children, path.join(parentPath, item.name));
    } else {
      const content = fs.readFileSync(item.full, 'utf8');
      html += `<article class="archive-doc" id="${item.id}">`;
      html += `<div class="archive-meta">${escapeHtml(parentPath || 'root')}</div>`;
      html += `<h1 class="archive-title">${escapeHtml(item.name.replace(/\.md$/, ''))}</h1>`;
      html += `<div class="archive-body" data-md></div>`;
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

const trees = FOLDERS.map(f => ({ name: f, children: walk(path.join(ROOT, f)) }));
trees.forEach(t => assignIds(t.children));
const totalFiles = trees.reduce((sum, t) => sum + flattenFiles(t.children).length, 0);

let archiveSidebar = '';
let archiveDocsHtml = '';
trees.forEach(t => {
  archiveSidebar += `<div class="archive-folder"><div class="archive-folder-name">${escapeHtml(t.name)}</div>${renderArchiveSidebar(t.children)}</div>`;
  archiveDocsHtml += renderArchiveContent(t.children, t.name);
});

// Build path→file mapping for source-tag deep links
const allFilesFlat = [];
trees.forEach(t => {
  flattenFiles(t.children).forEach(f => {
    allFilesFlat.push({ id: f.id, path: path.join(t.name, f.path), name: f.name.replace(/\.md$/, '') });
  });
});
const filesIndex = JSON.stringify(allFilesFlat);

const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ДонПлафон · Стратегия 20→40</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..900,0..100&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<style>
  :root {
    /* Editorial dark palette */
    --bg: #0a0d14;
    --bg-soft: #0f1320;
    --bg-card: #131826;
    --bg-elev: #1a2032;
    --bg-hover: #1f2740;

    --line: #1e2638;
    --line-strong: #2a3450;
    --line-soft: #161b29;

    --ink: #f4f1eb;
    --ink-2: #c8c5be;
    --ink-3: #8a8b94;
    --ink-4: #5d5f6e;

    /* Single warm accent — amber gold (strategic, not corporate-blue) */
    --gold: #e9b949;
    --gold-strong: #f3c563;
    --gold-soft: rgba(233, 185, 73, 0.12);
    --gold-tint: rgba(233, 185, 73, 0.04);
    --gold-line: rgba(233, 185, 73, 0.3);

    /* Semantic — restrained */
    --emerald: #6dd4a4;
    --emerald-soft: rgba(109, 212, 164, 0.12);
    --rust: #e07b6b;
    --rust-soft: rgba(224, 123, 107, 0.12);
    --sky: #7eb2dd;
    --sky-soft: rgba(126, 178, 221, 0.12);
    --amber-warn: #d99853;
    --amber-warn-soft: rgba(217, 152, 83, 0.12);

    /* Type */
    --serif: 'Fraunces', 'EB Garamond', Georgia, serif;
    --sans: 'Manrope', system-ui, -apple-system, sans-serif;
    --mono: 'JetBrains Mono', ui-monospace, monospace;

    /* Motion */
    --ease: cubic-bezier(0.32, 0.72, 0, 1);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  *::selection { background: var(--gold-soft); color: var(--gold-strong); }

  html, body {
    background: var(--bg);
    color: var(--ink-2);
    font-family: var(--sans);
    font-size: 15px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'ss01', 'cv11';
    text-rendering: optimizeLegibility;
  }

  body {
    background-image:
      radial-gradient(ellipse at top, rgba(233, 185, 73, 0.04) 0%, transparent 50%),
      radial-gradient(ellipse at bottom right, rgba(126, 178, 221, 0.025) 0%, transparent 60%);
    background-attachment: fixed;
    min-height: 100vh;
  }

  /* Subtle grain overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: 0.4;
    z-index: 1;
    background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.025 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
    mix-blend-mode: overlay;
  }

  /* ========== TOP BAR ========== */
  .top {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(10, 13, 20, 0.85);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    border-bottom: 1px solid var(--line);
  }
  .top-inner {
    max-width: 1640px;
    margin: 0 auto;
    padding: 18px 32px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 28px;
  }

  .brand {
    display: flex;
    align-items: baseline;
    gap: 14px;
  }
  .brand-mark {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, var(--gold-strong), var(--gold) 60%, #b88e30);
    box-shadow: 0 0 20px rgba(233, 185, 73, 0.4), inset 0 -1px 4px rgba(0,0,0,0.3);
    flex-shrink: 0;
    align-self: center;
  }
  .brand-name {
    font-family: var(--serif);
    font-weight: 500;
    font-size: 18px;
    color: var(--ink);
    letter-spacing: -0.01em;
    font-variation-settings: 'opsz' 60, 'SOFT' 50;
  }
  .brand-sub {
    font-size: 12px;
    color: var(--ink-3);
    letter-spacing: 0.02em;
  }

  .target-track {
    display: flex;
    align-items: center;
    gap: 0;
    justify-self: center;
    padding: 6px 16px;
    background: var(--bg-card);
    border: 1px solid var(--line);
    border-radius: 100px;
    font-family: var(--mono);
    font-size: 12px;
    font-weight: 500;
  }
  .target-from { color: var(--ink-3); }
  .target-arrow { color: var(--ink-4); margin: 0 10px; }
  .target-to { color: var(--gold); }
  .target-pulse {
    width: 6px;
    height: 6px;
    background: var(--gold);
    border-radius: 50%;
    margin-right: 10px;
    box-shadow: 0 0 0 0 rgba(233, 185, 73, 0.5);
    animation: pulse 2.4s var(--ease) infinite;
  }
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(233, 185, 73, 0.5); }
    70% { box-shadow: 0 0 0 8px rgba(233, 185, 73, 0); }
    100% { box-shadow: 0 0 0 0 rgba(233, 185, 73, 0); }
  }

  .modes {
    display: flex;
    gap: 2px;
    padding: 3px;
    background: var(--bg-card);
    border: 1px solid var(--line);
    border-radius: 8px;
  }
  .mode-btn {
    padding: 7px 14px;
    font-family: var(--sans);
    font-size: 12px;
    font-weight: 600;
    color: var(--ink-3);
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s var(--ease);
    letter-spacing: 0.01em;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .mode-btn:hover { color: var(--ink); }
  .mode-btn.active {
    background: var(--bg-elev);
    color: var(--ink);
    box-shadow: 0 1px 0 0 var(--line-strong) inset;
  }
  .mode-btn .count {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--ink-4);
    margin-left: 2px;
  }
  .mode-btn.active .count { color: var(--gold); }

  /* ========== APP ========== */
  .app {
    max-width: 1640px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }
  .mode-pane { display: none; }
  .mode-pane.active { display: block; }

  /* ========== REFERENCE MODE ========== */
  .ref-pane { padding: 28px 32px 80px; }

  .ref-header {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 28px;
    align-items: end;
    padding-bottom: 24px;
    margin-bottom: 24px;
    border-bottom: 1px solid var(--line);
  }
  .ref-eyebrow {
    font-family: var(--mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--gold);
    margin-bottom: 10px;
  }
  .ref-title {
    font-family: var(--serif);
    font-weight: 400;
    font-size: clamp(36px, 4.5vw, 56px);
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--ink);
    font-variation-settings: 'opsz' 144, 'SOFT' 30;
  }
  .ref-title em {
    font-style: italic;
    color: var(--gold);
    font-weight: 300;
    font-variation-settings: 'opsz' 144, 'SOFT' 100;
  }
  .ref-stats {
    display: flex;
    gap: 24px;
    font-family: var(--mono);
  }
  .ref-stat-item {
    text-align: right;
  }
  .ref-stat-num {
    font-family: var(--serif);
    font-weight: 400;
    font-size: 28px;
    color: var(--ink);
    line-height: 1;
    font-variation-settings: 'opsz' 60;
  }
  .ref-stat-num.ink-gold { color: var(--gold); }
  .ref-stat-num.ink-emerald { color: var(--emerald); }
  .ref-stat-num.ink-amber { color: var(--amber-warn); }
  .ref-stat-label {
    font-family: var(--mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--ink-4);
    margin-top: 6px;
  }

  /* TABS — refined editorial */
  .tabs {
    display: flex;
    gap: 0;
    overflow-x: auto;
    overflow-y: visible;
    margin-bottom: 28px;
    border-bottom: 1px solid var(--line);
    scrollbar-width: thin;
    scrollbar-color: var(--line-strong) transparent;
    position: relative;
  }
  .tabs::-webkit-scrollbar { height: 2px; }
  .tabs::-webkit-scrollbar-thumb { background: var(--line-strong); }
  .tab {
    flex-shrink: 0;
    padding: 14px 18px;
    font-size: 12.5px;
    font-weight: 500;
    color: var(--ink-3);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: color 0.18s var(--ease);
    white-space: nowrap;
    position: relative;
    user-select: none;
    letter-spacing: 0.01em;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--sans);
  }
  .tab:hover { color: var(--ink-2); }
  .tab.active { color: var(--ink); font-weight: 600; }
  .tab.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--gold);
    box-shadow: 0 0 12px var(--gold);
  }
  .tab .num {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--ink-4);
    font-weight: 500;
  }
  .tab.active .num { color: var(--gold); }
  .tab.has-badge::before {
    content: '';
    width: 6px;
    height: 6px;
    background: var(--amber-warn);
    border-radius: 50%;
    margin-right: 2px;
  }

  /* SECTION (reference) */
  .ref-section { display: none; animation: fadeIn 0.4s var(--ease); }
  .ref-section.active { display: block; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

  .section-head {
    margin-bottom: 24px;
  }
  .section-num {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--gold);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .section-title {
    font-family: var(--serif);
    font-weight: 400;
    font-size: 32px;
    line-height: 1.15;
    color: var(--ink);
    margin: 8px 0 8px;
    letter-spacing: -0.015em;
    font-variation-settings: 'opsz' 144, 'SOFT' 50;
  }
  .section-goal {
    color: var(--ink-3);
    font-size: 15px;
    line-height: 1.6;
    max-width: 800px;
  }

  /* GRID */
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .card { background: var(--bg-card); border: 1px solid var(--line); border-radius: 12px; padding: 22px 22px 22px; transition: border-color 0.2s var(--ease); position: relative; overflow: hidden; }
  .card.full { grid-column: 1 / -1; }
  .card:hover { border-color: var(--line-strong); }
  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 22px;
    right: 22px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold-line), transparent);
    opacity: 0;
    transition: opacity 0.3s var(--ease);
  }
  .card:hover::before { opacity: 1; }

  .card-label {
    font-family: var(--mono);
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .card-label::before {
    content: '';
    width: 10px;
    height: 1px;
    background: currentColor;
    opacity: 0.4;
  }
  .card-label.label-info { color: var(--sky); }
  .card-label.label-success { color: var(--emerald); }
  .card-label.label-warn { color: var(--amber-warn); }
  .card-label.label-danger { color: var(--rust); }

  /* DATA TABLE */
  .data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .data-table th { font-family: var(--mono); font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: var(--ink-4); text-transform: uppercase; text-align: left; padding: 8px 10px 8px 0; border-bottom: 1px solid var(--line); }
  .data-table td { padding: 10px 10px 10px 0; border-bottom: 1px solid var(--line-soft); color: var(--ink-2); vertical-align: top; line-height: 1.45; }
  .data-table tr:last-child td { border-bottom: none; }
  .data-table tr:hover td { color: var(--ink); }
  .data-table b, .data-table strong { color: var(--ink); font-weight: 600; }

  /* PILLS */
  .pill { display: inline-block; padding: 2px 9px; border-radius: 100px; font-family: var(--mono); font-size: 10px; font-weight: 500; letter-spacing: 0.02em; white-space: nowrap; }
  .pill-success { background: var(--emerald-soft); color: var(--emerald); }
  .pill-info { background: var(--sky-soft); color: var(--sky); }
  .pill-warn { background: var(--amber-warn-soft); color: var(--amber-warn); }
  .pill-danger { background: var(--rust-soft); color: var(--rust); }

  /* LISTS */
  .bullet-list, .check-list, .checkbox-list { list-style: none; }
  .bullet-list li { font-size: 13.5px; color: var(--ink-2); padding: 4px 0 4px 16px; line-height: 1.55; position: relative; }
  .bullet-list li::before { content: ''; position: absolute; left: 4px; top: 12px; width: 4px; height: 1px; background: var(--ink-4); }
  .bullet-list.compact li { padding: 2px 0 2px 16px; font-size: 12.5px; }

  .check-list li { font-size: 13.5px; color: var(--ink-2); padding: 4px 0 4px 22px; line-height: 1.55; position: relative; }
  .check-list li::before { content: '→'; position: absolute; left: 0; color: var(--gold); font-weight: 600; }

  .checkbox-list li { font-size: 13.5px; color: var(--ink-2); padding: 5px 0 5px 24px; line-height: 1.55; position: relative; }
  .checkbox-list li::before { content: ''; position: absolute; left: 0; top: 8px; width: 12px; height: 12px; border: 1.5px solid var(--ink-4); border-radius: 3px; }

  .lead { font-size: 14px; color: var(--ink-2); margin-bottom: 10px; }

  /* BLOCK H4 */
  .block-h4 { font-family: var(--sans); font-size: 12px; font-weight: 600; color: var(--ink); margin: 14px 0 6px; letter-spacing: 0.01em; }
  .block-h4:first-child { margin-top: 0; }

  /* CALLOUT */
  .callout { padding: 14px 16px; border-radius: 8px; margin: 14px 0 0; border-left: 2px solid; }
  .callout-info { background: var(--sky-soft); border-color: var(--sky); }
  .callout-success { background: var(--emerald-soft); border-color: var(--emerald); }
  .callout-warn { background: var(--amber-warn-soft); border-color: var(--amber-warn); }
  .callout-danger { background: var(--rust-soft); border-color: var(--rust); }
  .callout-label { font-family: var(--mono); font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px; }
  .callout-info .callout-label { color: var(--sky); }
  .callout-success .callout-label { color: var(--emerald); }
  .callout-warn .callout-label { color: var(--amber-warn); }
  .callout-danger .callout-label { color: var(--rust); }
  .callout-text { font-size: 13px; color: var(--ink-2); line-height: 1.55; }
  .callout-text b { color: var(--ink); }

  /* QUOTE */
  .quote { font-family: var(--serif); font-style: italic; font-size: 16px; line-height: 1.5; color: var(--ink-2); padding: 12px 0 12px 18px; border-left: 2px solid var(--gold); margin: 14px 0; font-variation-settings: 'opsz' 60; }

  /* FORMULA */
  .formula-box { padding: 28px 16px; text-align: center; }
  .formula-line { display: inline-flex; align-items: baseline; gap: 18px; flex-wrap: wrap; justify-content: center; font-family: var(--mono); }
  .formula-line .num { font-family: var(--serif); font-weight: 400; font-size: 36px; color: var(--ink); font-variation-settings: 'opsz' 144; }
  .formula-line .op { font-family: var(--serif); color: var(--ink-4); font-size: 30px; font-weight: 300; }
  .formula-line .res { font-family: var(--serif); font-weight: 500; font-size: 42px; color: var(--gold); font-variation-settings: 'opsz' 144; letter-spacing: -0.02em; }
  .formula-caption { font-family: var(--mono); font-size: 11px; color: var(--ink-4); text-transform: uppercase; letter-spacing: 0.12em; margin-top: 16px; }

  /* METRIC GRID */
  .metric-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1px; background: var(--line); border-radius: 10px; overflow: hidden; }
  .metric-card { background: var(--bg-card); padding: 18px 16px; }
  .m-label { font-family: var(--mono); font-size: 10px; color: var(--ink-4); letter-spacing: 0.08em; text-transform: uppercase; }
  .m-value { font-family: var(--serif); font-weight: 400; font-size: 24px; color: var(--ink); margin-top: 8px; line-height: 1; font-variation-settings: 'opsz' 144; letter-spacing: -0.01em; }
  .m-value.m-success { color: var(--emerald); }
  .m-value.m-warn { color: var(--amber-warn); }

  /* SOURCES */
  .sources { margin-top: 32px; padding-top: 18px; border-top: 1px solid var(--line); }
  .sources-label { font-family: var(--mono); font-size: 10px; color: var(--ink-4); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px; }
  .source-tag { display: inline-block; font-family: var(--mono); font-size: 11px; color: var(--ink-3); padding: 3px 10px; border: 1px solid var(--line); border-radius: 4px; margin: 0 6px 6px 0; transition: all 0.15s var(--ease); cursor: pointer; text-decoration: none; }
  .source-tag:hover { border-color: var(--gold-line); color: var(--gold); background: var(--gold-tint); }
  .source-tag::after { content: ' ↗'; opacity: 0; margin-left: 2px; transition: opacity 0.15s var(--ease); }
  .source-tag:hover::after { opacity: 1; }

  /* REF-LINK — inline deep-link to archive */
  .ref-link { color: inherit; text-decoration: none; cursor: pointer; border-bottom: 1px dotted var(--gold-line); padding-bottom: 1px; transition: all 0.15s var(--ease); position: relative; white-space: nowrap; }
  .ref-link:hover { color: var(--gold); border-bottom-color: var(--gold); border-bottom-style: solid; }
  .ref-link::after { content: '↗'; font-size: 0.7em; vertical-align: super; margin-left: 1px; color: var(--gold); opacity: 0.5; transition: opacity 0.15s var(--ease); font-weight: 600; }
  .ref-link:hover::after { opacity: 1; }
  /* Don't underline links inside table cells double */
  .data-table .ref-link, .kpi-table .ref-link { white-space: normal; }
  /* Variant for inside <strong> / <b> */
  strong .ref-link, b .ref-link { color: inherit; }
  strong .ref-link:hover, b .ref-link:hover { color: var(--gold); }

  /* DRAWER */
  .drawer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(5, 7, 12, 0.6);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 200;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s var(--ease);
  }
  .drawer-overlay.open { opacity: 1; pointer-events: auto; }

  .drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 65%;
    max-width: 880px;
    background: var(--bg);
    border-left: 1px solid var(--line-strong);
    z-index: 201;
    transform: translateX(100%);
    transition: transform 0.32s var(--ease);
    display: flex;
    flex-direction: column;
    box-shadow: -24px 0 60px rgba(0, 0, 0, 0.5);
  }
  .drawer.open { transform: translateX(0); }

  .drawer-header {
    padding: 16px 28px;
    border-bottom: 1px solid var(--line);
    display: flex;
    align-items: center;
    gap: 14px;
    flex-shrink: 0;
    background: var(--bg-soft);
  }
  .drawer-meta {
    flex: 1;
    min-width: 0;
  }
  .drawer-breadcrumb {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--ink-4);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .drawer-title {
    font-family: var(--serif);
    font-size: 16px;
    color: var(--ink);
    margin-top: 4px;
    font-variation-settings: 'opsz' 60;
    line-height: 1.3;
  }
  .drawer-actions { display: flex; gap: 8px; flex-shrink: 0; }
  .drawer-btn {
    background: transparent;
    border: 1px solid var(--line);
    color: var(--ink-3);
    font-family: var(--sans);
    font-size: 12px;
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s var(--ease);
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .drawer-btn:hover { color: var(--ink); border-color: var(--gold-line); }
  .drawer-btn-icon {
    background: transparent;
    border: 1px solid var(--line);
    color: var(--ink-3);
    font-size: 16px;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s var(--ease);
  }
  .drawer-btn-icon:hover { color: var(--ink); border-color: var(--ink-3); background: var(--bg-card); }

  .drawer-body {
    flex: 1;
    overflow-y: auto;
    padding: 32px 40px 60px;
  }
  .drawer-content { font-size: 15px; line-height: 1.7; }
  .drawer-content h1 { font-family: var(--serif); font-size: 28px; color: var(--ink); margin: 0 0 14px; line-height: 1.2; font-weight: 500; font-variation-settings: 'opsz' 144, 'SOFT' 50; }
  .drawer-content h2 { font-family: var(--serif); font-size: 22px; color: var(--ink); margin: 24px 0 12px; padding-bottom: 8px; border-bottom: 1px solid var(--line-soft); font-weight: 500; }
  .drawer-content h3 { font-family: var(--sans); font-size: 16px; color: var(--ink); margin: 20px 0 10px; font-weight: 700; }
  .drawer-content h4 { font-family: var(--sans); font-size: 14px; color: var(--ink); margin: 16px 0 8px; font-weight: 700; }
  .drawer-content p { font-size: 14.5px; color: var(--ink-2); margin: 12px 0; line-height: 1.7; }
  .drawer-content ul, .drawer-content ol { margin: 12px 0 12px 22px; }
  .drawer-content li { font-size: 14.5px; color: var(--ink-2); padding: 4px 0; line-height: 1.6; }
  .drawer-content strong { color: var(--ink); font-weight: 600; }
  .drawer-content em { color: var(--ink-3); font-style: italic; }
  .drawer-content code { font-family: var(--mono); background: var(--bg-card); color: var(--gold); padding: 2px 6px; border-radius: 3px; font-size: 12.5px; border: 1px solid var(--line); }
  .drawer-content blockquote { font-family: var(--serif); font-style: italic; border-left: 2px solid var(--gold); padding: 8px 0 8px 18px; margin: 14px 0; color: var(--ink-2); font-size: 16px; line-height: 1.5; }
  .drawer-content table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 13.5px; }
  .drawer-content th { background: var(--bg-card); color: var(--ink-3); font-family: var(--mono); font-size: 10px; text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--line); font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
  .drawer-content td { padding: 10px 12px; border-bottom: 1px solid var(--line-soft); color: var(--ink-2); vertical-align: top; }
  .drawer-content hr { border: none; border-top: 1px solid var(--line); margin: 24px 0; }
  .drawer-content a { color: var(--gold); text-decoration: none; border-bottom: 1px solid var(--gold-line); }

  .drawer-folder-list {
    background: var(--bg-soft);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 14px 18px;
    margin: 16px 0 24px;
  }
  .drawer-folder-label {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--ink-4);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .drawer-folder-link {
    display: block;
    padding: 5px 0;
    font-size: 13px;
    color: var(--ink-2);
    text-decoration: none;
    cursor: pointer;
    transition: color 0.15s var(--ease);
    border-bottom: 1px solid transparent;
  }
  .drawer-folder-link:hover { color: var(--gold); }

  @media (max-width: 840px) {
    .drawer { width: 100%; max-width: none; }
    .drawer-body { padding: 24px 20px 80px; }
    .drawer-header { padding: 14px 20px; }
    .drawer-btn { display: none; }
  }

  /* MUTED */
  .muted { color: var(--ink-4); font-size: 11px; font-style: italic; }

  /* ========== STRATEGY MODE ========== */
  .strat-pane { display: grid; grid-template-columns: 280px 1fr; min-height: calc(100vh - 80px); }
  .strat-nav { padding: 28px 12px 60px 32px; border-right: 1px solid var(--line); position: sticky; top: 80px; max-height: calc(100vh - 80px); overflow-y: auto; }
  .strat-nav-label { font-family: var(--mono); font-size: 10px; color: var(--ink-4); letter-spacing: 0.12em; text-transform: uppercase; padding: 12px 12px 8px; }
  .strat-nav-link {
    display: flex;
    align-items: baseline;
    gap: 10px;
    padding: 9px 12px;
    font-size: 13px;
    color: var(--ink-3);
    text-decoration: none;
    border-radius: 6px;
    transition: all 0.15s var(--ease);
    line-height: 1.4;
  }
  .strat-nav-link:hover { color: var(--ink-2); background: var(--bg-card); }
  .strat-nav-link.active { color: var(--ink); background: var(--gold-tint); box-shadow: inset 2px 0 0 var(--gold); }
  .strat-nav-num { font-family: var(--mono); font-size: 10px; color: var(--ink-4); flex-shrink: 0; min-width: 16px; }
  .strat-nav-link.active .strat-nav-num { color: var(--gold); }

  .strat-doc-wrap { padding: 40px 56px 80px; max-width: 880px; }
  .strat-doc { display: none; animation: fadeIn 0.5s var(--ease); }
  .strat-doc.active { display: block; }
  .strat-meta { font-family: var(--mono); font-size: 11px; color: var(--gold); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 14px; }
  .strat-title { font-family: var(--serif); font-weight: 400; font-size: clamp(34px, 4vw, 48px); line-height: 1.1; color: var(--ink); letter-spacing: -0.02em; font-variation-settings: 'opsz' 144, 'SOFT' 50; }
  .strat-subtitle { font-family: var(--serif); font-style: italic; font-weight: 300; font-size: 18px; color: var(--ink-3); margin-top: 12px; line-height: 1.4; font-variation-settings: 'opsz' 144, 'SOFT' 100; max-width: 700px; }
  .strat-body { margin-top: 36px; padding-top: 28px; border-top: 1px solid var(--line); }
  .strat-body h3 { font-family: var(--serif); font-weight: 500; font-size: 22px; color: var(--ink); margin: 36px 0 16px; letter-spacing: -0.01em; font-variation-settings: 'opsz' 60; }
  .strat-body h3:first-child { margin-top: 0; }
  .strat-body h4 { font-family: var(--sans); font-size: 14px; font-weight: 700; color: var(--ink); margin: 22px 0 10px; letter-spacing: 0.01em; }
  .strat-body p { font-size: 15px; color: var(--ink-2); margin: 12px 0; line-height: 1.7; }
  .strat-body ul, .strat-body ol { margin: 12px 0 14px 0; padding-left: 0; list-style: none; }
  .strat-body ul li { font-size: 14.5px; color: var(--ink-2); padding: 5px 0 5px 18px; line-height: 1.65; position: relative; }
  .strat-body ul li::before { content: ''; position: absolute; left: 4px; top: 14px; width: 6px; height: 1px; background: var(--gold); }
  .strat-body ol { counter-reset: i; }
  .strat-body ol li { font-size: 14.5px; color: var(--ink-2); padding: 5px 0 5px 24px; counter-increment: i; line-height: 1.65; position: relative; }
  .strat-body ol li::before { content: counter(i) '.'; position: absolute; left: 0; top: 5px; color: var(--gold); font-family: var(--mono); font-size: 12px; font-weight: 600; }
  .strat-body strong, .strat-body b { color: var(--ink); font-weight: 600; }
  .strat-body em { color: var(--ink-3); font-style: italic; }

  .big-list { counter-reset: bl; }
  .big-list li { padding: 14px 0 14px 56px !important; border-top: 1px solid var(--line); font-size: 14.5px; }
  .big-list li:first-child { border-top: none; padding-top: 4px !important; }
  .big-list li::before { content: counter(bl) !important; counter-increment: bl; left: 0 !important; top: 14px !important; width: 32px !important; height: 32px !important; background: var(--gold-soft) !important; color: var(--gold) !important; border-radius: 50% !important; display: flex !important; align-items: center !important; justify-content: center !important; font-size: 13px !important; font-weight: 700 !important; font-family: var(--serif) !important; }
  .big-list-tasks li::before { background: var(--emerald-soft) !important; color: var(--emerald) !important; }

  .hero-stat { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 32px 28px; background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-elev) 100%); border: 1px solid var(--line); border-radius: 14px; margin: 8px 0 28px; flex-wrap: wrap; }
  .hero-stat-block { text-align: center; flex: 1; min-width: 100px; }
  .hero-stat-value { font-family: var(--serif); font-weight: 400; font-size: 44px; color: var(--ink); line-height: 1; letter-spacing: -0.02em; font-variation-settings: 'opsz' 144; }
  .hero-stat-value.target { color: var(--gold); }
  .hero-stat-value.warn { color: var(--amber-warn); }
  .hero-stat-label { font-family: var(--mono); font-size: 10px; color: var(--ink-4); text-transform: uppercase; letter-spacing: 0.12em; margin-top: 10px; }
  .hero-stat-arrow { font-family: var(--serif); font-size: 32px; color: var(--ink-4); font-weight: 300; }

  .kpi-table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13.5px; }
  .kpi-table th { font-family: var(--mono); font-size: 10px; color: var(--ink-4); letter-spacing: 0.1em; text-transform: uppercase; padding: 10px 14px; border-bottom: 1px solid var(--line); text-align: left; font-weight: 600; background: var(--bg-soft); }
  .kpi-table td { padding: 11px 14px; border-bottom: 1px solid var(--line-soft); color: var(--ink-2); vertical-align: top; line-height: 1.5; }
  .kpi-table tr:hover td { background: var(--bg-soft); color: var(--ink); }
  .kpi-table b { color: var(--ink); }

  .formula-box { background: var(--bg-card); border: 1px solid var(--line); border-radius: 12px; padding: 28px 20px; margin: 16px 0; }
  .formula-line { display: flex; align-items: baseline; justify-content: center; gap: 14px; flex-wrap: wrap; padding: 8px 0; }
  .formula-line + .formula-line { border-top: 1px dashed var(--line); margin-top: 8px; padding-top: 16px; }
  .formula-line .caption { font-family: var(--mono); font-size: 10px; color: var(--ink-4); text-transform: uppercase; letter-spacing: 0.1em; margin-left: 12px; }

  .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin: 18px 0; }
  .big-card { background: var(--bg-card); border: 1px solid var(--line); border-radius: 12px; padding: 22px; transition: border-color 0.2s var(--ease); }
  .big-card:hover { border-color: var(--gold-line); }
  .big-card-num { font-family: var(--serif); font-weight: 400; font-size: 28px; color: var(--gold); margin-bottom: 8px; line-height: 1; }
  .big-card-title { font-family: var(--sans); font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
  .big-card-text { font-size: 13.5px; color: var(--ink-2); line-height: 1.55; margin-bottom: 12px; }
  .big-card-meta { font-family: var(--mono); font-size: 10.5px; color: var(--ink-4); padding-top: 10px; border-top: 1px solid var(--line-soft); }

  .risk-summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin: 16px 0 24px; }
  .risk-block { padding: 22px 18px; border-radius: 10px; text-align: center; border: 1px solid var(--line); background: var(--bg-card); }
  .risk-num { font-family: var(--serif); font-weight: 400; font-size: 44px; line-height: 1; }
  .risk-critical { border-color: rgba(224, 123, 107, 0.3); }
  .risk-critical .risk-num { color: var(--rust); }
  .risk-high { border-color: rgba(217, 152, 83, 0.3); }
  .risk-high .risk-num { color: var(--amber-warn); }
  .risk-medium { border-color: rgba(126, 178, 221, 0.3); }
  .risk-medium .risk-num { color: var(--sky); }
  .risk-low { border-color: var(--line); }
  .risk-low .risk-num { color: var(--ink-3); }
  .risk-label { font-family: var(--sans); font-size: 12px; color: var(--ink-2); margin-top: 8px; font-weight: 600; }
  .risk-desc { font-family: var(--mono); font-size: 10px; color: var(--ink-4); margin-top: 4px; letter-spacing: 0.05em; }

  .quarter-block { background: var(--bg-card); border: 1px solid var(--line); border-radius: 12px; padding: 22px; margin: 16px 0; }
  .quarter-target { font-family: var(--mono); font-size: 12px; color: var(--gold); padding: 10px 14px; background: var(--gold-tint); border: 1px solid var(--gold-line); border-radius: 6px; margin-bottom: 16px; font-weight: 500; }
  .quarter-block h4 { font-family: var(--serif); font-size: 17px; font-weight: 500; color: var(--ink); margin-top: 18px; padding-top: 12px; border-top: 1px solid var(--line-soft); font-variation-settings: 'opsz' 60; }
  .quarter-block h4:first-of-type { padding-top: 0; border-top: none; margin-top: 0; }

  /* ========== ARCHIVE MODE ========== */
  .arch-pane { display: grid; grid-template-columns: 320px 1fr; min-height: calc(100vh - 80px); }
  .arch-nav { padding: 24px 0 60px; border-right: 1px solid var(--line); position: sticky; top: 80px; max-height: calc(100vh - 80px); overflow-y: auto; }
  .arch-nav-header { padding: 0 24px 16px; }
  .arch-nav-title { font-family: var(--serif); font-size: 16px; color: var(--ink); font-variation-settings: 'opsz' 60; }
  .arch-nav-meta { font-family: var(--mono); font-size: 11px; color: var(--ink-4); margin-top: 4px; }
  .arch-search { padding: 0 24px 14px; }
  .arch-search input { width: 100%; background: var(--bg-card); border: 1px solid var(--line); color: var(--ink-2); font-family: var(--sans); font-size: 12.5px; padding: 9px 12px; border-radius: 6px; outline: none; transition: border-color 0.15s var(--ease); }
  .arch-search input:focus { border-color: var(--gold-line); }
  .arch-search input::placeholder { color: var(--ink-4); }

  .archive-folder { padding: 6px 0; }
  .archive-folder-name { font-family: var(--mono); font-size: 10px; font-weight: 600; color: var(--gold); letter-spacing: 0.12em; text-transform: uppercase; padding: 12px 24px 8px; border-top: 1px solid var(--line); }
  .archive-folder:first-child .archive-folder-name { border-top: none; }

  .dir-name { font-family: var(--sans); font-size: 12.5px; font-weight: 600; color: var(--ink-2); padding: 6px 24px; padding-left: calc(24px + var(--d, 0) * 14px); cursor: pointer; transition: background 0.15s var(--ease); }
  .dir-name::before { content: '▾'; display: inline-block; margin-right: 6px; color: var(--ink-4); font-size: 10px; transition: transform 0.15s var(--ease); }
  .dir.collapsed .dir-name::before { transform: rotate(-90deg); }
  .dir-name:hover { background: var(--bg-card); color: var(--ink); }
  .dir.collapsed .dir-children { display: none; }

  .file-link { display: block; padding: 5px 24px; padding-left: calc(24px + var(--d, 0) * 14px + 14px); font-size: 12px; color: var(--ink-3); text-decoration: none; transition: all 0.12s var(--ease); line-height: 1.5; }
  .file-link:hover { background: var(--bg-card); color: var(--ink-2); }
  .file-link.active { background: var(--gold-tint); color: var(--gold); box-shadow: inset 2px 0 0 var(--gold); }

  .arch-doc-wrap { padding: 40px 56px 80px; max-width: 980px; }
  .archive-doc { display: none; }
  .archive-doc.active { display: block; }
  .arch-empty { display: flex; align-items: center; justify-content: center; min-height: 60vh; color: var(--ink-4); flex-direction: column; gap: 14px; font-family: var(--serif); font-size: 16px; font-style: italic; }
  .arch-empty-icon { font-family: var(--serif); font-size: 64px; opacity: 0.2; line-height: 1; color: var(--gold); }

  .archive-meta { font-family: var(--mono); font-size: 10.5px; color: var(--ink-4); letter-spacing: 0.1em; text-transform: uppercase; }
  .archive-title { font-family: var(--serif); font-weight: 400; font-size: 36px; line-height: 1.15; color: var(--ink); letter-spacing: -0.015em; margin: 8px 0 24px; padding-bottom: 24px; border-bottom: 1px solid var(--line); font-variation-settings: 'opsz' 144, 'SOFT' 50; }

  .archive-body { font-size: 15px; line-height: 1.7; }
  .archive-body h1 { font-family: var(--serif); font-size: 28px; color: var(--ink); margin: 28px 0 14px; line-height: 1.2; font-weight: 500; }
  .archive-body h2 { font-family: var(--serif); font-size: 22px; color: var(--ink); margin: 24px 0 12px; padding-bottom: 8px; border-bottom: 1px solid var(--line-soft); font-weight: 500; }
  .archive-body h3 { font-family: var(--sans); font-size: 16px; color: var(--ink); margin: 20px 0 10px; font-weight: 700; letter-spacing: 0.005em; }
  .archive-body h4 { font-family: var(--sans); font-size: 14px; color: var(--ink); margin: 16px 0 8px; font-weight: 700; }
  .archive-body p { font-size: 14.5px; color: var(--ink-2); margin: 12px 0; line-height: 1.7; }
  .archive-body ul, .archive-body ol { margin: 12px 0 12px 22px; }
  .archive-body li { font-size: 14.5px; color: var(--ink-2); padding: 4px 0; line-height: 1.6; }
  .archive-body strong { color: var(--ink); font-weight: 600; }
  .archive-body em { color: var(--ink-3); font-style: italic; }
  .archive-body code { font-family: var(--mono); background: var(--bg-card); color: var(--gold); padding: 2px 6px; border-radius: 3px; font-size: 12.5px; border: 1px solid var(--line); }
  .archive-body blockquote { font-family: var(--serif); font-style: italic; border-left: 2px solid var(--gold); padding: 8px 0 8px 18px; margin: 14px 0; color: var(--ink-2); font-size: 16px; line-height: 1.5; }
  .archive-body table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 13.5px; }
  .archive-body th { background: var(--bg-card); color: var(--ink-3); font-family: var(--mono); font-size: 10px; text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--line); font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
  .archive-body td { padding: 10px 12px; border-bottom: 1px solid var(--line-soft); color: var(--ink-2); vertical-align: top; }
  .archive-body hr { border: none; border-top: 1px solid var(--line); margin: 24px 0; }
  .archive-body a { color: var(--gold); text-decoration: none; border-bottom: 1px solid var(--gold-line); }
  .archive-body a:hover { border-bottom-color: var(--gold); }

  /* SCROLLBARS */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--line-strong); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--ink-4); }

  /* MOBILE */
  .menu-toggle { display: none; }

  @media (max-width: 1100px) {
    .strat-pane, .arch-pane { grid-template-columns: 240px 1fr; }
    .arch-doc-wrap, .strat-doc-wrap { padding: 32px 32px 80px; }
  }

  @media (max-width: 840px) {
    .top-inner { grid-template-columns: 1fr auto; padding: 14px 16px; }
    .target-track { display: none; }
    .modes { grid-column: 1 / -1; justify-self: stretch; }
    .mode-btn { flex: 1; justify-content: center; }
    .grid { grid-template-columns: 1fr; }
    .ref-pane { padding: 24px 16px 80px; }
    .ref-header { grid-template-columns: 1fr; gap: 16px; }
    .ref-stats { gap: 16px; }
    .strat-pane, .arch-pane { grid-template-columns: 1fr; }
    .strat-nav, .arch-nav { position: fixed; left: -100%; top: 80px; bottom: 0; width: 85%; max-width: 320px; z-index: 100; background: var(--bg); transition: left 0.25s var(--ease); box-shadow: 4px 0 24px rgba(0,0,0,0.4); border-right: 1px solid var(--line); }
    .strat-nav.open, .arch-nav.open { left: 0; }
    .strat-doc-wrap, .arch-doc-wrap { padding: 28px 20px 80px; }
    .menu-toggle { display: flex; position: fixed; bottom: 20px; right: 20px; width: 52px; height: 52px; border-radius: 50%; background: var(--bg-card); border: 1px solid var(--gold-line); color: var(--gold); align-items: center; justify-content: center; font-size: 22px; cursor: pointer; z-index: 101; box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
    .formula-line .num { font-size: 26px; }
    .formula-line .res { font-size: 30px; }
    .ref-title { font-size: 32px; }
    .section-title { font-size: 26px; }
    .strat-title { font-size: 30px; }
    .archive-title { font-size: 28px; }
  }
</style>
</head>
<body>

<header class="top">
  <div class="top-inner">
    <div class="brand">
      <div class="brand-mark"></div>
      <div>
        <div class="brand-name">ДонПлафон <em style="font-style:italic; color:var(--ink-3); font-weight:300;">×</em> Стратегия</div>
        <div class="brand-sub">Внутренний документ</div>
      </div>
    </div>
    <div class="target-track">
      <span class="target-pulse"></span>
      <span class="target-from">20М ₽</span>
      <span class="target-arrow">⟶</span>
      <span class="target-to">40М ₽</span>
      <span class="target-from" style="margin-left:14px;">декабрь 2026</span>
    </div>
    <div class="modes">
      <button class="mode-btn active" data-mode="reference">Справочник</button>
      <button class="mode-btn" data-mode="strategy">Стратегия</button>
      <button class="mode-btn" data-mode="archive">Архив <span class="count">${totalFiles}</span></button>
    </div>
  </div>
</header>

<main class="app">

  <!-- ========== REFERENCE MODE ========== -->
  <div class="mode-pane active" id="mode-reference">
    <div class="ref-pane">

      <div class="ref-header">
        <div>
          <div class="ref-eyebrow">Справочник для команды</div>
          <h1 class="ref-title">Стратегия роста <em>ДонПлафон</em></h1>
        </div>
        <div class="ref-stats">
          <div class="ref-stat-item">
            <div class="ref-stat-num">20М</div>
            <div class="ref-stat-label">Сейчас</div>
          </div>
          <div class="ref-stat-item">
            <div class="ref-stat-num ink-gold">40М</div>
            <div class="ref-stat-label">Цель</div>
          </div>
          <div class="ref-stat-item">
            <div class="ref-stat-num ink-amber">8 мес</div>
            <div class="ref-stat-label">Окно</div>
          </div>
        </div>
      </div>

      <nav class="tabs" id="refTabs"><!-- generated --></nav>

      <div id="refSections"><!-- generated --></div>
    </div>
  </div>

  <!-- ========== STRATEGY MODE ========== -->
  <div class="mode-pane" id="mode-strategy">
    <div class="strat-pane">
      <aside class="strat-nav" id="stratNav"></aside>
      <div class="strat-doc-wrap" id="stratDocs"></div>
    </div>
  </div>

  <!-- ========== ARCHIVE MODE ========== -->
  <div class="mode-pane" id="mode-archive">
    <div class="arch-pane">
      <aside class="arch-nav" id="archNav">
        <div class="arch-nav-header">
          <div class="arch-nav-title">Полный архив</div>
          <div class="arch-nav-meta">${totalFiles} файлов исследования</div>
        </div>
        <div class="arch-search"><input type="text" id="search" placeholder="Поиск по файлам..."></div>
        ${archiveSidebar}
      </aside>
      <div class="arch-doc-wrap">
        <div class="arch-empty" id="archEmpty">
          <div class="arch-empty-icon">⊹</div>
          <div>Выберите файл слева</div>
        </div>
        ${archiveDocsHtml}
      </div>
    </div>
  </div>

</main>

<!-- DRAWER for archive deep-dive -->
<div class="drawer-overlay" id="drawerOverlay"></div>
<aside class="drawer" id="drawer" aria-hidden="true">
  <div class="drawer-header">
    <div class="drawer-meta">
      <div class="drawer-breadcrumb" id="drawerBreadcrumb"></div>
      <div class="drawer-title" id="drawerTitle"></div>
    </div>
    <div class="drawer-actions">
      <button class="drawer-btn" id="drawerOpenFull">Открыть в архиве →</button>
      <button class="drawer-btn-icon" id="drawerClose" aria-label="Закрыть">✕</button>
    </div>
  </div>
  <div class="drawer-body">
    <div class="drawer-content" id="drawerContent"></div>
  </div>
</aside>

<button class="menu-toggle" id="menuToggle">☰</button>

<script>
${linkMapping}
</script>
<script>
${referenceContent}
</script>
<script>
${strategyContent}
</script>

<script>
  // ========== FILES INDEX (для source-tag deep links) ==========
  const FILES_INDEX = ${filesIndex};

  // ========== AUTO-LINK PATTERNS ==========
  // Сопоставление слов/фраз в тексте → target из LINK_TARGETS (link-mapping.js)
  // Порядок важен: более специфичные паттерны сначала
  const LINK_PATTERNS = [
    // Сегменты — основные
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])Premium-студи[яиюейяи]\\w*(?:\\s+полного\\s+цикла)?(?![а-яА-ЯёЁA-Za-z0-9])/g, t: 'seg_premium' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])студи[яюиейя]\\s+полного\\s+цикла(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'seg_premium' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])Premium-сегмент\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'seg_premium' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])дизайнер[а-я]?-блогер\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'seg_blogger' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])инфлюенсер\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'seg_blogger' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])Home\\s+Staging(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'seg_decorator' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])дизайнер[а-я]?-декоратор\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'seg_decorator' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])архитектор\\w*\\s+HoReCa(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'seg_horeca' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])HoReCa(?![а-яА-ЯёЁA-Za-z0-9])/g, t: 'seg_horeca' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])комплектатор[а-я]?-аутсорсер\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'seg_complektator' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])комплектатор[а-я]*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'seg_complektator' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])начинающ\\w+\\s+дизайнер\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'seg_student' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])региональн\\w+\\s+(?:партн[её]р\\w*|дизайнер\\w*)(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'seg_regional' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])частн\\w+\\s+(?:дизайнер\\w*-)?фрилансер\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'seg_freelancer' },

    // Смежные
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])потолочник[а-я]*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'adj_potolok' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])электрик[а-я]?-монтажник\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'adj_electric' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])ландшафтн\\w+\\s+архитектор\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'adj_landscape_arch' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])ландшафтн\\w+\\s+дизайнер\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'adj_landscape' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])мастер\\w?-универсал\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'adj_master' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])прораб\\w?\\s+коммерческ\\w+(?:\\s+объект\\w*)?(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'adj_prorab_comm' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])прораб\\w?\\s+жил\\w+(?:\\s+объект\\w*)?(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'adj_prorab_zhil' },

    // Конкуренты
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])VamSvet(?:\\.ru)?(?![а-яА-ЯёЁA-Za-z0-9])/g, t: 'comp_vamsvet' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])ВамСвет(?![а-яА-ЯёЁA-Za-z0-9])/g, t: 'comp_vamsvet' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])BasicDecor(?:\\.ru)?(?![а-яА-ЯёЁA-Za-z0-9])/g, t: 'comp_basicdecor' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])БэйсикДекор(?![а-яА-ЯёЁA-Za-z0-9])/g, t: 'comp_basicdecor' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])Lu\\.ru(?![а-яА-ЯёЁA-Za-z0-9])/g, t: 'comp_lu' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])Лю\\.ру(?![а-яА-ЯёЁA-Za-z0-9])/g, t: 'comp_lu' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])Centrsvet(?![а-яА-ЯёЁA-Za-z0-9])/g, t: 'comp_centrsvet' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])Центрсвет(?![а-яА-ЯёЁA-Za-z0-9])/g, t: 'comp_centrsvet' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])Donolux(?![а-яА-ЯёЁA-Za-z0-9])/g, t: 'comp_donolux' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])Донолюкс(?![а-яА-ЯёЁA-Za-z0-9])/g, t: 'comp_donolux' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])(?:Ozon|WB|Wildberries|Я\\.Маркет|Яндекс\\.Маркет)(?![а-яА-ЯёЁA-Za-z0-9])/g, t: 'comp_marketplaces' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])маркетплейс\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'comp_marketplaces' },

    // Каналы
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])(?:реактиваци[яю]\\s+)?спящ\\w+\\s+баз\\w+(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'ch_reactivation' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])реактиваци\\w+(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'ch_reactivation' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])реферальн\\w+\\s+сет\\w*\\s+L2(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'ch_l2_referral' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])реферальн\\w+\\s+систем\\w+(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'ch_l2_referral' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])L2\\s+(?:реферальн|программ|вознаграждени)\\w*/gi, t: 'ch_l2_referral' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])прям\\w+\\s+продаж\\w+(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'ch_direct_sales' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])(?:Skillbox|Contented|Details)(?![а-яА-ЯёЁA-Za-z0-9])/g, t: 'doc_incubator' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])школ\\w+(?:,\\s*(?:события|ивент\\w*|комьюнит\\w+))?(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'ch_schools' },

    // Продукт и документы
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])личн\\w+\\s+кабинет\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'doc_lk' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])MVP\\s+кабинет\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'doc_lk' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])лендинг\\w*\\s+с\\s+калькулятор\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'doc_landing_struct' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])лендинг\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'doc_landing_struct' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])светорасч[её]т\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'doc_lighting_calc' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])Dialux(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'doc_lighting_calc' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])геймификаци\\w+(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'doc_loyalty' },

    // Риски
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])недовери\\w+\\s+к\\s+выплат\\w+(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'risk_trust' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])налогов\\w+\\s+нагрузк\\w+(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'risk_tax' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])44-ФЗ(?![а-яА-ЯёЁA-Za-z0-9])/g, t: 'risk_horeca_44fz' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])smart\\s+home(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'risk_premium_smart' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])умн\\w+\\s+дом\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'risk_premium_smart' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])электрокарниз\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'doc_prd_mvp2' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])L2\\s+как\\s+трудов\\w+(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'risk_l2_reclass' },

    // Стратегия
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])(?:Голуб\\w+\\s+океан\\w*|Blue\\s+Ocean)(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'doc_blue_ocean' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])GTM(?![а-яА-ЯёЁA-Za-z0-9])/g, t: 'doc_gtm_launch' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])PRD(?![а-яА-ЯёЁA-Za-z0-9])/g, t: 'doc_prd' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])юнит-экономик\\w+(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'econ_benchmarks' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])5\\s*000\\s+партн[её]р\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'econ_5000_partners' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])сценари\\w+\\s+роста(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'econ_scenarios_40m' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])Action\\s+Plan(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'ch_action_plan' },
    { p: /(?<![а-яА-ЯёЁA-Za-z0-9])мгновенн\\w+\\s+выплат\\w*(?![а-яА-ЯёЁA-Za-z0-9])/gi, t: 'idea_instant_money' }
  ];

  // ========== AUTO-LINK ENGINE ==========
  // Tokenize HTML, обрабатываем только текст вне тегов <a>, <code>, <pre>
  const COMBINED_RE = (function() {
    return new RegExp(LINK_PATTERNS.map(p => '(' + p.p.source + ')').join('|'), 'gi');
  })();

  function autoLink(html) {
    if (!html) return html;
    // Reset lastIndex on global regex (otherwise stateful per-call bugs)
    COMBINED_RE.lastIndex = 0;

    const tokens = html.split(/(<[^>]+>)/);
    let depth = 0;

    return tokens.map(tok => {
      if (!tok) return tok;
      if (tok.startsWith('<')) {
        if (/^<a\\b/i.test(tok)) depth++;
        else if (/^<\\/a>/i.test(tok)) depth--;
        else if (/^<code\\b/i.test(tok) || /^<pre\\b/i.test(tok)) depth++;
        else if (/^<\\/code>|^<\\/pre>/i.test(tok)) depth--;
        return tok;
      }
      if (depth > 0) return tok;

      return tok.replace(COMBINED_RE, function() {
        const args = Array.prototype.slice.call(arguments);
        const match = args[0];
        // Find which group matched (groups 1..LINK_PATTERNS.length)
        for (let i = 0; i < LINK_PATTERNS.length; i++) {
          if (args[i + 1] !== undefined) {
            const target = LINK_PATTERNS[i].t;
            const meta = window.LINK_TARGETS[target];
            if (!meta) return match;
            return '<a class="ref-link" data-target="' + target + '" data-file="' + meta.file + '" title="' + meta.title.replace(/"/g, '&quot;') + '">' + match + '</a>';
          }
        }
        return match;
      });
    }).join('');
  }

  // ========== SOURCE-TAG → file lookup ==========
  function findFileByPathPrefix(prefix) {
    // Normalize: trim trailing slash
    const norm = prefix.replace(/\\/$/, '').replace(/^\\.\\/?/, '');
    const found = FILES_INDEX.find(f => f.path.startsWith(norm));
    return found ? found.id : null;
  }

  function getFilesInPath(prefix) {
    const norm = prefix.replace(/\\/$/, '');
    return FILES_INDEX.filter(f => f.path.startsWith(norm));
  }

  // ========== BUILD REFERENCE ==========
  const refTabs = document.getElementById('refTabs');
  const refSections = document.getElementById('refSections');

  REFERENCE.forEach((s, idx) => {
    const tab = document.createElement('button');
    tab.className = 'tab' + (idx === 0 ? ' active' : '') + (s.badge === 'blocker' ? ' has-badge' : '');
    tab.dataset.ref = s.id;
    tab.innerHTML = '<span class="num">' + s.num + '</span><span>' + s.title + '</span>';
    refTabs.appendChild(tab);

    const sec = document.createElement('section');
    sec.className = 'ref-section' + (idx === 0 ? ' active' : '');
    sec.id = 'ref-' + s.id;

    let blocksHtml = '';
    s.blocks.forEach(b => {
      blocksHtml += '<div class="card' + (b.full ? ' full' : '') + '">';
      blocksHtml += '<div class="card-label label-' + b.color + '">' + b.title + '</div>';
      blocksHtml += autoLink(b.content);
      blocksHtml += '</div>';
    });

    let sourcesHtml = '';
    if (s.sources && s.sources.length) {
      sourcesHtml = '<div class="sources"><div class="sources-label">Источники данных</div>';
      s.sources.forEach(src => sourcesHtml += '<a class="source-tag" data-source-path="' + src + '">' + src + '</a>');
      sourcesHtml += '</div>';
    }

    sec.innerHTML =
      '<div class="section-head">' +
        '<div class="section-num">Раздел ' + s.num + '</div>' +
        '<h2 class="section-title">' + s.fullTitle + '</h2>' +
        '<div class="section-goal">' + s.goal + '</div>' +
      '</div>' +
      '<div class="grid">' + blocksHtml + '</div>' +
      sourcesHtml;

    refSections.appendChild(sec);
  });

  document.querySelectorAll('.tab').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
      document.querySelectorAll('.ref-section').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      document.getElementById('ref-' + t.dataset.ref).classList.add('active');
      window.scrollTo({top: document.querySelector('.ref-header').offsetTop - 80, behavior: 'smooth'});
      if (history.replaceState) history.replaceState(null, '', '#reference/' + t.dataset.ref);
    });
  });

  // ========== BUILD STRATEGY ==========
  const stratNav = document.getElementById('stratNav');
  const stratDocs = document.getElementById('stratDocs');
  let curPart = '';

  STRATEGY.forEach((s, idx) => {
    if (s.part !== curPart) {
      curPart = s.part;
      const lbl = document.createElement('div');
      lbl.className = 'strat-nav-label';
      lbl.textContent = s.part;
      stratNav.appendChild(lbl);
    }
    const link = document.createElement('a');
    link.className = 'strat-nav-link' + (idx === 0 ? ' active' : '');
    link.href = '#strategy/' + s.id;
    link.dataset.strat = s.id;
    link.innerHTML = '<span class="strat-nav-num">' + (idx + 1).toString().padStart(2, '0') + '</span><span>' + s.title + '</span>';
    stratNav.appendChild(link);

    const doc = document.createElement('article');
    doc.className = 'strat-doc' + (idx === 0 ? ' active' : '');
    doc.id = 'strat-' + s.id;
    doc.innerHTML =
      '<div class="strat-meta">' + s.part + '</div>' +
      '<h1 class="strat-title">' + s.title + '</h1>' +
      (s.subtitle ? '<div class="strat-subtitle">' + s.subtitle + '</div>' : '') +
      '<div class="strat-body">' + autoLink(s.body) + '</div>';
    stratDocs.appendChild(doc);
  });

  document.querySelectorAll('.strat-nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.strat-nav-link').forEach(l => l.classList.remove('active'));
      document.querySelectorAll('.strat-doc').forEach(d => d.classList.remove('active'));
      link.classList.add('active');
      document.getElementById('strat-' + link.dataset.strat).classList.add('active');
      window.scrollTo({top: 0, behavior: 'smooth'});
      if (window.innerWidth < 840) document.getElementById('stratNav').classList.remove('open');
      if (history.replaceState) history.replaceState(null, '', '#strategy/' + link.dataset.strat);
    });
  });

  // ========== BUILD ARCHIVE ==========
  document.querySelectorAll('script[type="text/markdown"]').forEach(s => {
    const id = s.dataset.for;
    const target = document.querySelector('#' + id + ' [data-md]');
    if (target && window.marked) target.innerHTML = marked.parse(s.textContent);
  });

  const archEmpty = document.getElementById('archEmpty');
  function showArchive(id) {
    document.querySelectorAll('.archive-doc').forEach(d => d.classList.remove('active'));
    document.querySelectorAll('.file-link').forEach(l => l.classList.remove('active'));
    const doc = document.getElementById(id);
    const link = document.querySelector('.file-link[data-file="' + id + '"]');
    if (doc) { doc.classList.add('active'); archEmpty.style.display = 'none'; }
    if (link) link.classList.add('active');
    if (window.innerWidth < 840) document.getElementById('archNav').classList.remove('open');
    window.scrollTo({top: 0});
    if (history.replaceState) history.replaceState(null, '', '#archive/' + id);
  }

  document.querySelectorAll('.file-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      switchMode('archive');
      showArchive(link.dataset.file);
    });
  });

  document.querySelectorAll('.dir-name').forEach(d => {
    d.addEventListener('click', () => d.parentElement.classList.toggle('collapsed'));
  });

  // ========== MODE SWITCHER ==========
  const modeBtns = document.querySelectorAll('.mode-btn');
  const modePanes = { reference: document.getElementById('mode-reference'), strategy: document.getElementById('mode-strategy'), archive: document.getElementById('mode-archive') };

  function switchMode(mode) {
    modeBtns.forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
    Object.keys(modePanes).forEach(k => modePanes[k].classList.toggle('active', k === mode));
  }
  modeBtns.forEach(b => b.addEventListener('click', () => {
    switchMode(b.dataset.mode);
    if (history.replaceState) history.replaceState(null, '', '#' + b.dataset.mode);
  }));

  // ========== SEARCH ==========
  document.getElementById('search').addEventListener('input', e => {
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

  // ========== MOBILE MENU ==========
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('stratNav')?.classList.toggle('open');
    document.getElementById('archNav')?.classList.toggle('open');
  });

  // ========== DRAWER ==========
  const drawer = document.getElementById('drawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');
  const drawerOpenFull = document.getElementById('drawerOpenFull');
  const drawerBreadcrumb = document.getElementById('drawerBreadcrumb');
  const drawerTitle = document.getElementById('drawerTitle');
  const drawerContent = document.getElementById('drawerContent');
  let drawerCurrentFile = null;

  function openDrawer(fileId) {
    if (!fileId) return;
    const fileMeta = FILES_INDEX.find(f => f.id === fileId);
    if (!fileMeta) return;
    drawerCurrentFile = fileId;

    // Get rendered content from the archive doc
    const archiveDoc = document.getElementById(fileId);
    if (!archiveDoc) return;

    const body = archiveDoc.querySelector('[data-md]');
    drawerContent.innerHTML = body ? body.innerHTML : '';
    drawerBreadcrumb.textContent = fileMeta.path.replace(/\\/[^\\/]+$/, '');
    drawerTitle.textContent = fileMeta.name;

    drawer.classList.add('open');
    drawerOverlay.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    drawerContent.scrollTop = 0;
  }

  function openDrawerFolder(folderPath) {
    const files = getFilesInPath(folderPath);
    if (!files.length) return;

    // Open first file, but show list of all files at top
    const firstId = files[0].id;
    openDrawer(firstId);

    // Prepend folder file list
    const list = document.createElement('div');
    list.className = 'drawer-folder-list';
    list.innerHTML = '<div class="drawer-folder-label">Все файлы в ' + folderPath + ' (' + files.length + ')</div>' +
      files.map(f => '<a class="drawer-folder-link" data-file="' + f.id + '">' + f.name + '</a>').join('');
    drawerContent.insertBefore(list, drawerContent.firstChild);

    list.querySelectorAll('.drawer-folder-link').forEach(link => {
      link.addEventListener('click', () => openDrawer(link.dataset.file));
    });
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    drawerCurrentFile = null;
  }

  drawerClose.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);
  drawerOpenFull.addEventListener('click', () => {
    if (!drawerCurrentFile) return;
    closeDrawer();
    setTimeout(() => {
      switchMode('archive');
      showArchive(drawerCurrentFile);
    }, 300);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });

  // Click handlers for ref-links (delegated)
  document.addEventListener('click', e => {
    const refLink = e.target.closest('.ref-link');
    if (refLink) {
      e.preventDefault();
      const fileId = refLink.dataset.file;
      if (fileId) openDrawer(fileId);
      return;
    }
    const sourceTag = e.target.closest('.source-tag');
    if (sourceTag) {
      e.preventDefault();
      const sourcePath = sourceTag.dataset.sourcePath;
      if (sourcePath) {
        // Try as folder first, fallback to file
        const files = getFilesInPath(sourcePath);
        if (files.length > 1) openDrawerFolder(sourcePath);
        else if (files.length === 1) openDrawer(files[0].id);
      }
    }
  });

  // ========== HASH ROUTING ==========
  function handleHash() {
    const h = window.location.hash;
    if (h.startsWith('#archive/')) {
      switchMode('archive');
      const id = h.slice(9);
      if (document.getElementById(id)) showArchive(id);
    } else if (h.startsWith('#archive')) switchMode('archive');
    else if (h.startsWith('#strategy/')) {
      switchMode('strategy');
      const link = document.querySelector('.strat-nav-link[data-strat="' + h.slice(10) + '"]');
      if (link) link.click();
    } else if (h.startsWith('#strategy')) switchMode('strategy');
    else if (h.startsWith('#reference/')) {
      switchMode('reference');
      const tab = document.querySelector('.tab[data-ref="' + h.slice(11) + '"]');
      if (tab) tab.click();
    } else if (h.startsWith('#reference')) switchMode('reference');
  }
  handleHash();
  window.addEventListener('hashchange', handleHash);
</script>

</body>
</html>
`;

fs.writeFileSync(OUT, html);
console.log(`✓ Built ${OUT}`);
console.log(`  Reference sections: ${(referenceContent.match(/^\s*id:\s*'/gm) || []).length}`);
console.log(`  Strategy sections: ${(strategyContent.match(/^\s*id:\s*'/gm) || []).length}`);
console.log(`  Archive files: ${totalFiles}`);
console.log(`  Size: ${(fs.statSync(OUT).size / 1024).toFixed(1)} KB`);
