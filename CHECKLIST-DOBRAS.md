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
│ 柔術 (hanko)                          ↓ role │
└──────────────────────────────────────────────┘
```

### Componentes / tokens

`.section-header__kicker` · `.corte` · `h1` (Oswald 700, `--text-display`) · `.traco` + `.traco-draw` · `.btn--primary.btn--lg` · `.btn--secondary.btn--lg` · `.hanko` · `.grain` · fundo `.bg-dojo`

### Conteúdo necessário

- [ ] **Headline definitiva** (a do design system é proposta: "Disciplina que transforma vidas"). Máx. 4 palavras por linha, 2–3 linhas.
- [ ] **Lead** de 2–3 linhas citando: projeto social gratuito + escola + Lei de Incentivo aprovada.
- [ ] Foto de fundo opcional (treino/tatame) — se usar, aplicar `.bg-foto` com véu ≥78%.

### Animação

Sequência de entrada no load, total < 1,6s: kicker `.rise` → h1 `.ink-reveal` (900ms) → traço `.traco-draw` → lead `.rise` +200ms → CTAs `.rise` +350ms (**juntos**, nenhum antes do outro) → hanko `.stamp-in`.

### Aceitação

- [ ] Os dois CTAs têm a mesma altura, o mesmo peso tipográfico e nenhum parece secundário
- [ ] `overflow: hidden` no hero — o kanji-marca d'água não cria scroll horizontal em nenhuma largura
- [ ] Em 320px o h1 não quebra palavra no meio e os CTAs empilham
- [ ] `prefers-reduced-motion`: tudo aparece pronto, nada some
- [ ] Exatamente **um** `<h1>` na página inteira

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

- [ ] **Os 4 números reais** — checar com a associação, não estimar. Se um número não existir com confiança, troque a métrica em vez de inventar.
- [ ] Decidir se algum número leva `+` ou `%` (fica em `<em>` vermelho).

### Animação

Contador conta de 0 ao valor em 900ms, ease-out cúbico, **uma única vez** ao entrar na viewport. Grupo entra com `.stagger` (70ms entre irmãos). Com reduced-motion o número já aparece final.

### Aceitação

- [ ] `tabular-nums` ativo — o número não "dança" enquanto conta
- [ ] Números conferidos com a associação (ou marcados como TODO)
- [ ] 4 colunas → 2 → 1 conforme a largura, sem número cortado

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

- [ ] 1 foto forte de aula do projeto social (crianças no tatame) com `alt` descritivo real
- [ ] 2–3 parágrafos: quem é atendido (faixa etária, quantos, de onde), o que recebem (aula, kimono, acompanhamento), por que existe
- [ ] Confirmar se há contrapartida escolar (nota/frequência) — é um argumento forte para patrocinador

### Animação

`.rise` no bloco de texto, `.traco-draw` no header. Sem animação na foto (a imagem já é o gesto).

### Aceitação

- [ ] `.theme-paper` aplicado na seção — texto preto sobre `#F7F5F2`, links em `#B3151B`
- [ ] Medida de linha ≤ 70ch
- [ ] Foto com `alt` que descreve a cena, não "imagem1"
- [ ] Empilha foto acima do texto no mobile

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

- [ ] Faixas etárias e turmas oferecidas
- [ ] Horários (ou "consulte") e endereço
- [ ] Número de WhatsApp real
- [ ] **Frase que conecta as duas frentes:** as aulas particulares ajudam a sustentar o projeto social — isso transforma matrícula em ato de apoio

### Aceitação

- [ ] Deixa claro que esta é a frente **paga**, sem ambiguidade com o projeto gratuito
- [ ] Link do WhatsApp com mensagem pré-preenchida (`?text=`)
- [ ] Alvo de toque do botão ≥ 48px

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

- [ ] Foto de cada professor — **enquadramento quadrado**, de preferência de kimono, fundo limpo
- [ ] Nome, graduação exata (faixa + grau), anos de prática
- [ ] Bio curta: 2 linhas, máx ~160 caracteres
- [ ] Confirmar a cor da faixa de cada um para o `--belt`

### Aceitação

- [ ] A barra inferior da foto usa a cor da faixa real do professor
- [ ] Cards com bios de tamanhos diferentes não desalinham (grid `stretch`)
- [ ] Todas as fotos com `alt` no formato "Professor Fulano, faixa preta, no tatame"
- [ ] Entrada com `.stagger`, uma vez só

---

## Dobra 6 — Conquistas em destaque

**Objetivo:** provar excelência esportiva com fato, não adjetivo.
**Altura:** 70–90vh. **Esforço:** ⏱⏱

### Estrutura

Grid de cards de conquista (3 a 6 mais recentes) + link para galeria completa.

### Componentes / tokens

`.card.card--conquista` · `.conquista__ano` (ano em outline gigante) · ícones `#i-medalha`, `#i-trofeu` · `.link-ink` · fundo `.bg-foto` (foto de competição sob véu 78–92%)

### Conteúdo necessário

- [ ] Lista real de campeonatos: ano, nome do evento, categoria, resultado
- [ ] Foto de pódio/ação por conquista (ou uma foto forte de fundo para a seção inteira)
- [ ] Decidir: destacar atletas nominalmente? (Se houver menor de idade, confirmar autorização de imagem dos responsáveis — obrigatório.)

### Aceitação

