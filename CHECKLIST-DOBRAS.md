# Checklist de Execução — Home da Goetten Jiu-Jitsu

> Documento de trabalho. Cada dobra é um bloco fechado: faça uma, marque, passe para a próxima.
> **Fontes:** [`BRIEFING.md`](./BRIEFING.md) (§6 — dobras) · [`docs/design_system.html`](./docs/design_system.html) (componentes, tokens, animações) · [`references/`](./references/) (identidade visual)

---

## Como usar

1. **Faça as dobras em ordem.** Cada uma assume que a anterior existe (a navbar da Dobra 0 é o que fixa o CTA de patrocínio no topo; o tema alterna preto ↔ papel em sequência).
2. **Não invente componente novo.** Se algo que a dobra pede não existe no design system, pare e adicione lá primeiro — o `design_system.html` é a fonte, o site é o consumidor.
3. **Só marque uma dobra como concluída** quando o checklist de aceitação dela estiver inteiro, incluindo teclado e mobile.
4. **Conteúdo faltando não bloqueia.** Use placeholder marcado com `<!-- TODO: conteúdo real -->` e registre na lista de pendências no fim deste arquivo.

**Legenda de esforço:** ⏱ curto (~1h) · ⏱⏱ médio (2–4h) · ⏱⏱⏱ longo (4h+)

### Ritmo de fundos (decidido no design system §9)

| Dobra | Fundo | Por quê |
|---|---|---|
| 0 navbar | transparente → `.bg-dojo` ao rolar | flutua sobre o hero |
| 1 hero | `.bg-dojo` | impacto |
| 2 números | `.bg-dojo` | continua o impacto sem quebrar |
| 3 projeto social | `.bg-papel` (`.theme-paper`) | leitura longa |
| 4 escola | `.bg-papel` | leitura longa |
| 5 professores | `.bg-dojo` | volta ao impacto, valoriza retrato |
| 6 conquistas | `.bg-foto` | fotografia de ação sob véu |
| 7 patrocínio | `.bg-corte` | **único fundo onde o vermelho domina** |
| 8 transparência | `.bg-papel` | credibilidade = clareza |
| 9 depoimentos | `.bg-papel` | continua a leitura |
| 10 instagram | `.bg-dojo` | fecha voltando à marca |
| 11 footer | preto puro | aterra a página |

---

## Dobra 0 — Esqueleto do projeto

**Objetivo:** o site existir, com navbar funcionando e o CSS do design system carregado. Nenhuma dobra pode começar antes disso.
**Altura:** navbar 72px, fixa no topo. **Esforço:** ⏱⏱

### Arquivos a criar

```
index.html
style.css          ← copiar os blocos 1–5 do design_system.html (tokens → componentes)
script.js          ← copiar o <script> do design_system.html (observers, navbar, acordeão, contador)
assets/
  img/
    equipe/        professores
    conquistas/    pódios, medalhas, competições
    aulas/         treinos, projeto social
    patrocinadores/ logos (SVG de preferência)
  logo/            do references/, exportado em SVG + PNG + favicon
```

### Passos

- [x] Extrair CSS do `design_system.html` para `style.css` — **só os blocos 1 a 5** (tokens, reset, assinaturas, animações, componentes). O bloco 6 (`.ds-*`) é da documentação e **não vai** para o site.
- [x] Extrair o `<script>` para `script.js`, removendo os trechos de demo (`demo-navbar-scroll`, replay do catálogo).
- [x] Acrescentar ao `style.css` o que só existia inline na documentação: bloco **6. Layout do site** (`.section`, `.container`, `.split`, `.grid-cards`, `.stats-row`, `.skip-link`) e bloco **7. Fundos de seção** (`.bg-dojo`, `.bg-papel`, `.bg-corte`, `.bg-foto`).
- [x] Logo exportado para SVG pelo cliente (`references/Logo-goetten-jiu-jitsu.svg`) e recortado em três arquivos: `assets/logo/monograma.svg` (navbar), `assets/logo/favicon.svg` (aba, com o preto da marca) e `assets/logo/lockup.svg` (footer).
- [x] Cores reais extraídas do vetor: vermelho `#EC1C24`, preto `#030303`. Tokens e contrastes atualizados no `style.css` e na documentação.
- [x] `<head>`: charset, viewport, `<title>`, meta description, Open Graph, `lang="pt-BR"`, preconnect das fontes, JSON-LD de `SportsOrganization`.
- [x] Navbar com o componente `.navbar` — links do sitemap + CTA "Seja patrocinador" + menu mobile (com Esc para fechar).
- [x] Sprite de 16 ícones inline + `<main>` com o roteiro das 11 dobras comentado.
- [x] **Correção descoberta na Dobra 1:** a classe `.icon` estava no bloco 6 do `design_system.html` (casca de documentação) e não tinha ido para o `style.css` — os ícones renderizavam sem tamanho e com preenchimento preto. Ícone é componente de produto, então o bloco foi movido para o CSS do site.
- [ ] Testar deploy estático na Vercel já nesse estado (falha de deploy descoberta agora custa minutos; descoberta na dobra 11 custa horas). **← você**

### Aceitação

- [x] Página carrega sem erro de console
- [x] Navbar ganha borda e fundo ao rolar (`.is-scrolled` → borda `#2B2B2B`) — verificado com rolagem real
- [x] Menu mobile abre/fecha, `aria-expanded` e `aria-label` acompanham, Esc fecha e devolve o foco
- [x] Tab percorre na ordem: skip-link → marca → 5 links → CTA, com foco vermelho visível
- [x] Zero scroll horizontal

> **Pendências marcadas com ← você** dependem do arquivo de marca ou de conta na Vercel.
> As âncoras da navbar (`#projeto-social`, `#escola`, …) apontam para seções que ainda não existem — elas passam a funcionar conforme cada dobra entra.

---

## Dobra 1 — Hero

