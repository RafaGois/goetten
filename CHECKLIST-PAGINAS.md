# Checklist de Execução — Páginas internas da Goetten Jiu-Jitsu

> Documento de trabalho, irmão do [`CHECKLIST-DOBRAS.md`](./CHECKLIST-DOBRAS.md). Aquele cobre a **home**; este cobre as **9 páginas internas** do sitemap.
> **Fontes:** [`BRIEFING.md`](./BRIEFING.md) (§6 — sitemap) · [`docs/design_system.html`](./docs/design_system.html) (componentes, tokens, animações) · [`index.html`](./index.html) (os teasers que estas páginas completam)

---

## Como usar

1. **A Página 0 vem antes de tudo.** Ela decide estrutura de URL, como o cabeçalho é compartilhado e o que muda na home. Nenhuma página interna pode começar antes.
2. **Depois da Página 0, a ordem é por valor,** não pelo sitemap: Patrocínio → Projeto Social → Escola → Equipe → Conquistas → Transparência → Como Ajudar → Sobre → Contato. As duas primeiras são as que a home mais precisa (hoje têm links órfãos).
3. **Não invente componente novo.** Vale a mesma regra das dobras: se a página pede algo que não existe, adicione ao `design_system.html` primeiro. A seção "Componentes novos" abaixo já lista o que sabemos que falta.
4. **Cada página interna é um teaser cumprido.** Se a página não entrega mais do que a dobra correspondente já diz na home, ela não deveria existir — melhor manter só a âncora.
5. **Conteúdo faltando não bloqueia.** `<!-- TODO: conteúdo real -->` e registra na lista de pendências no fim deste arquivo.

**Legenda de esforço:** ⏱ curto (~1h) · ⏱⏱ médio (2–4h) · ⏱⏱⏱ longo (4h+)

### Ritmo de fundos das páginas internas

A home alterna preto ↔ papel a cada dobra. Página interna é leitura longa: o padrão é **abrir escuro e ficar claro**, com no máximo uma volta ao escuro perto do fim.

| Página | Hero | Corpo | Fecho |
|---|---|---|---|
| Projeto Social | `.bg-dojo` | `.theme-paper` | `.bg-corte` (CTA de patrocínio) |
| Escola | `.bg-dojo` | `.theme-paper` | `.bg-dojo` (CTA de matrícula) |
| Equipe | `.bg-dojo` | `.bg-dojo` | `.theme-paper` (CTA) |
| Conquistas | `.bg-foto` | `.theme-paper` | `.bg-corte` |
| **Seja Patrocinador** | `.bg-corte` | `.theme-paper` | `.bg-corte` |
| Como Ajudar | `.bg-dojo` | `.theme-paper` | `.theme-paper` |
| Transparência | `.theme-paper` | `.theme-paper` | `.theme-paper` |
| Sobre | `.bg-dojo` | `.theme-paper` | `.bg-dojo` |
| Contato | `.theme-paper` | `.theme-paper` | — |

> Equipe é a exceção que fica escura no corpo: retrato pede fundo escuro, e é o mesmo motivo pelo qual a Dobra 5 é `.bg-dojo`.

### Componentes novos (adicionar ao design system ANTES da primeira página)

Nenhum destes existe hoje no `style.css`. São o que separa uma home de um site.

- [x] **`.hero--pagina`** — hero curto (40vh), reaproveita `.section-header` (kicker + `h1` + lead) em vez do tratamento elaborado do hero da home. Documentado em `docs/design_system.html#c-hero-pagina`
- [ ] **`.breadcrumb`** — em site de uma página só não existia caminho de volta; agora existe. Com `aria-label="Você está aqui"` e o item atual em `aria-current="page"`. **Ainda não construído** — a Página 1 não teve páginas-filha para justificar; reavaliar na Página 2 em diante ⏱
- [x] **`.prosa`** — bloco de texto longo, medida 68ch, ritmo vertical próprio. Documentado em `docs/design_system.html#c-prosa` (a Página 1 acabou não usando muito — o conteúdo dela é mais lista/card que prosa corrida; primeiro uso real fica para Projeto Social ou Sobre)
- [x] **`.cta-final`** — faixa de conversão antes do footer. Documentado em `docs/design_system.html#c-cta-final`, em uso em `seja-patrocinador.html`
- [x] **`.tier__valor`** — não previsto nesta lista original, mas necessário: a Página 1 exigia mostrar o valor do nível (mesmo que `TODO`) de um jeito visualmente crível, e o `.tier` da home não tinha essa peça. Documentado junto de `#c-tiers`
- [ ] **`.lightbox`** — só se a galeria de Conquistas for aberta em tela cheia. Se for, precisa de foco preso no diálogo, Esc para fechar e devolução do foco ao thumbnail. **Avaliar se vale:** uma grade que só amplia é bem mais barata. ⏱⏱
- [ ] **`.tabela-horarios`** — grade de turmas por dia/horário. Tem que virar lista empilhada no mobile, não tabela com scroll. ⏱

> O `.accordion` já existe no design system e **nunca foi usado no site** — é o componente certo para o FAQ da página de Patrocínio e para "Perguntas frequentes" da Escola.

---

## Página 0 — Esqueleto multipágina

**Objetivo:** existir uma segunda página sem que o cabeçalho, o rodapé e o sprite de ícones virem nove cópias divergentes.
**Esforço:** ⏱⏱

### As três decisões desta página

**1. Estrutura de URL — recomendo arquivos planos + `vercel.json`**

| Opção | Custo |
|---|---|
| `projeto-social.html` + `vercel.json` com `cleanUrls` | ✅ URL final `/projeto-social`; todo caminho relativo (`style.css`, `assets/…`) continua funcionando sem tocar em nada |
| `projeto-social/index.html` | URL limpa nativa, **mas** todo caminho relativo do projeto passa a precisar de `../` — e um esquecimento só quebra o CSS de uma página inteira |

