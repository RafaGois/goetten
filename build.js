#!/usr/bin/env node
// Monta as páginas do site a partir de partials/ + pages/*.html.
// Sem dependências: `node build.js`. A Vercel roda isto no deploy
// (ver vercel.json). Formato esperado de um arquivo em pages/: um
// comentário de front matter no topo (chave: valor, uma por linha,
// sempre com "out:" apontando o arquivo a gerar), seguido do HTML
// completo da página com os marcadores <!-- include:head/sprite/
// navbar/footer --> nos lugares onde o conteúdo repetido entra.
// Ver pages/home.html como exemplo.
//
// O HTML gerado (index.html, projeto-social.html, ...) fica
// versionado junto do repositório — quem editar algo em partials/
// ou pages/ precisa rodar `node build.js` de novo antes de commitar.
// Editar os arquivos gerados direto é o erro que este esquema existe
// para evitar: a próxima pessoa que rodar o build apaga a edição.

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PARTIALS_DIR = path.join(ROOT, 'partials');
const PAGES_DIR = path.join(ROOT, 'pages');

function readPartial(name) {
  // Sem a newline final: cada partial entra encaixado entre marcadores
  // que já têm sua própria quebra de linha ao redor, no arquivo de página.
  return fs.readFileSync(path.join(PARTIALS_DIR, `${name}.html`), 'utf8').replace(/\n+$/, '');
}

// O topo de cada página em pages/ é um comentário HTML com
// "chave: valor" por linha (título, descrição, para onde gerar etc.).
// Não é YAML de verdade — é só o suficiente para não repetir o <head>
// e a navbar em nove arquivos.
function parseFrontMatter(raw, file) {
  const match = raw.match(/^<!--\s*\n([\s\S]*?)\n-->\s*\n([\s\S]*)$/);
  if (!match) {
    throw new Error(`${file}: falta o bloco de front matter no topo do arquivo.`);
  }
  const [, block, body] = match;
  const data = {};
  for (const rawLine of block.split('\n')) {
    const line = rawLine.trim();
    if (!line) continue;
    const i = line.indexOf(':');
    if (i === -1) {
      throw new Error(`${file}: linha de front matter sem "chave:" — "${line}"`);
    }
    data[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { data, body };
}

function fillTokens(template, data, file) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const field = key.toLowerCase();
    if (!(field in data)) {
      throw new Error(`${file}: falta o campo "${field}" no front matter (usado em partials/head.html).`);
    }
    return data[field];
  });
}

// Marca com aria-current="page" o link cujo data-nav bate com a página
// atual, e tira o atributo data-nav de todos os outros (ele só existe
// para o build encontrar o link certo — não deveria sobrar no HTML final).
function markActiveNav(navbarHtml, activeSlug) {
  const withCurrent = activeSlug
    ? navbarHtml.replace(
        new RegExp(`(<a[^>]*?)\\sdata-nav="${activeSlug}"([^>]*>)`, 'g'),
        '$1 data-nav="' + activeSlug + '" aria-current="page"$2'
      )
    : navbarHtml;
  return withCurrent.replace(/\sdata-nav="[^"]*"/g, '');
}

function build() {
  const headTpl = readPartial('head');
  const spriteHtml = readPartial('sprite');
  const navbarTpl = readPartial('navbar');
  const footerHtml = readPartial('footer');

  if (!fs.existsSync(PAGES_DIR)) {
    throw new Error(`Diretório não encontrado: ${PAGES_DIR}`);
  }

  const files = fs.readdirSync(PAGES_DIR).filter((f) => f.endsWith('.html'));
  if (files.length === 0) {
    throw new Error(`Nenhuma página em ${PAGES_DIR}`);
  }

  const seenOut = new Map();

  for (const file of files) {
    const fullPath = path.join(PAGES_DIR, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, body } = parseFrontMatter(raw, file);

    if (!data.out) {
      throw new Error(`${file}: front matter sem "out:" (nome do arquivo gerado).`);
    }
    if (seenOut.has(data.out)) {
      throw new Error(`${file} e ${seenOut.get(data.out)} apontam para o mesmo "out: ${data.out}".`);
    }
    seenOut.set(data.out, file);

    const head = fillTokens(headTpl, data, file);
    const navbar = markActiveNav(navbarTpl, data.nav_active);

    let html = body
      .replace('<!-- include:head -->', head)
      .replace('<!-- include:sprite -->', spriteHtml)
      .replace('<!-- include:navbar -->', navbar)
      .replace('<!-- include:footer -->', footerHtml);

    const leftover = html.match(/<!--\s*include:\S+\s*-->/);
    if (leftover) {
      throw new Error(`${file}: sobrou "${leftover[0]}" sem resolver — nome de include errado?`);
    }

    fs.writeFileSync(path.join(ROOT, data.out), html);
    console.log(`build: pages/${file} -> ${data.out}`);
  }

  console.log(`build: ${files.length} página(s) geradas.`);
}

try {
  build();
} catch (err) {
  console.error(`build.js: ${err.message}`);
  process.exit(1);
}