**Objetivo:** dizer o que a Goetten é em uma frase e abrir os dois caminhos (patrocinador / aluno) com peso idêntico.
**Altura:** 85–100vh (nunca passar de 100vh — o usuário precisa perceber que há mais abaixo). **Esforço:** ⏱⏱

### Estrutura

```
┌──────────────────────────────────────────────┐
│ ▰ corte vermelho no topo (6px, 34% da largura)│
│                                              │
│ ▰ ASSOCIAÇÃO SEM FINS LUCRATIVOS · CURITIBANOS│  ← kicker
│                                              │
│ DISCIPLINA QUE                        柔術   │  ← h1 display
│ TRANSFORMA VIDAS.                   (marca   │     + traço de tinta
│ ▁▁▁▁▁▁▁▁▁▁                          d'água) │
│                                              │
│ Projeto social gratuito e escola…            │  ← lead, máx 52ch
│                                              │
│ [SEJA PATROCINADOR]  [CONHEÇA AS AULAS]      │  ← CTAs peso igual
│                                              │
│                                       ↓ role │
└──────────────────────────────────────────────┘
```

### Componentes / tokens

`.section-header__kicker` · `.corte` · `h1` (Oswald 700, `--text-display`) · `.traco` + `.traco-draw` · `.btn--primary.btn--lg` · `.btn--secondary.btn--lg` · `.grain` · fundo `.bg-dojo`

### Conteúdo necessário

- [ ] **Headline definitiva** — está no ar como "Disciplina que transforma vidas.", marcada com `TODO` no HTML. **Confirmar com a associação.**
- [x] **Lead** escrito, citando projeto social gratuito + Lucro Real + Lei nº 11.438/2006 + aprovação do Ministério do Esporte.
- [ ] Foto de fundo opcional (treino/tatame) — se usar, aplicar `.bg-foto` com véu ≥78%.

### Animação

Sequência de entrada no load, total < 1,4s: kicker `.rise` → h1 `.ink-reveal` (900ms) → traço `.traco-draw` → lead `.rise` +200ms → CTAs `.rise` +350ms (**juntos**, nenhum antes do outro) → dica de rolagem `.rise` +500ms.

> **Mudança em relação ao plano original:** o carimbo hanko foi retirado do hero a pedido — ele competia por espaço vertical e desequilibrava a composição. Continua sendo elemento-assinatura do sistema e segue previsto para o footer (Dobra 11), a transparência (Dobra 8) e os depoimentos (Dobra 9).

### Aceitação

- [x] Os dois CTAs têm a mesma altura, o mesmo peso tipográfico e nenhum parece secundário
- [x] `overflow: hidden` no hero — o kanji-marca d'água não cria scroll horizontal em nenhuma largura
- [x] Em 320px o h1 não quebra palavra no meio e os CTAs empilham — medido por `min-content`: o h1 pede 253px dos 272px disponíveis; abaixo de 480px os CTAs viram largura total
- [x] `prefers-reduced-motion`: as quatro classes animadas do hero (`rise`, `ink-reveal`, `traco-draw`, `stamp-in`) e a seta de rolagem estão cobertas pelo bloco `@media`
- [x] Exatamente **um** `<h1>` na página inteira
- [x] O hero cabe na primeira tela (764px de 764 disponíveis) com a dica de rolagem visível
- [x] Teclado: ordem lógica, foco vermelho visível, nenhum `tabindex` positivo

### Bugs encontrados e corrigidos nesta dobra

| Bug | Causa | Correção |
|---|---|---|
| Barra do corte quase invisível | `.hero` também usa `.grain`, e os dois disputavam o mesmo `::before` — as declarações se fundem por propriedade, e o `opacity: .05` do grão vazava para a barra | o corte passou para `::after` |
| Traço de tinta sumia | estava em `bottom: -0.1em`, fora da caixa do `h1` — e o `clip-path` do `.ink-reveal` recorta o que passa da borda | `bottom: 0` |
| `h1` e traço nunca apareciam | ambos têm **área visível zero** em repouso (clip-path fora da caixa; `scaleX(0)`), e um `IntersectionObserver` com `threshold: 0.25` nunca dispara para alvos de área zero | `threshold: 0`; o repouso do `.ink-reveal` virou só `opacity`; o traço passou a herdar o gatilho do ancestral |
| Seta de rolagem com 150×300px e preta | a classe `.icon` não existia no `style.css` (ver Dobra 0) | bloco `.icon` movido para o CSS do site |
| Rodapé do hero abaixo da dobra em notebooks | ritmo vertical calibrado para telas altas | `@media (max-height: 920px)` comprime paddings e margens |

---

## Dobra 2 — Números de impacto

**Objetivo:** prova social imediata, antes de qualquer texto longo. É o que faz o patrocinador continuar rolando.
**Altura:** 30–40vh. **Esforço:** ⏱

### Estrutura

```
┌──────────────────────────────────────────────┐
│  120+          47           2          100%  │
│  ALUNOS     PÓDIOS       ANOS DE    AULAS    │
│  NO PROJETO CONQUISTADOS ASSOCIAÇÃO GRATUITAS│
└──────────────────────────────────────────────┘
```

### Componentes / tokens

`.stat` · `.stat__value` (Oswald 700, `tabular-nums`) · `.stat__label` · `.stagger` · fundo `.bg-dojo`

### Conteúdo necessário

- [ ] ⚠️ **Os 4 números reais** — a dobra está no ar com **placeholders inventados** (120+ alunos, 47 pódios, 2+ anos, 100% gratuito), marcados com `TODO` em bloco no HTML. **Não podem ir ao ar assim.** Se um número não existir com confiança, trocar a métrica em vez de estimar.
- [x] Sufixos `+` e `%` definidos: ficam em `<em>` vermelho, e o número permanece branco — é ele que precisa ser lido de longe.

### Animação

Contador conta de 0 ao valor em 900ms, ease-out cúbico, **uma única vez** ao entrar na viewport. Grupo entra com `.stagger` (70ms entre irmãos). Com reduced-motion o número já aparece final.

### Aceitação