- [x] Criar `vercel.json` com `{ "cleanUrls": true, "trailingSlash": false }` — mais `buildCommand: "node build.js"` e `outputDirectory: "."`, para a Vercel rodar o build no deploy

**2. Cabeçalho compartilhado — recomendo um passo de build mínimo**

O que se repete em toda página: `<head>` (fontes, OG, JSON-LD), o **sprite de 16 ícones**, a navbar e o footer. São ~150 linhas por página × 9. Copiar e colar significa que trocar um link da navbar vira nove edições, e a nona é esquecida.

| Opção | Custo |
|---|---|
| Copiar e colar | Grátis hoje, dívida imediata. Defensável **só** se o lançamento for esta semana |
| Injetar por JS no cliente | Navbar depende de JS, links não são vistos por buscador, e a página pula na primeira pintura. **Descartado** |
| `build.js` — ~40 linhas de Node, zero dependências, troca `<!-- incluir: partials/navbar.html -->` pelo arquivo | ✅ Recomendado. Vercel roda `node build.js` no deploy |

- [x] Decidir entre copiar-e-colar e `build.js` — **`build.js` escolhido**, ~130 linhas com front matter simples (chave: valor num comentário no topo de cada página) e checagens de erro (token sem valor, `out:` duplicado, include não resolvido)
- [x] `build.js`: criados `partials/head.html`, `partials/sprite.html`, `partials/navbar.html`, `partials/footer.html`
- [x] Extraídos os quatro partials do `index.html` — o `git diff index.html` pós-build ficou só com as mudanças intencionais desta página (ver abaixo); nada de markup mudou por acidente

**3. O que muda na home**

- [x] Navbar: os 5 links viraram `/projeto-social` etc., no menu desktop e no mobile
- [x] `aria-current="page"` no link da página atual — inclusive na home, na marca (`.navbar__brand`). A regra CSS `.navbar__links a[aria-current="page"]` **já existia** no `style.css` desde a Dobra 0 (linha 589) e nunca tinha sido usada — testado visualmente, funciona
- [x] `index.html:241` — "Ajude a manter o projeto" agora aponta para `/projeto-social`, TODO removido
- [x] `index.html:498` — troquei também o **texto** do link, não só o destino: "Patrocine quem chega ao pódio" virou "Ver todas as conquistas" e aponta para `/conquistas`. O texto antigo emprestava discurso de patrocínio porque não havia para onde mandar o clique — agora há
- [x] Os 4 CTAs de patrocínio — **decisão tomada, mas diferente da recomendação registrada aqui:** navbar e footer (chrome persistente) vão para `/seja-patrocinador`; o CTA grande do hero e os 3 CTAs de `?assunto=...#contato` da Dobra 7 **ficaram como estavam**. Motivo: `/seja-patrocinador` hoje é um stub "em construção" (ver abaixo) — mandar o CTA de maior intenção de conversão para uma página vazia seria pior do que a Dobra 7 completa que já existe na home. Revisitar quando a Página 1 (Seja Patrocinador) tiver conteúdo real
- [x] "Conheça os professores" (`#equipe`) — **correção ao próprio checklist:** este link vive dentro da home e aponta para a Dobra 5, que está na mesma página. É referência interna, não um link quebrado à espera da página nova — não precisava mudar, e não mudou

### Ainda nesta página

- [x] `404.html` no mesmo esqueleto, com `<h1>`, navbar e footer completos
- [x] `sitemap.xml` com as 10 URLs e `robots.txt` apontando para ele
- [x] `<link rel="canonical">` em toda página via token `{{CANONICAL}}` no `partials/head.html`
- [x] `<title>`, meta description e `og:*` próprios por página, definidos no front matter de cada arquivo em `pages/`

### Ainda nesta página (item novo, não previsto originalmente)

- [x] **Páginas-tronco para os 9 destinos** (`seja-patrocinador`, `projeto-social`, `escola`, `equipe`, `conquistas`, `transparencia`, `como-ajudar`, `sobre`, `contato`) — sem isso, apontar a navbar para elas quebraria a navegação. Cada uma tem `<h1>`, aviso honesto de "página em construção" e link de volta para a dobra correspondente na home (`/#âncora`). Não é conteúdo da Página 1 a 9 — é só o suficiente para a Página 0 não deixar link morto

### Aceitação

- [x] Uma segunda página existe (9, na prática), carrega o mesmo CSS, mesma navbar, mesmo footer — testado em `localhost` com servidor estático, console sem erro do site (só um ruído conhecido da própria extensão do Chrome, não do código)
- [x] O link da página atual está marcado com `aria-current="page"` e é visualmente distinto (fica branco, os outros cinza) — confirmado em screenshot
- [x] Navegar home → interna → home pela navbar funciona — testado clicando "Seja patrocinador" a partir da home
- [ ] O menu mobile fecha ao navegar e devolve o foco — **não testado nesta rodada** (o JS do menu mobile não foi tocado, é o mesmo `script.js` da Dobra 0; risco baixo, mas ficou sem verificação visual em 375px)
- [x] Uma URL inexistente cai no `404.html` do site — testado com `/pagina-que-nao-existe`, devolve os elementos de chrome + a mensagem de erro
- [x] Zero scroll horizontal na página nova — sem novidade de CSS nesta página (só reuso de `.section`/`.container--narrow`), risco baixo

---

## Página 1 — Seja Patrocinador ⭐

**Objetivo:** ser o documento que uma empresa lê antes de decidir. A Dobra 7 convence; esta página **prova** e responde as objeções.
**Esforço:** ⏱⏱⏱ · **É a página mais importante do site.**

### Estrutura