- [ ] Véu do `.bg-foto` ≥ 78% para o texto branco manter contraste
- [ ] Nenhuma conquista sem ano e sem evento (dado vago não convence patrocinador)
- [ ] **Autorização de imagem confirmada** para qualquer menor identificável
- [ ] Link "ver todas" leva à página de conquistas

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

- [ ] **Valores mínimos de cada nível** — pendência aberta do BRIEFING §7
- [ ] Confirmar o texto legal com a associação: número do projeto aprovado, se pode ser citado publicamente
- [ ] Contrapartidas finais de cada nível (a proposta do design system é ponto de partida)
- [ ] Logos de patrocinadores atuais, se já houver

### Regras inegociáveis desta dobra

- Citar a **Lei nº 11.438/2006 pelo nome e número**, como o site de referência faz — nunca "temos benefícios fiscais" genérico.
- Dizer explicitamente que a dedução vale para **Lucro Real**, e oferecer caminho ao resto (Apoiador/Parceiro). Prometer dedução a quem não pode usá-la queima a confiança na primeira conversa com o contador da empresa.
- Benefício ausente aparece **riscado com ✕ visível**, não escondido — comparação honesta converte melhor.

### Aceitação

- [ ] Menção fiscal precisa, com lei nomeada e regime tributário especificado
- [ ] Só **um** elemento vermelho dominante na dobra (o tier destacado ou a faixa — não os dois brigando)
- [ ] Estado ausente comunicado com ícone + texto, nunca só cor
- [ ] CTA leva a formulário com o assunto pré-selecionado (`?assunto=patrocinio`)
- [ ] Tiers empilham no mobile mantendo o destacado visualmente distinto

---

## Dobra 8 — Transparência

**Objetivo:** remover a última objeção do patrocinador. Curta e direta.
**Altura:** 30–40vh. **Esforço:** ⏱

### Estrutura

Faixa horizontal: ícone de documento + frase + link. Nada mais.

### Componentes / tokens

`#i-documento` · `.link-ink` · `.hanko` (assina o bloco) · `.theme-paper`

### Conteúdo necessário

- [ ] Prestação de contas em PDF (ou a página de transparência pronta)
- [ ] CNPJ da associação
- [ ] Frase curta: onde o dinheiro entra e onde é aplicado

### Aceitação

- [ ] Link real, não `#` — transparência que leva a lugar nenhum é pior que não ter a seção
- [ ] Se o PDF ainda não existe, a dobra sai do ar até existir (marcar como pendência)

---

## Dobra 9 — Depoimentos

**Objetivo:** validação humana. Alterna voz de família e voz de patrocinador.
**Altura:** 50–70vh. **Esforço:** ⏱⏱

### Componentes / tokens

`.card--depoimento` · `.avatar` · `blockquote` (Inter itálico) · `.stagger` · `.theme-paper`

### Conteúdo necessário

- [ ] 2–4 depoimentos reais com autorização de uso
- [ ] Para cada um: nome (ou "mãe de aluno" se preferir anonimato), papel, foto opcional
- [ ] **Pelo menos um de patrocinador**, se já houver — é o depoimento que mais converte outro patrocinador

### Aceitação

- [ ] Nenhum depoimento inventado ou "representativo" — só fala real, com permissão
- [ ] Aspas tipográficas curvas (" ") e travessão em-dash
- [ ] Se não houver depoimento real ainda, **a dobra não entra** (fica na lista de pendências)

---

## Dobra 10 — Instagram / comunidade

**Objetivo:** provar que a associação está viva, com movimento recente.
**Altura:** 40–60vh. **Esforço:** ⏱

### Estrutura

Grid de 4–8 fotos recentes + `.marquee` de logos de patrocinadores acima ou abaixo.

### Componentes / tokens

`.marquee` + `.marquee__track` (logos duplicados, segunda metade `aria-hidden`) · `#i-instagram` · `.card--interactive` · fundo `.bg-dojo`

### Conteúdo necessário

- [ ] Decidir: embed real do feed (@curitibanosbjj) ou grid manual de fotos? **Recomendo grid manual** — embed adiciona script de terceiro, pesa e quebra a estética.
- [ ] Logos de patrocinadores em SVG, versão monocromática

### Aceitação

- [ ] Marquee pausa em hover e para com `prefers-reduced-motion`
- [ ] Logos em escala de cinza, coloridos no hover
- [ ] Link para o perfil abre em nova aba com `rel="noopener"`

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

- [ ] E-mail de destino do formulário
- [ ] Escolher serviço de envio (Resend, Formspree ou similar) e configurar
- [ ] CNPJ completo da associação para o rodapé
- [ ] Endereço e horários

### Regras desta dobra

- O `select` de interesse pré-seleciona "Patrocínio" quando a URL trouxer `?assunto=patrocinio` (vindo da Dobra 7).
- O checkbox de **Lucro Real** faz triagem fiscal na origem: quem marca recebe resposta com a proposta de Lei de Incentivo; quem não marca recebe a de apoio direto.
- WhatsApp fica **ao lado** do formulário, não escondido depois dele — muita gente não preenche formulário.

### Aceitação

- [ ] Todo campo com `<label>` associado por `for`/`id`
- [ ] Erro com `aria-invalid` + `aria-describedby` + ícone + mensagem específica
- [ ] Estado de envio com `.btn--loading` e `aria-busy`
- [ ] Sucesso e falha tratados — em falha, oferecer o WhatsApp na mensagem
- [ ] Envio testado de ponta a ponta, com e-mail chegando de verdade
- [ ] Footer com CNPJ em `tabular-nums`

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