- [x] `tabular-nums` ativo — o número não "dança" enquanto conta
- [x] Números marcados como TODO no HTML (conferência com a associação segue pendente)
- [x] Colunas medidas: 4 em desktop e tablet · 2 em 480px · 1 em 320px, sem número cortado
- [x] Altura da seção: 275px (31vh), dentro da meta de 30–40vh
- [x] Fio de topo `#2B2B2B` separando da Dobra 1 — sem ele as duas seções `.bg-dojo` se fundiriam num bloco preto só
- [x] Contrastes: sufixo `#FF5A5F` 6.49:1 (AA) · rótulo `#A3A3A3` 7.85:1 (AAA)
- [x] Hierarquia de headings preservada: `h1` do hero → `h2` (visualmente oculto) desta dobra

> **Nota sobre o contador em aba de segundo plano:** o Chrome suspende `requestAnimationFrame` em abas ocultas, então o número congela no meio da contagem. Não precisa de correção — ao voltar para a aba o rAF retoma, o progresso já passou de 1 e o valor salta direto para o final.

---

## Dobra 3 — Projeto social (teaser)

**Objetivo:** contar a causa. É a dobra que dá legitimidade a todas as outras.
**Altura:** 60–80vh. **Esforço:** ⏱⏱

### Estrutura

```
┌──────────────────────────────────────────────┐
│ ▰ 01 · PROJETO SOCIAL                        │
│ TATAME ABERTO, FUTURO ABERTO                 │
│ ▁▁▁▁▁▁▁                                      │
│                                              │
│ ┌─────────────┐  Texto de 2–3 parágrafos     │
│ │   FOTO      │  sobre quem é atendido,      │
│ │  (aulas/    │  como funciona, o impacto.   │
│ │   projeto)  │                              │
│ └─────────────┘  → Conheça o projeto (link)  │
└──────────────────────────────────────────────┘
```

### Componentes / tokens

`.section-header` completo (kicker numerado + h2 + traço + lead) · `.link-ink` · `.theme-paper` · fundo `.bg-papel`

### Conteúdo necessário

- [ ] ⚠️ **1 foto de aula do projeto social** — está no ar um `.foto-placeholder` tracejado e rotulado "Foto pendente". O markup do `<img>` real, com `alt` descritivo e `loading="lazy"`, já está pronto num comentário logo acima; é só descomentar e apagar o placeholder. A proporção 4:3 é a mesma nos dois, então a troca não mexe no layout.
- [x] 2 parágrafos escritos, usando **só o que o BRIEFING estabelece** (gratuito, crianças e adolescentes, Curitibanos, esporte como estrutura). Nenhum número ou fato inventado.
- [ ] Confirmar com a associação: faixa etária atendida, quantos alunos, critério de vaga, e se há acompanhamento de nota/frequência escolar — este último é o argumento mais forte para patrocinador e ainda não está no texto.

### Animação

`.rise` no bloco de texto, `.traco-draw` no header. Sem animação na foto (a imagem já é o gesto).

### Aceitação

- [x] `.theme-paper` aplicado — fundo `#F7F5F2`, texto `#0A0A0A`, link `#B3151B` (6.35:1 AA). A classe sozinha basta: ela redefine os tokens semânticos, e `.section` já lê `var(--bg)` / `var(--text)`, então `.bg-papel` seria redundante aqui
- [x] Medida de linha medida: **64ch**
- [x] Markup da foto real com `alt` descritivo pronto no comentário
- [x] Empilha em 1 coluna a partir de 560px
- [x] Altura: 612px (75vh), dentro da meta de 60–80vh
- [x] Hierarquia de headings preservada

> **Desvio do wireframe, e por quê:** o plano previa o `.section-header` acima do split, ocupando a largura toda. Montado assim a seção fechava em ~95vh — bem acima da meta. Movendo o cabeçalho para dentro da coluna de texto ela caiu para 75vh, e título e foto passaram a conversar lado a lado em vez de separados por um bloco inteiro. A Dobra 4 deve seguir o mesmo padrão, espelhado.

---

## Dobra 4 — Escola de jiu-jitsu (teaser)

**Objetivo:** converter a família que quer matricular. É a única dobra que fala de serviço pago — e não pode soar como propaganda no meio de uma ONG.
**Altura:** 60–80vh. **Esforço:** ⏱⏱

### Estrutura

Espelho da Dobra 3 (foto do lado oposto, para criar ritmo em zigue-zague), mais uma lista de informações práticas.

```
┌──────────────────────────────────────────────┐
│ ▰ 02 · ESCOLA                                │
│ AULAS PARTICULARES                           │
│ ▁▁▁▁▁▁▁                                      │
│                                              │
│ Texto + o que sustenta o    ┌─────────────┐  │
│ projeto social.             │    FOTO     │  │
│                             │  (treino    │  │
│ 👤 Infantil · Juvenil · Adulto│   adulto)  │  │
│ 📅 Horários  📍 Endereço    └─────────────┘  │
│                                              │
│ [FALAR NO WHATSAPP]  → Ver horários          │
└──────────────────────────────────────────────┘
```

### Componentes / tokens

`.section-header` · `.badge` (faixas etárias) · ícones `#i-familia`, `#i-calendario`, `#i-local` · `.whatsapp-btn` · `.theme-paper`

### Conteúdo necessário

- [ ] ⚠️ **Turmas realmente oferecidas** — no ar como Infantil / Juvenil / Adulto, marcado `TODO`
- [ ] ⚠️ **Horários e endereço completo** — hoje "A confirmar" e só "Curitibanos · SC"
- [ ] ⚠️ **Número de WhatsApp real** — o link usa `wa.me/55SEUNUMERO`, um placeholder deliberadamente inválido para não haver risco de cair no telefone de um terceiro
- [ ] Foto de aula da escola (placeholder no ar, markup do `<img>` pronto em comentário)
- [x] **Frase que conecta as duas frentes** escrita e destacada com filete vermelho (`.nota-vinculo`): "Esta é a frente paga da associação, e é ela que sustenta o tatame gratuito." É o que impede a dobra de soar como anúncio dentro de uma ONG.