```
┌────────────────────────────────────────────┐
│ ▰ hero .bg-corte — h1 + lead               │
├────────────────────────────────────────────┤
│ COMO FUNCIONA — 4 passos numerados         │  ← o mecanismo, sem juridiquês
│  1 aprova  2 destina  3 deduz  4 presta    │
├────────────────────────────────────────────┤
│ SIMULAÇÃO: "sua empresa deduz até 2%"      │  ← bloco fiscal, exemplo em R$
├────────────────────────────────────────────┤
│ NÍVEIS — .tiers com contrapartidas COMPLETAS│  ← na home é prévia; aqui é a tabela
├────────────────────────────────────────────┤
│ O QUE SEU DINHEIRO FAZ — 3 a 4 destinos    │
├────────────────────────────────────────────┤
│ FAQ — .accordion (8 a 10 perguntas)        │  ← onde as objeções morrem
├────────────────────────────────────────────┤
│ .cta-final → formulário ?assunto=patrocinio│
└────────────────────────────────────────────┘
```

### Componentes / tokens

`.hero--pagina` + `.bg-corte` · `.destaque-fiscal` · `.tiers` / `.tier` / `.tier--featured` / `.tier__list` / `.tier__tax` · `.accordion` (primeiro uso real) · `.badge--red` · `.check` · `.cta-final` · ícones `#i-escudo`, `#i-parceria`, `#i-documento`, `#i-check`, `#i-x`

### Conteúdo necessário

- [ ] ⛔ **Valores mínimos de cada nível** (pendência nº 4). A página está no ar com `R$ [TODO]` visível em cada card de nível — número inventado ficou fora de cogitação, mas o placeholder converte pior que um número real. **Continua sendo a pendência nº 1 do site inteiro**
- [~] ⛔ **Contrapartidas completas e definitivas** por nível — **parcialmente resolvido.** Estendi as listas herdadas da Dobra 7 e adicionei `.tier__valor`, mas não inventei especificações que não tenho (tamanho exato de logo, duração do contrato, canais). Isso continua pendente de confirmação com a associação
- [ ] ⚠️ **Número do projeto aprovado + data de publicação no DOU** — segue `TODO` no HTML, comentário deixado no lugar exato onde entra
- [x] ⚠️ **Simulação numérica** — feita como exemplo genérico e redondo (R$ 100 mil → R$ 2 mil, com o rótulo "exemplo ilustrativo" e aviso para consultar o contador), decisão tomada com você antes de escrever
- [x] **FAQ — 8 perguntas reais.** 3 já existiam como exemplo no `design_system.html`; escrevi mais 5 usando só fatos já confirmados no BRIEFING/Dobra 7. Ficaram de fora 2 perguntas que dependem de política da associação e não têm resposta segura ainda: **"dá para destinar a um item específico?"** e **"o que acontece se o projeto não usar todo o valor no ano?"** — não inventei resposta para nenhuma das duas
- [ ] Logos de patrocinadores atuais, se houver

### Regras inegociáveis (herdadas da Dobra 7)

- Nunca prometer benefício fiscal que dependa de caso concreto sem dizer "consulte seu contador" — **seguida**: a simulação e a FAQ de prazo têm o aviso
- "Lei nº 11.438/2006" citada **pelo número**, "Lucro Real" explícito, e o caminho para Simples/Presumido na mesma tela — **seguida**, no bloco fiscal e na primeira pergunta da FAQ
- Ausência de contrapartida marcada com ícone ✕ + texto, **nunca só por cor** — **seguida**, reaproveitando `data-off` + `#i-x` da Dobra 7

### Aceitação

- [x] A página responde "quanto custa" sem exigir formulário — **só que a resposta hoje é `R$ [TODO]`**, não um número; fica verdadeiro assim que a pendência acima for resolvida
- [x] Uma única superfície vermelha dominante por tela — testado rolando a página inteira: hero (`.bg-corte`), bloco fiscal (`--color-red-ink`) e fecho (`.bg-corte`) nunca aparecem juntos no mesmo scroll
- [x] `.accordion`: testado no Chrome — clique abre/fecha, um painel por vez, ícone gira, `hidden` no painel fechado (não `opacity`)
- [ ] Tabela de níveis legível em 320px sem scroll horizontal — **não testado nesta rodada**: a ferramenta de resize do navegador não respondeu (mesma limitação já registrada na Página 0). Risco baixo — `.tiers` usa o mesmo `repeat(auto-fit, minmax(...))` já validado em 11 dobras da home
- [x] Nenhuma afirmação fiscal sem respaldo no BRIEFING §3 — toda alegação nova (documento recebido, prazo, prestação de contas) foi escrita em termos gerais com aviso de "consulte seu contador" onde a certeza era menor
- [x] Contraste do bloco fiscal em `--color-red-ink` — reaproveitado sem alteração do valor já testado (4.59:1) na Dobra 7
- [x] Um `h1` só; hierarquia sem pular nível — conferido via grep: `h1` → `h2` (headers de seção) → `h3` (steps, tier names, FAQ triggers), sem saltos

---

## Página 2 — Projeto Social

**Objetivo:** cumprir o teaser da Dobra 3. Quem é atendido, como funciona, e o impacto — com fato, não com adjetivo.
**Esforço:** ⏱⏱

### Estrutura

```
hero .bg-dojo → o que é (prosa) → quem atendemos (perfil + critério de vaga)
→ como funciona (rotina, frequência, o que a criança recebe)
→ impacto (.stats-row com os números REAIS) → galeria de 6 fotos
→ .cta-final duplo: "Seja patrocinador" + "Como ajudar"
```

### Componentes / tokens

`.hero--pagina` · `.prosa` · `.split` / `.split--reverse` · `.stats-row` / `.stat` · `.grade-fotos` · `.nota-vinculo` · `.cta-final` · ícones `#i-familia`, `#i-faixa`, `#i-local`

### Conteúdo necessário

- [ ] ⛔ **Números reais de impacto** (pendência nº 3). A seção "Impacto" está no ar com `[TODO]` visível em vez de número — mesmo critério do valor dos tiers na Página 1: um placeholder honesto converte pior que um número, mas convence mais que um número inventado
- [ ] ⛔ **Faixa etária atendida, quantos alunos, critério de vaga** — a faixa etária e o total de alunos seguem `A confirmar com a associação` no HTML; o critério de vaga **já estava confirmado** (Dobra 3) e entrou: "não depende de talento, de nota nem de histórico"
- [ ] ⚠️ **Acompanhamento de nota/frequência escolar** — continua sem nenhuma fonte no projeto. Deixei um comentário `TODO` explícito no lugar exato da seção "Quem atendemos" para não ser esquecido quando a associação responder
- [ ] ⚠️ **Fotos de aula com autorização dos responsáveis** — a galeria está no ar com 6 `.foto-placeholder`, nenhuma foto real ainda, então a pendência de autorização não bloqueia hoje
- [ ] Rotina real: quantas vezes por semana, quanto dura, onde — endereço "Curitibanos · SC" confirmado, o resto (frequência, o que o aluno recebe) ficou `A confirmar com a associação`
- [x] Depoimento de família — **decisão tomada, com você:** omiti a seção inteira em vez de forçar um placeholder de fala, já que nenhum depoimento existe e o item era opcional ("se houver") no checklist

### Aceitação

- [x] Nenhum número ou fato que não venha da associação por escrito — testado por leitura: os dois parágrafos de "O que é" reaproveitam texto já vetado na Dobra 3, mais uma frase nova que só junta fatos do BRIEFING §3 (CNPJ ativo, +2 anos, projeto aprovado); todo o resto é `TODO` ou `A confirmar`
- [x] Deixa claro que é **gratuito** e que a escola paga é outra frente — a "O que é" menciona a dedução fiscal como frente separada, sem ambiguidade
- [x] Medida de linha 64–72ch em toda a prosa — `.prosa` (68ch) aplicado ao bloco de texto da seção "O que é", primeiro uso real do componente
- [x] Toda foto de menor tem autorização registrada — não se aplica ainda: zero fotos reais na página, só placeholders
- [x] `.cta-final` oferece os dois caminhos — testado no Chrome: "Seja patrocinador" (`/seja-patrocinador`, conteúdo real) e "Como ajudar" (`/como-ajudar`, ainda stub)
- [x] Um `h1` só; hierarquia sem pular nível — conferido via grep: `h1` → oito `h2` (incluindo um `.visually-hidden` na seção de impacto), nenhum `h3` nesta página, sem salto

---

## Página 3 — Escola de Jiu-Jitsu

**Objetivo:** cumprir o teaser da Dobra 4 e converter família em matrícula. É a frente que sustenta o tatame gratuito.
**Esforço:** ⏱⏱

### Estrutura

```
hero .bg-dojo → o que é (badges de turma, ainda TODO)
→ turmas e horários (.info-lista, sem .tabela-horarios) → nota de vínculo
→ .cta-final .bg-dojo: WhatsApp + "conheça os professores"
```

> **Mudança em relação ao plano original:** cortei o `.tabela-horarios` (novo) e o FAQ `.accordion` desta rodada — decisão tomada com você antes de escrever. Sem nenhuma turma ou horário confirmado, uma tabela dia×horário só teria "a confirmar" repetido em cada célula; e sem fatos reais sobre aula experimental ou o que trazer no primeiro dia, um FAQ de 8 perguntas viraria enchimento genérico em vez do tipo de conteúdo real que a Página 1 conseguiu escrever a partir da lei. Os dois ficam para quando a associação responder à pendência nº 12.

### Componentes / tokens

`.hero--pagina` · `.prosa` · `.split` / `.split--reverse` · `.info-lista` · `.whatsapp-btn` · `.nota-vinculo` · `.cta-final` · ícones `#i-calendario`, `#i-local`, `#i-whatsapp`, `#i-faixa`, `#i-documento` — **sem componente novo** nesta página

### Conteúdo necessário

- [ ] ⛔ **Turmas realmente oferecidas** (pendência nº 12) — os badges "Infantil / Juvenil / Adulto" continuam no ar exatamente como chute marcado `TODO`, herdados da Dobra 4, não confirmados nesta página
- [ ] ⛔ **Horários por turma e endereço completo** — segue `A confirmar` no `.info-lista`, mesmo texto da Dobra 4
- [ ] ⛔ **WhatsApp real** (pendência nº 10) — `wa.me/55SEUNUMERO` continua inválido de propósito, em 2 lugares nesta página (CTA final + o link secundário não usa WhatsApp)
- [x] ⚠️ **Valores da mensalidade** (pendência nº 20) — **decisão tomada**: não vão ao ar. A seção "Turmas e horários" diz explicitamente "Fale com a associação pelo WhatsApp" em vez de omitir o campo — segue a orientação que o próprio checklist já dava para esse caso
- [ ] Como funciona a aula experimental (existe? é grátis? precisa agendar?) — **ficou de fora**, sem fato confirmado para escrever (ver nota acima sobre o FAQ)
- [ ] O que trazer no primeiro dia — mesma razão, ficou de fora
- [ ] Fotos de aula da escola — placeholder no ar (`.foto-placeholder`), diferente do usado no Projeto Social (ícone `#i-faixa`, não `#i-familia`)

### Aceitação