### Aceitação

- [x] Deixa claro que esta é a frente **paga**, sem ambiguidade com o projeto gratuito
- [x] Link do WhatsApp com mensagem pré-preenchida, `target="_blank"` e `rel="noopener"`
- [x] Alvo de toque do botão: 50px
- [x] Espelha a Dobra 3 (`.split--reverse`): foto à direita no desktop, acima do texto no mobile
- [x] Split empilha em 1 coluna a partir de 560px; lista de horário/local vai de 2 para 1 coluna a partir de ~420px
- [x] Altura: 684px (84vh)

### Bugs encontrados e corrigidos nesta dobra

| Bug | Causa | Correção |
|---|---|---|
| Badges de contorno pareciam ter a borda quebrada | o `clip-path` em paralelogramo do `.badge` comia as bordas laterais, sobrando duas linhas horizontais soltas — evidente no tema claro | o corte passou a valer só para badges **preenchidos** (`--red`, `--belt`); o de contorno virou retângulo de canto reto, alinhado ao "raio zero" do sistema. Sincronizado na documentação |
| Fio escuro entre as Dobras 3 e 4 | as duas seções claras abutam em coordenada fracionária e deixavam passar o fundo preto do `body` por arredondamento de subpixel | regra geral `.section + .section` com `border-top` de 1px no tom do tema: cobre a costura **e** resolve a fusão visual entre seções do mesmo tema (o mesmo problema das Dobras 1→2, cuja regra específica virou redundante e foi removida) |
| Seção com 94vh | coluna de texto longa demais: cabeçalho + parágrafo + badges + lista + nota + ações empilhados | lista de horário/local virou grid de 2 colunas e o texto foi enxugado → 84vh |

> **Meta de altura revisada:** o plano dizia 60–80vh. Esta dobra fecha em **84vh** e vai ficar assim: ela carrega badges, horário, endereço, a frase de vínculo e o CTA de WhatsApp. Cortar mais significaria remover informação que a família precisa para decidir — a estimativa estava otimista, não o conteúdo.

---

## Dobra 5 — Professores em destaque

**Objetivo:** dar rosto e credibilidade a quem ensina. Patrocinador e família compram a mesma coisa aqui: confiança em pessoas.
**Altura:** 70–90vh. **Esforço:** ⏱⏱

### Estrutura

Grid de cards de professor (2 a 4 conforme a equipe).

```
┌──────────────────────────────────────────────┐
│ ▰ 03 · EQUIPE                                │
│ QUEM ESTÁ NO TATAME                          │
│                                              │
│ ┌────────┐ ┌────────┐ ┌────────┐            │
│ │ FOTO   │ │ FOTO   │ │ FOTO   │            │
│ │▪▪▪▪▪▪▪▪│ │▪▪▪▪▪▪▪▪│ │▪▪▪▪▪▪▪▪│ ← faixa    │
│ │ Nome   │ │ Nome   │ │ Nome   │            │
│ │ Faixa  │ │ Faixa  │ │ Faixa  │            │
│ └────────┘ └────────┘ └────────┘            │
└──────────────────────────────────────────────┘
```

### Componentes / tokens

`.card.card--sensei` (com `--belt` na cor da faixa) · `.badge--belt` · `.stagger` · fundo `.bg-dojo`

### Conteúdo necessário

- [ ] ⚠️ **Nomes, graduações e bios são placeholders** — "Nome do professor" repetido três vezes. Não são pessoas reais e não podem ir ao ar. Optei por não inventar nomes: fabricar uma pessoa e uma graduação no site de uma associação real é o tipo de coisa que passa despercebida e vai ao ar.
- [ ] Foto de cada professor — **enquadramento quadrado**, de preferência de kimono, fundo limpo
- [ ] Nome, graduação exata (faixa + grau), anos de prática
- [ ] Bio curta: 2 linhas, máx ~160 caracteres
- [ ] Definir quantos professores entram (a grade acomoda 2 a 4; hoje há 3 cards)
- [x] Graduação virou classe no `<article>` (`is-preta`, `is-marrom`, `is-roxa`, `is-azul`, `is-branca`): pinta a barra da foto **e** o badge a partir do mesmo token, sem `style` inline

### Aceitação

- [x] A barra inferior da foto usa a cor da faixa, lida do token `--belt-*`
- [x] Cards com bios de tamanhos diferentes não desalinham: medidos em 589px os três, com as barras de faixa e os badges na mesma altura
- [x] Fotos: markup do `<img>` com `alt` no formato correto pronto em comentário
- [x] Entrada com `.stagger`, uma vez só
- [x] Colunas: 3 em desktop · 2 em 820px e 560px · 1 em 320px
- [x] Contraste dos badges de faixa: branca 14.07:1 · azul 8.05:1 · roxa 9.70:1 · marrom 10.09:1 · preta 20.62:1 — todos AAA
- [x] Seção não precisa de classe de tema: escuro é o padrão dos tokens em `:root`, `.theme-paper` é que é a exceção (o `bg-dojo` da Dobra 2 virou redundante e foi removido)

### Bugs encontrados e corrigidos nesta dobra

| Bug | Causa | Correção |
|---|---|---|
| Badge esticava para a largura toda do card | `.card__body` é flex column, e o padrão `align-items: stretch` estica o item no eixo cruzado | `align-self: flex-start` no badge dentro do card body |
| Fotos com alturas diferentes entre cards | uma regra minha para o placeholder tinha a mesma especificidade de `.card--sensei .card__media` e, vindo depois na cascata, matava o `aspect-ratio: 1` | o placeholder passou a ir **aninhado** dentro do `.card__media`, que continua dono da proporção |
| Barra da faixa preta invisível | `#030303` sobre o card `#141414` não se distingue | a barra ganhou a **ponteira vermelha** — resolve a visibilidade e é o que existe na faixa de verdade |
| Badges em alturas diferentes entre cards | bios de tamanhos diferentes empurravam o badge | `margin-top: auto` no badge, encostando-o no rodapé do card |