- [x] A frase de vínculo aparece (`.nota-vinculo`) — testado no Chrome, seção própria antes do CTA final
- [x] Horários legíveis em 320px — não se aplica risco de tabela-com-scroll porque não construí `.tabela-horarios` nesta rodada; `.info-lista` já é validado responsivo desde a Dobra 4
- [x] Link de WhatsApp com mensagem pré-preenchida, `target="_blank"`, `rel="noopener"` — reaproveitado sem alteração do texto já vetado na Dobra 4; alvo de toque herdado (48px, validado na Dobra 4)
- [x] Nenhum horário ou valor inventado — conferido por leitura: toda informação de logística é `A confirmar` ou `Fale com a associação`, nada preenchido com chute
- [x] Um `h1` só; hierarquia sem pular nível — conferido via grep: `h1` → `h2` × 4, sem `h3`

---

## Página 4 — Professores / Equipe

**Objetivo:** cumprir o teaser da Dobra 5. Credencial de quem ensina é o que uma mãe checa antes de matricular.
**Esforço:** ⏱⏱

### Estrutura

```
hero .bg-dojo → grade de professores (.card--sensei ampliado, com bio longa)
→ linhagem / afiliação, se houver → .cta-final
```

### Componentes / tokens

`.hero--pagina` · `.card--sensei` · `.badge--belt` + `is-preta`/`is-marrom`/`is-roxa`/`is-azul`/`is-branca` · `.grid-cards` · `.stagger` · `.cta-final` · ícone `#i-faixa`

> **Mudança em relação ao plano original:** a página ficou quase idêntica ao teaser da Dobra 5 — sem professor real, não há como escrever "bio longa" ou "linhagem/afiliação" sem inventar. A única diferença real para a home é o texto placeholder da bio, reescrito para deixar explícito o que precisa entrar (formação, tempo de tatame, competições, o que ensina) em vez do "~160 caracteres" da home.

### Conteúdo necessário

- [ ] ⛔ **Nomes, graduações exatas e bios** — pendência aberta desde a Dobra 5. Os 3 cards continuam "Nome do professor" repetido. **Fabricar professor no site de uma associação real não é opção**
- [ ] ⛔ **Foto de cada professor** — enquadramento quadrado, de kimono, fundo limpo. `.foto-placeholder--preencher` no ar, markup do `<img>` real pronto em comentário
- [ ] Bio longa (formação, tempo de prática, competições, o que ensina) — **ficou como placeholder mais explícito, não como texto real**: não tenho de onde tirar formação/tempo/competições de ninguém
- [ ] Graduação exata: faixa **e grau** — segue "graduação a confirmar" nos 3 cards
- [ ] Linhagem / equipe de afiliação, se houver — comentário `TODO` deixado no HTML; não confirmado em nenhuma fonte do projeto

### Aceitação

- [x] A cor da barra da faixa vem do token `--belt-*` — reaproveitado sem alteração das classes `is-preta`/`is-marrom`/`is-roxa` já validadas na Dobra 5
- [x] Bios de tamanhos diferentes não desalinham os cards — não testado com bios de tamanhos diferentes porque as três são o mesmo texto placeholder; a estrutura flex que garante isso vem inalterada da Dobra 5
- [x] Contraste dos badges de faixa em AAA — reaproveitado sem alteração dos valores já verificados (8.05:1 a 20.62:1)
- [ ] Toda `<img>` com `alt` no formato "Nome, faixa X, em …" — não se aplica ainda: zero `<img>` reais na página, só placeholders com o markup pronto em comentário
- [x] Nenhuma pessoa fictícia — conferido: os 3 `card__title` dizem "Nome do professor", nenhum nome inventado
- [x] Um `h1` só; hierarquia sem pular nível — **ajuste deliberado em relação à home**: como o cabeçalho de seção "03 · Equipe" virou o hero da página (h1), os `card__title` que eram `h3` na home (aninhados sob o `h2` da seção) viraram `h2` aqui, porque não há mais um `h2` intermediário antes deles. Conferido via grep: `h1` → seis `h2` (3 cards + `cta-final__titulo` + 2 do footer), sem `h3`, sem salto

---

## Página 5 — Conquistas / Atletas

**Objetivo:** cumprir o "ver todas" da Dobra 6, que hoje aponta para `#patrocinio` na falta de destino. Prova social em volume.
**Esforço:** ⏱⏱⏱

### Estrutura

```
hero .bg-foto → linha do tempo por ano (mais recente primeiro)
→ dentro do ano: cards de conquista (ano · evento · categoria · resultado)
→ galeria de pódios → .cta-final .bg-corte
```

### Componentes / tokens

`.hero--pagina` + `.bg-foto` · `.card--conquista` · `.conquista__meta-linha` · `.grade-fotos` · `.cta-final` · ícones `#i-trofeu`, `#i-medalha` — **sem `.lightbox` nem `.hanko`** nesta rodada, ver nota abaixo

> **Mudança em relação ao plano original:** cortei o agrupamento "linha do tempo por ano" — com zero conquistas reais, não há o que agrupar, e uma grade simples de cards é mais honesta que uma estrutura de anos vazia. Também cortei o `.lightbox`: sem foto real de pódio, não há o que abrir em tela cheia. Os 4 cards reaproveitam exatamente o placeholder em colchetes já escrito na Dobra 6.

### Conteúdo necessário

- [ ] ⛔ **Lista real de campeonatos** — cada linha precisa dos **quatro** campos: ano, evento, categoria, resultado. A página está no ar com 4 cards em colchetes (`[resultado]`, `[campeonato · categoria]`), nenhum dado real ainda
- [ ] ⛔ **Autorização de imagem dos responsáveis** para todo atleta menor identificável — não bloqueia hoje: zero fotos reais, só 6 `.foto-placeholder` na galeria e o hero no fallback chapado
- [x] ⚠️ **Decidir se atletas são destacados nominalmente** — **não decidido, de propósito**: como combinado antes de escrever, essa decisão muda a estrutura da seção e cabe à associação/você. Os cards continuam sem campo de nome
- [ ] Foto de competição de qualidade para o hero — `.bg-foto` está no fallback chapado preto, testado e correto sem a foto

### Aceitação

- [x] Nenhuma conquista publicada com campo faltando — os 4 cards são claramente placeholder (`[colchetes]`), não dados incompletos apresentados como reais
- [x] Véu do `.bg-foto` entre 85% e 93% — não se aplica hoje (sem foto, cai no fallback chapado), mas o valor já testado na Dobra 6 continua o mesmo no CSS reaproveitado
- [x] Autorização de imagem confirmada para todo menor identificável — não se aplica ainda: zero fotos reais
- [x] Sem lightbox nesta rodada — não construído, ver nota acima
- [x] Agrupamento por ano — **removido**, ver nota acima; a grade de cards testada é responsiva (3 → 2 → 1 coluna) desde a Dobra 6
- [x] Um `h1` só; hierarquia sem pular nível — conferido via grep: `h1` → `h2` (Campeonatos) → `h3` × 4 (cards) → `h2` (Galeria) → `h2` × 2 (CTA final + footer), sem salto

---

## Página 6 — Transparência / Prestação de Contas

**Objetivo:** cumprir o teaser da Dobra 8. É a página que o patrocinador abre depois de ler a de patrocínio — e a que o jurídico dele vai ler.
**Esforço:** ⏱

### Estrutura

```
hero .theme-paper → dados institucionais (CNPJ, fundação, endereço, conta vinculada)
→ documentos para download → como funciona a fiscalização
→ .cta-final: "Solicitar informação"
```

### Componentes / tokens

`.hero--pagina` · `.prosa` · `.info-lista` · `.cta-final` · ícones `#i-documento`, `#i-escudo`, `#i-calendario`, `#i-local` — **não usei `.transparencia__selo`/`.transparencia__cnpj`/`.hanko`** desta vez: são específicos do layout compacto da Dobra 8 (selo posicionado ao lado do texto numa faixa só); a página dedicada tem espaço de sobra e usa `.info-lista` + `.cta-final`, o mesmo vocabulário das outras páginas

> **Achado nesta rodada:** tentei inicialmente colocar o `.hanko` dentro do `.cta-final` (decorativo, como no fecho da Dobra 8) e quebrei o layout — `.cta-final` é `flex` com `justify-content: space-between` esperando exatamente 2 filhos (título e ações); um terceiro elemento solto no meio do flex desalinha os outros dois. Removido antes de publicar. Se o hanko voltar a alguma página, precisa entrar dentro de um dos dois filhos, não como irmão deles.

### Conteúdo necessário

- [ ] ⛔ **CNPJ real** (pendência nº 11) — `00.000.000/0001-00` com `tabular-nums`, mesmo texto de sempre
- [ ] ⛔ **PDF da prestação de contas** (pendência nº 5) — o CTA final pede a prestação por contato (`/contato?assunto=transparencia`) em vez de simular um download que não existe; o markup do link real de PDF está pronto em comentário na própria página
- [ ] ⚠️ Estatuto social, ata de fundação, certidões — **não listados**: não sei o que a associação quer tornar público, e uma lista de documentos inexistentes seria o link morto que a própria aceitação abaixo proíbe
- [ ] Banco e agência da conta vinculada — não citados; o texto de fiscalização descreve o mecanismo sem citar a instituição
- [ ] Nome dos dirigentes — não publicado
- [ ] Ano de fundação — **nova pendência descoberta aqui**: nem a Dobra 8 nem o BRIEFING têm essa data; ficou `A confirmar com a associação` no `.info-lista`

### Aceitação

- [x] Nenhum documento anunciado que não exista para download — testado por leitura: o único CTA de documento pede contato, não baixa nada
- [x] Todo PDF com `target="_blank"`, `rel="noopener"` — não se aplica ainda (nenhum link de PDF ativo na página), mas o comentário com o markup pronto já inclui os dois atributos
- [x] CNPJ com `tabular-nums` — testado no Chrome
- [x] Só afirmações respaldadas pelo BRIEFING §3 — o texto de "como funciona a fiscalização" é uma extensão do parágrafo já vetado na Dobra 8, nada novo além disso
- [x] Um `h1` só; hierarquia sem pular nível — conferido via grep: `h1` → `h2` × 3 (seções) → `h2` × 2 (CTA final + footer), sem `h3`, sem salto

---

## Página 7 — Como Ajudar

**Objetivo:** atender quem quer ajudar e **não é empresa no Lucro Real** — hoje esse visitante não tem para onde ir no site inteiro.
**Esforço:** ⏱⏱

### Estrutura

```
hero .bg-dojo → 3 caminhos em cards: doação · voluntariado · divulgação
→ o que cada valor compra (item → R$) → doação de material usado (kimono)
→ .cta-final
```

### Componentes / tokens

`.hero--pagina` · `.grid-cards` / `.card` · `.prosa` · `.cta-final` · `.whatsapp-btn` · ícones `#i-parceria`, `#i-familia`, `#i-instagram` — **sem `.badge--outline-red`**: não sobrou nenhum estado ("vagas abertas"-like) que pedisse esse badge nesta versão

> **Achado nesta rodada:** os cards de "Doação" e "Voluntariado" usam `<svg class="icon icon--lg">` direto dentro de `.card__body`, sem `.card__media` — não havia precedente exato no site (todo `.card` até aqui tinha foto ou nada no lugar do media), mas o CSS de `.card__body` (flex column + gap) já comporta isso sem regra nova. Funcionou testado no Chrome; registro aqui porque é o primeiro uso desse padrão.
>
> **Esta é a página mais fina de conteúdo do site até agora** — decisão tomada com você antes de escrever: sem meio de doação confirmado, o card de "Doação" existe só para apontar para o WhatsApp, não para converter sozinho.

### Conteúdo necessário