> **Meta de altura revisada:** o plano dizia 70–90vh; a seção fecha em **123vh**. Três retratos quadrados de 366px são o que dá "rosto" à equipe — para caber em 90vh a foto teria de encolher para ~100px, o que anula o propósito da dobra. A estimativa estava errada, não o conteúdo. Se a equipe tiver 4 professores, os cards encolhem para 264px e a seção cai para ~110vh.

---

## Dobra 6 — Conquistas em destaque

**Objetivo:** provar excelência esportiva com fato, não adjetivo.
**Altura:** 70–90vh. **Esforço:** ⏱⏱

### Estrutura

Grid de cards de conquista (3 a 6 mais recentes) + link para galeria completa.

### Componentes / tokens

`.card.card--conquista` · `.conquista__ano` (ano em outline gigante) · ícones `#i-medalha`, `#i-trofeu` · `.link-ink` · fundo `.bg-foto` (foto de competição sob véu 78–92%)

### Conteúdo necessário

- [ ] ⚠️ **Lista real de campeonatos** — os três cards estão com marcadores entre colchetes (`ANO`, `[campeonato · categoria]`, `[resultado]`). Cada conquista precisa de ano, evento, categoria e resultado; sem os quatro, o dado não convence patrocinador.
- [ ] ⚠️ **Foto de competição para o fundo** — sem ela o `.bg-foto` cai no preto chapado, que é o fallback documentado. Quando houver, basta `style="--foto: url('assets/img/conquistas/podio.jpg')"` na `<section>`. **Tratamento testado com uma imagem de mentira: funciona.**
- [ ] ⚠️ **Autorização de imagem dos responsáveis** para qualquer atleta menor identificável — na foto de fundo e na galeria. Obrigatório, não opcional.
- [ ] Decidir se atletas são destacados nominalmente

### Aceitação

- [x] Véu do `.bg-foto` corrigido para **85–93%** (era 78–92%) — ver o achado abaixo
- [x] Estrutura obriga os quatro campos por conquista: ano, evento, categoria e resultado
- [ ] **Autorização de imagem confirmada** para qualquer menor identificável — segue pendente
- [x] Cards de alturas iguais (214px os três), colunas 3 → 2 → 1
- [x] Altura: 725px (89vh), dentro da meta de 70–90vh
- [ ] Link "ver todas" aponta hoje para `#patrocinio` ("Patrocine quem chega ao pódio"), porque a galeria ainda não existe

### Achado que mudou o design system

O véu do `.bg-foto` estava documentado como **78–92%**, número que eu tinha estimado olhando só para o texto branco. Medindo o pior caso real — um **pixel branco da foto** logo atrás do texto, que num pódio de jiu-jitsu é o kimono, a situação mais provável de todas:

| Véu | Fundo resultante | Texto branco | Texto secundário `#A3A3A3` |
|---|---|---|---|
| 78% | `#404040` | 10.37:1 AAA | **4.11:1 — reprova** |
| 85% | `#2F2F2F` | 13.39:1 AAA | 5.31:1 AA |
| 92% | `#1E1E1E` | 16.67:1 AAA | 6.61:1 AA |

O lead do `.section-header` usa justamente texto secundário, então a seção reprovaria em AA sobre uma foto clara. O piso subiu para **85%** no `style.css` e na documentação. A perda de presença da foto é pequena — ela já era atmosfera, não protagonista.

---

## Dobra 7 — Seja patrocinador ⭐

**Objetivo:** a dobra que financia tudo. É a única autorizada a deixar o vermelho dominar.
**Altura:** 90–110vh. **Esforço:** ⏱⏱⏱

### Estrutura

```
┌──────────────────────────────────────────────┐
│  ▰▰▰ faixa diagonal vermelha (.bg-corte) ▰▰▰ │
│                                              │
│ ▰ 04 · PATROCÍNIO                            │
│ SUA EMPRESA DEDUZ. NOSSO PROJETO CRESCE.     │
│ ▁▁▁▁▁▁▁                                      │
│                                              │
│ Empresas do Lucro Real deduzem do IR devido  │
│ via Lei nº 11.438/2006 — projeto aprovado    │
│ pelo Ministério do Esporte, conta vinculada. │
│                                              │
│ ┌────────┐ ┌────────┐ ┌════════┐            │
│ │APOIADOR│ │PARCEIRO│ ║OFICIAL ║ ← destacado │
│ └────────┘ └────────┘ ╚════════╝            │
│                                              │
│ [FALAR COM A ASSOCIAÇÃO]  → Prestação de contas│
└──────────────────────────────────────────────┘
```

### Componentes / tokens

`.tiers` + `.tier` + `.tier--featured` · `.badge--red` (flag "Lei de Incentivo") · `.tier__list` com ✓/✕ · `.btn--primary` · fundo `.bg-corte`

### Conteúdo necessário

- [ ] ⚠️ **Valores mínimos de cada nível** — pendência aberta. Hoje o rodapé diz "cada nível tem um valor mínimo; fale com a associação", o que funciona, mas número explícito converte melhor.
- [ ] ⚠️ **Número do projeto aprovado e data de publicação no DOU** — confirmar com a associação se podem ser citados publicamente. Se puderem, entram no bloco fiscal e aumentam muito a credibilidade: transformam "projeto aprovado" em fato verificável.
- [ ] Contrapartidas finais de cada nível (as do design system estão no ar como ponto de partida)
- [ ] Logos de patrocinadores atuais, se já houver
- [x] Texto legal escrito: cita a lei pelo número, explica o mecanismo (dedução do IR devido, não despesa), o limite de 2%, a aprovação ministerial e a conta vinculada

### Regras inegociáveis desta dobra