- [ ] ⛔ **Meio de doação para pessoa física** — Pix? conta? Existe? **Continua sem resposta.** O card "Contribua direto" está no ar dizendo "a confirmar com a associação, fale pelo WhatsApp" em vez de inventar uma chave Pix ou simular um formulário
- [ ] ⚠️ **Chave Pix e titular** — bloqueado pelo item acima
- [ ] Voluntariado: existe? que perfil? como se candidata? — mesmo tratamento: card com "a confirmar", caminho pelo WhatsApp
- [ ] Doação de material (kimono usado, faixa): aceita? onde entrega? — **ficou de fora inteiramente**, nem virou card; não tenho base nenhuma para essa resposta
- [ ] "O que seu apoio compra" — 3 a 4 itens com valor real — **cortado do design**, não construí a seção; listar valores inventados aqui seria pior que não ter a seção
- [x] Deixar explícito que **doação de pessoa física não tem o benefício fiscal da Lei de Incentivo** — escrito, na seção "Distinção legal", reaproveitando o fato já estabelecido na Página 1

### Aceitação

- [x] A distinção pessoa física × empresa está clara já no hero — o lead do `h1` menciona a Lei de Incentivo e "muito mais gente" na primeira leitura
- [x] Nenhuma promessa de benefício fiscal para quem não se enquadra — conferido por leitura: a única menção fiscal da página é para dizer que ela **não** se aplica aqui
- [x] Chave Pix — não se aplica: nenhuma chave publicada nesta versão
- [x] Um `h1` só; hierarquia sem pular nível — conferido via grep: `h1` → `h2` (Caminhos) → `h3` × 3 (cards) → `h2` × 3 (CTA final + footer), sem salto

---

## Página 8 — Sobre / Instituto

**Objetivo:** missão, história e quem está por trás. É a página de menor tráfego e maior peso quando alguém decide confiar.
**Esforço:** ⏱⏱

### Estrutura

```
hero .bg-dojo → como começou (prosa) → missão e valores
→ a associação hoje (as duas frentes) → quem dirige → .cta-final
```

### Componentes / tokens

`.hero--pagina` · `.prosa` · `.cta-final` — **sem `.split`, `.traco` (além do uso padrão em section-header), `.hanko` ou `.stats-row`**: não sobrou conteúdo (foto de arquivo, número real, retrato de dirigente) que pedisse esses componentes nesta versão

> **Mudança em relação ao plano original:** das 4 seções previstas (como começou · missão e valores · a associação hoje · quem dirige), só **"a associação hoje"** tem conteúdo real — as duas frentes e os fatos legais já confirmados em outras páginas, reunidos aqui pela primeira vez numa visão geral. "Como começou" virou uma seção "Em breve" honesta em vez de prosa inventada. "Missão e valores" e "quem dirige" **nem viraram seção** — sem nada real para preencher, uma seção vazia seria pior que a ausência dela.

### Conteúdo necessário

- [ ] ⛔ **A história real** — quando, por quem, por quê. Continua sem nenhuma fonte. A seção "Como começou" está no ar como "Em breve", com uma frase explicando por que está em branco em vez de inventada
- [ ] ⚠️ **Ano de fundação** — mesma pendência nº 19, agora também bloqueando esta página (herdada da Transparência)
- [ ] Missão e valores nas palavras da associação — **nem entrou como seção**; ver nota acima
- [ ] Quem dirige — **nem entrou como seção**; ver nota acima
- [ ] Reconciliar a marca "Goetten" com o handle `@curitibanosbjj` (pendência nº 8) — comentário `TODO` deixado no lugar exato da página; **não escrevi nenhuma explicação especulada** — não sei a razão da diferença
- [ ] Fotos de arquivo — nenhuma usada; a página não tem placeholder de foto porque nenhuma seção com imagem foi construída

### Aceitação

- [x] Nada de história inventada ou romanceada — a seção "Como começou" diz explicitamente por que está vazia, não finge ter conteúdo
- [x] A relação entre as duas frentes contada uma vez, com clareza — na seção "A associação hoje", com links para as páginas de Projeto Social e Escola
- [x] Um `h1` só; hierarquia sem pular nível — conferido via grep: `h1` → `h2` × 2 (seções) → `h2` × 3 (CTA final + footer), sem `h3`, sem salto

---

## Página 9 — Contato

**Objetivo:** dar uma URL própria ao formulário que hoje só existe como Dobra 11. É cópia, não criação.
**Esforço:** ⏱

### Estrutura

```
hero .theme-paper (curto) → o formulário da Dobra 11, intacto
→ aparte com WhatsApp, endereço e horários → mapa, se houver
```

### Componentes / tokens

Os mesmos da Dobra 11: `.formulario` · `.field` · `.form-status` · `.contato__aparte` · `.whatsapp-btn` · `.info-lista`

> **Confirmado com você antes de escrever:** o formulário desta página não envia — mesmo estado já publicado hoje na home, não é uma regressão nova. Construí a página mesmo assim, porque o WhatsApp ao lado funciona de ponta a ponta e a decisão foi deliberada, não um descuido.

### Conteúdo necessário

- [ ] ⛔ **Endpoint de envio** — pendência nº 9. `action="TODO-ENDPOINT-DE-ENVIO"`, idêntico ao da home. **O formulário continua não enviando**, aqui e lá
- [ ] ⛔ **WhatsApp real** e **endereço completo** — pendências nº 10 e 12, mesmos placeholders de sempre
- [ ] Horário de atendimento — segue "A confirmar"
- [x] Mapa incorporado — **decisão mantida**: sem embed. Nenhum link para mapa externo foi adicionado nesta rodada (não havia endereço completo para linkar)

### Aceitação

- [x] O formulário aqui e o da home compartilham o mesmo markup e o mesmo JS — copiado campo a campo da Dobra 11, mesmos `id`, `name`, `data-*`; zero lógica nova em `script.js`
- [x] `?assunto=…` continua pré-selecionando o campo — testado no Chrome com `?assunto=transparencia`: "Prestação de contas" veio pré-selecionado
- [ ] Envio testado de ponta a ponta — **não se aplica**: sem endpoint, não há o que testar além da validação
- [x] Erro com ícone ✕ + mensagem específica, foco no primeiro campo com erro — testado no Chrome com envio vazio: funcionou igual à Dobra 11
- [x] Um `h1` só; hierarquia sem pular nível — conferido via grep: `h1` → `h2` (Prefere falar direto?) → `h2` × 2 (footer), sem `h3`, sem salto — o `h3` da Dobra 11 virou `h2` aqui pela mesma razão da Página 4: sem `h2` de seção antes dele nesta página

---

## Fechamento — antes de considerar o site pronto

Vale para **todas** as páginas, e substitui o fechamento do checklist de dobras (que só olhava a home). Varredura feita em 2026-08-31, com as 11 páginas já geradas (`node build.js`).

- [x] Console limpo em todas as páginas — testado uma a uma no Chrome ao longo da construção; nenhum erro do site em nenhuma (um ruído pontual da própria extensão do navegador na Página 0 não conta)
- [ ] Zero scroll horizontal, 320px a 2560px, em todas as páginas — **não testado nesta rodada**: a ferramenta de resize de viewport não respondeu em nenhuma tentativa da sessão (registrado desde a Página 0). Risco baixo — todo componente novo reusa grids `repeat(auto-fit, minmax(...))` já validados
- [x] Tab percorre cada página em ordem lógica, foco vermelho sempre visível — testado diretamente só na Página 9 (validação do formulário); as demais herdam a mesma navbar/footer já testados na Dobra 0 e não têm componente interativo novo além do que já foi testado (`.accordion` na Página 1)
- [x] Um `h1` por página, hierarquia sem pular nível — **varredura completa das 11 páginas**: todas com exatamente 1 `<h1>`, nenhum salto de nível
- [x] Toda imagem com `alt` real — não se aplica hoje: zero `<img>` reais publicadas em qualquer página nova, só placeholders com o markup pronto em comentário
- [ ] `prefers-reduced-motion` ativado — herdado do CSS original (Dobra 1), não testado de novo nesta rodada porque nenhuma página nova introduziu animação nova
- [x] **Nenhum link morto** — varredura completa de todo `href="/..."` interno do site: as 10 URLs do sitemap, todas existentes, nenhuma órfã
- [x] **Nenhum `#` de placeholder** sobrou — varredura completa: zero `href="#"` literal em qualquer página
- [x] Navbar marca a página atual com `aria-current` em todas as 10 — varredura completa, conferida uma a uma (inclusive nos dois menus, desktop e mobile)
- [x] `<title>` e `canonical` únicos por página — varredura completa: 11 títulos únicos, 11 canonicals únicos, nenhuma duplicata. **Não testado no preview de link do WhatsApp** de verdade (precisa do domínio publicado)
- [x] `sitemap.xml` com as 10 URLs, `robots.txt` apontando para ele
- [x] `404.html` no esqueleto do site
- [ ] Lighthouse ≥ 90 em performance e acessibilidade em cada página — não rodado; precisa do site publicado ou de `npx lighthouse` local
- [ ] Imagens em WebP com fallback — não se aplica ainda, zero imagem real publicada
- [x] `build.js`: reproduzível — testado várias vezes ao longo da sessão apagando os `.html` gerados e rodando `node build.js` de novo, sempre idêntico
- [ ] Deploy na Vercel testado no domínio final — não feito; todo teste desta sessão foi local (servidor estático + Chrome)

---

## Pendências abertas

As de nº 1 a 14 são herdadas do `CHECKLIST-DOBRAS.md` e **agora bloqueiam mais coisa**: o que na home era um placeholder discreto vira uma página vazia.

| # | Pendência | Bloqueava (home) | Bloqueia agora (páginas) |
|---|---|---|---|
| 3 | Números reais de impacto | Dobra 2 | Projeto Social |
| 4 | Valores mínimos por nível | Dobra 7 | **Seja Patrocinador** |
| 5 | PDF de prestação de contas | Dobra 8 | Transparência |
| 6 | Depoimentos reais com autorização | Dobra 9 | Projeto Social, Escola |
| 7 | Autorização de imagem de menores | Dobra 6 | Conquistas, Projeto Social |
| 8 | Marca "Goetten" × handle @curitibanosbjj | Dobras 10, 11 | Sobre |
| 9 | Endpoint do formulário | Dobra 11 | **Contato** |
| 10 | WhatsApp real | Dobras 4, 11 | Escola, Contato |
| 11 | CNPJ completo | Dobras 8, 11 | Transparência |
| 12 | Endereço e horários das turmas | Dobras 4, 11 | Escola, Contato |
| 13 | Fotos reais | Dobras 3–6, 10 | todas |
| 14 | Logos de patrocinadores | Dobra 10 | Seja Patrocinador |

### Novas, criadas pelo escopo multipágina

| # | Pendência | Bloqueia |
|---|---|---|
| ~~15~~ | ~~Decidir entre copiar-e-colar e `build.js` para os partials~~ — resolvida: `build.js` | ~~Página 0~~ |
| 16 | Nomes, graduações e bios dos professores (era pendência da Dobra 5, agora é uma página inteira) | Equipe |
| 17 | Lista real de campeonatos com os 4 campos | Conquistas |
| 18 | Meio de doação para pessoa física (Pix?) | Como Ajudar |
| 19 | História e ano de fundação da associação | Sobre, Transparência |
| 20 | Valores da mensalidade — publicar ou não | Escola |
| 21 | Simulação fiscal conferida por contador | Seja Patrocinador |
| 22 | Atletas destacados nominalmente ou não | Conquistas |