- Citar a **Lei nº 11.438/2006 pelo nome e número**, como o site de referência faz — nunca "temos benefícios fiscais" genérico.
- Dizer explicitamente que a dedução vale para **Lucro Real**, e oferecer caminho ao resto (Apoiador/Parceiro). Prometer dedução a quem não pode usá-la queima a confiança na primeira conversa com o contador da empresa.
- Benefício ausente aparece **riscado com ✕ visível**, não escondido — comparação honesta converte melhor.

### Aceitação

- [x] Menção fiscal precisa: "Lei nº 11.438/2006" pelo número, "Lucro Real" explícito, e o caminho para Simples/Lucro Presumido no mesmo bloco
- [x] Uma única **superfície** vermelha dominante (o bloco fiscal); a cunha do topo é acento e o tier destacado é contorno — não competem
- [x] Estado ausente com ícone ✕ + texto, nunca só cor (3 itens, todos verificados)
- [x] CTAs levam a `?assunto=apoio|parceria|patrocinio#contato`
- [x] Tiers: 3 colunas em desktop e 820px · 2 em 560px · 1 em 320px, com o destacado sempre distinto pela borda vermelha e pela flag
- [x] Bloco fiscal em `--color-red-ink` (4.59:1 com branco, AA) — a cor da marca pura daria 4.41:1 e reprovaria

### Bugs encontrados e corrigidos nesta dobra

| Bug | Causa | Correção |
|---|---|---|
| Faixa diagonal do `.bg-corte` cruzava a coluna de texto | o gradiente atravessava a seção inteira, e a posição da faixa muda com a largura da tela — texto branco sobre o vermelho da marca dá 4.41:1, abaixo de AA | o fundo virou uma **cunha no topo** (grossa à esquerda, afinando à direita, como o corte do monograma), sem texto por cima em nenhuma largura |
| Kicker encostava na cunha | o padding padrão da seção era menor que a cunha | `padding-top` passou a somar a altura da cunha |
| Bloco fiscal com metade da largura vazia | o corpo era item flex sem `flex: 1`, encolhia para a largura do texto e o grid interno nunca abria em 2 colunas | `flex: 1` no corpo e `minmax(min(100%, 380px), 1fr)` para forçar exatamente 2 colunas (com `minmax(270px)` o grid abria 3 faixas para 2 parágrafos e sobrava uma vazia) |
| Query string não chegava ao script | os CTAs usavam `#contato?assunto=...`; uma query depois do fragmento não vira `location.search` | invertido para `?assunto=...#contato` |

> **Meta de altura revisada:** o plano dizia 90–110vh; a seção fecha em **147vh**. É a dobra que mais carrega: cabeçalho, explicação legal completa, três níveis comparados item a item e o rodapé de conversão. Cortar significaria tirar a explicação da lei ou reduzir a comparação — as duas coisas que fazem o patrocinador decidir.

> **Nota sobre os CTAs:** `?assunto=...#contato` recarrega a página antes de rolar até o formulário. É o preço de funcionar **sem JavaScript**: o `<select>` chega pré-selecionado mesmo com script desativado. Se o recarregamento incomodar, dá para interceptar o clique via JS depois — mas o caminho sem JS precisa continuar existindo.

---

## Dobra 8 — Transparência

**Objetivo:** remover a última objeção do patrocinador. Curta e direta.
**Altura:** 30–40vh. **Esforço:** ⏱

### Estrutura

Faixa horizontal: ícone de documento + frase + link. Nada mais.

### Componentes / tokens

`#i-documento` · `.link-ink` · `.hanko` (assina o bloco) · `.theme-paper`

### Conteúdo necessário

- [ ] ⚠️ **PDF da prestação de contas** — quando existir, trocar a ação pelo download direto. O markup do link já está pronto num comentário, com `target="_blank"` e `rel="noopener"`.
- [ ] ⚠️ **CNPJ real** — hoje `00.000.000/0001-00`, marcado com `TODO`.
- [x] Frase escrita, afirmando **só o que o BRIEFING §3 dá como confirmado**: conta vinculada em banco público exigida por lei, projeto aprovado pelo Ministério do Esporte, prestação de contas pública.

### Aceitação

- [x] **Link real, não `#`** — a ação aponta para `?assunto=transparencia#contato`, um caminho que funciona de verdade ("Solicitar a prestação de contas")
- [x] Altura: 335px (41vh) — 1 ponto acima da meta de 30–40vh, dentro do aceitável
- [x] Empilhamento: 1 linha no desktop · 2 em 760px · 3 empilhadas em 520px e abaixo
- [x] Alvo de toque do botão: 48px
- [x] CNPJ com `tabular-nums`
- [x] Primeiro uso do **carimbo hanko** no site, como previsto quando ele saiu do hero

> **Revisão da regra anterior.** O checklist dizia que a dobra deveria sair do ar até o PDF existir. Na prática há um terceiro caminho, melhor que os dois: a seção **afirma só fatos já confirmados** e oferece uma ação que funciona hoje (solicitar por contato). Fica publicável agora, e quando o PDF chegar é a troca de uma linha. O que continua valendo é a regra de fundo: nada de `href="#"` fingindo ser um documento.

---

## Dobra 9 — Depoimentos

**Objetivo:** validação humana. Alterna voz de família e voz de patrocinador.
**Altura:** 50–70vh. **Esforço:** ⏱⏱

### Componentes / tokens

`.card--depoimento` · `.avatar` · `blockquote` (Inter itálico) · `.stagger` · `.theme-paper`

### Conteúdo necessário

- [ ] ⛔ **2 a 4 depoimentos reais com autorização de uso** — a dobra está no ar com três marcadores entre colchetes, em itálico, todos começando por `[`. **Não são citações e não podem ser publicados.**
- [ ] Para cada um: nome (ou "mãe de aluno", se preferir anonimato), papel, ano de entrada
- [ ] **Pelo menos um de patrocinador** — é o depoimento que mais converte outro patrocinador; vale priorizar essa coleta
- [x] Estrutura alterna as duas vozes com etiqueta visível (Família / Patrocinador): são os dois públicos co-primários se validando um para o outro
- [ ] No texto real: aspas tipográficas curvas (" ") e travessão em-dash (—)

### Aceitação

- [x] Nenhum depoimento inventado: os três `<blockquote>` começam por `[` e descrevem o que preencher, não simulam fala
- [x] Cards de mesma altura com as assinaturas alinhadas no rodapé, mesmo com citações de tamanhos diferentes
- [x] Colunas: 3 em desktop · 2 em 820px · 1 em 560px e abaixo
- [x] Etiqueta de origem em `#B3151B` (6.35:1, AA sobre papel)
- [x] Altura: 599px (74vh)
- [ ] **A `<section>` sai do HTML se não houver falas reais até o lançamento**

> **Por que aqui não vale o meio-termo da Dobra 8.** Lá deu para publicar afirmando só fatos já confirmados. Um depoimento é a fala de uma pessoa: não existe versão "provisória mas verdadeira" dele. Publicar citação inventada num site institucional é atribuir palavras a alguém que não as disse — é diferente de um layout com foto pendente.
>
> **Se houver só um depoimento real, a dobra funciona com um card só.** A grade se ajusta sozinha. Melhor um verdadeiro que três inventados.

> **Meta de altura:** o plano dizia 50–70vh; fechou em **74vh** com três cards. Com citações reais a altura varia conforme o comprimento das falas — vale remedir depois que o conteúdo entrar.

---

## Dobra 10 — Instagram / comunidade

**Objetivo:** provar que a associação está viva, com movimento recente.
**Altura:** 40–60vh. **Esforço:** ⏱

### Estrutura

Grid de 4–8 fotos recentes + `.marquee` de logos de patrocinadores acima ou abaixo.

### Componentes / tokens

`.marquee` + `.marquee__track` (logos duplicados, segunda metade `aria-hidden`) · `#i-instagram` · `.card--interactive` · fundo `.bg-dojo`

### Conteúdo necessário

- [x] **Decidido: grade manual, sem embed.** O embed do Instagram carrega script de terceiro, pesa, rastreia o visitante e não obedece ao design system. A grade é estática, rápida e nossa — o custo é atualizar as fotos na mão de vez em quando.
- [ ] ⚠️ **12 fotos quadradas recentes** — 6 aparecem de cara e 6 entram no botão "Ver mais fotos" (treinos, competições, bastidores)
- [ ] ⚠️ **Logos dos patrocinadores em SVG monocromático** — a esteira está com 5 marcadores ("Patrocinador 1…5")
- [ ] Confirmar o handle: o site linka `@curitibanosbjj`, mas a marca é "Goetten" (pendência nº 8)

### Aceitação

- [x] Esteira pausa em hover e para com `prefers-reduced-motion` (regras verificadas na folha de estilo)
- [x] Esteira com 10 itens: 5 logos + 5 duplicados com `aria-hidden`, laço linear de 28s
- [x] Regra de escala de cinza → cor no hover pronta para quando os logos reais entrarem
- [x] Link do perfil com `target="_blank"`, `rel="noopener"` e 48px de alvo de toque
- [x] Grade de fotos: 2 colunas no mobile · 3 a partir de 640px · 6 a partir de 1024px
- [x] **Galeria expansível**: 6 fotos visíveis + 6 no botão "Ver mais fotos"
  - Os extras usam o atributo `hidden`, não uma classe visual — recolhidos, ficam fora da ordem de tabulação e da árvore de acessibilidade
  - `<button type="button">` real com `aria-expanded` e `aria-controls`; funciona com Enter e Espaço sem tratamento extra
  - Rótulo e ícone alternam: "Ver mais fotos" ＋ → "Ver menos" ✕
  - Entrada em escada de 0 a 250ms, desligada por `prefers-reduced-motion`
  - **Ancoragem de scroll ao recolher** (ver abaixo)

> **Detalhe do recolhimento.** Ao recolher, some uma fileira de fotos **acima** do botão, e ele salta ~194px para cima — às vezes para fora da tela. A primeira versão rolava até ele com `scrollIntoView({behavior:"smooth"})`, mas isso depende de scroll suave, que o navegador suspende em aba de segundo plano. A versão final **ancora**: mede a posição do botão antes e depois de esconder e corrige o scroll pela diferença, de modo que ele não sai do lugar — sem animação, sem depender de nada. Medido: topo 60px antes e 60px depois, deslocamento zero.
>
> Na expansão não se corrige nada de propósito: as fotos novas devem empurrar a página, senão entram fora da vista.
- [x] Altura da comunidade: 536px (66vh); faixa de patrocinadores: 76px

> **Desvio do plano:** a esteira de logos saiu de dentro da seção de comunidade e virou uma **faixa própria**, logo abaixo. Dois motivos: são assuntos diferentes (fotos da comunidade × patrocinadores), e juntas a seção ia a ~90vh. Separada, a faixa fica fora do `.container` e sem padding de seção, sangrando de borda a borda com 76px — que é como uma lista de patrocinadores deve aparecer. Dentro do container ela media 205px e parava a 1152px, sem sangria.

> **Colunas explícitas, não `auto-fit`:** com 6 fotos o `auto-fit` deixaria órfãos na última linha em várias larguras (5+1, 4+2). Três breakpoints declarados garantem linhas sempre cheias: 2 · 3 · 6.

---

## Dobra 11 — Contato + Footer

**Objetivo:** capturar quem decidiu agir, por formulário ou WhatsApp.
**Altura:** formulário 70–90vh + footer 40vh. **Esforço:** ⏱⏱⏱

### Estrutura

```
┌──────────────────────────────────────────────┐
│ ▰ 05 · CONTATO                               │
│ VAMOS CONVERSAR                              │
│                                              │
│ ┌── Formulário ──────┐   Ou fale direto:     │
│ │ Nome*              │   [💬 WHATSAPP]       │
│ │ E-mail*  Telefone  │   📍 Curitibanos · SC │
│ │ Interesse ▾        │   📷 @curitibanosbjj  │
│ │ CNPJ (se empresa)  │                       │
│ │ ☑ Lucro Real       │                       │
│ │ Mensagem           │                       │
│ │ [ENVIAR]           │                       │
│ └────────────────────┘                       │
├──────────────────────────────────────────────┤
│ 柔術  GOETTEN    Navegue    Contato          │  ← footer
│ CNPJ 00.000.000/0001-00      © 2026          │
└──────────────────────────────────────────────┘
```

### Componentes / tokens

`.field` (todos os estados) · `.check` · `select.field__control` · `.btn--primary` + `.btn--loading` · `.whatsapp-btn` · `.footer` · `.hanko`

### Conteúdo necessário

- [ ] ⚠️ **Serviço de envio + e-mail de destino** — o `action` do formulário é `TODO-ENDPOINT-DE-ENVIO`. **O formulário ainda não envia.** Enquanto o placeholder estiver lá, o envio cai no estado de erro, que oferece o WhatsApp: degrada de forma honesta, mas precisa ser resolvido antes do lançamento.
- [ ] ⚠️ **Número real de WhatsApp** — aparece em 3 lugares (aparte do contato, footer e a mensagem de erro do formulário), todos como `wa.me/55SEUNUMERO`
- [ ] ⚠️ **CNPJ completo** — no bloco de transparência e no rodapé
- [ ] Endereço completo e horários

### Regras desta dobra

- O `select` de interesse pré-seleciona "Patrocínio" quando a URL trouxer `?assunto=patrocinio` (vindo da Dobra 7).
- O checkbox de **Lucro Real** faz triagem fiscal na origem: quem marca recebe resposta com a proposta de Lei de Incentivo; quem não marca recebe a de apoio direto.
- WhatsApp fica **ao lado** do formulário, não escondido depois dele — muita gente não preenche formulário.

### Aceitação

- [x] Todos os 7 campos com `<label>` associado (auditado na página inteira)
- [x] Erro com `aria-invalid` + `aria-describedby` + ícone ✕ + mensagem específica — testado com envio vazio e com CNPJ incompleto
- [x] Foco salta para o primeiro campo com erro
- [x] Erro se limpa sozinho quando a pessoa corrige o campo
- [x] Estado de envio com `.btn--loading`, `aria-busy` e botão desabilitado
- [x] Falha tratada: libera o botão e oferece o WhatsApp em nova aba
- [ ] **Envio de ponta a ponta ainda não testado** — depende do endpoint
- [x] WhatsApp **ao lado** do formulário, não depois dele
- [x] `?assunto=...` pré-seleciona o campo (testado com `transparencia`)
- [x] Footer com CNPJ em `tabular-nums`
- [x] Validação em `novalidate`: as mensagens nativas do navegador não são traduzíveis nem estilizáveis, então validamos no cliente e ligamos cada erro ao campo

### Bug encontrado nesta dobra

| Bug | Causa | Correção |
|---|---|---|
| Hierarquia de headings pulava de `h3` para `h6` | os rótulos de coluna do footer usavam `<h6>` pela aparência de overline, mas o último heading de conteúdo é `h3` — pular dois níveis quebra a navegação por headings em leitor de tela | viraram `<h2 class="rotulo-coluna">`: voltar de h3 para h2 é válido, o que não pode é pular descendo. A aparência de overline passou para a classe, não para o nível da tag |

> **Alturas:** contato 126vh (meta 70–90) e footer 414px (~51vh, meta 40vh). O formulário tem 7 campos mais o aparte de WhatsApp e dados; encurtar significaria tirar campo, e cada um deles serve a triagem (o CNPJ e o checkbox de Lucro Real são o que separa quem pode deduzir de quem não pode).

---

## Fechamento — antes de considerar a home pronta

- [ ] **Console limpo** em todas as larguras
- [ ] **Zero scroll horizontal** de 320px a 2560px
- [ ] Tab percorre a página inteira em ordem lógica, foco vermelho sempre visível
- [ ] Hierarquia de headings sem pular nível, um `h1` só
- [ ] Toda imagem com `alt` real
- [ ] `prefers-reduced-motion` ativado: nada some, nada trava
- [ ] Lighthouse: performance e acessibilidade ≥ 90
- [ ] Imagens comprimidas (WebP com fallback) e com `width`/`height` para evitar layout shift
- [ ] Meta tags e Open Graph conferidos com o preview de link do WhatsApp
- [ ] Deploy na Vercel testado no domínio final

---

## Pendências abertas (herdadas do BRIEFING e do design system)

| # | Pendência | Bloqueia |
|---|---|---|
| 1 | Identificar/licenciar a fonte oficial do wordmark (hoje: Oswald como substituta) | Dobras 1, 5, 7 |
| 2 | Exportar `apple-touch-icon.png` 180×180 (Safari iOS não lê favicon SVG) | nenhuma — cosmético |
| 3 | Números reais de impacto | Dobra 2 |
| 4 | Valores mínimos por nível de patrocínio | Dobra 7 |
| 5 | PDF de prestação de contas | Dobra 8 |
| 6 | Depoimentos reais com autorização | Dobra 9 |
| 7 | Autorização de imagem de menores | Dobra 6 |
| 8 | Reconciliar marca "Goetten" com o handle @curitibanosbjj | Dobras 10, 11 |
| 9 | Serviço de envio do formulário + e-mail de destino | Dobra 11 |
| 10 | Número real de WhatsApp (aparece em 4 lugares) | Dobras 4 e 11 |
| 11 | CNPJ completo da associação | Dobras 8 e 11 |
| 12 | Endereço completo e horários das turmas | Dobras 4 e 11 |
| 13 | Fotos reais — 11 placeholders no ar (projeto, escola, 3 professores, fundo de conquistas, 6 da comunidade) | Dobras 3, 4, 5, 6 e 10 |
| 14 | Logos dos patrocinadores em SVG monocromático | Dobra 10 |
