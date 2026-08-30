# Prompt — Criar o Design System da Goetten Jiu Jitsu

> **Entregável:** um único arquivo `docs/design_system.html`, auto-contido, navegável, que serve simultaneamente como (a) documentação viva do sistema e (b) demonstração ao vivo de cada token, componente e animação.

---

## 0. Contexto obrigatório — leia antes de escrever qualquer linha

Antes de produzir o arquivo, leia de fato estes materiais do projeto. Não invente convenções: extraia as que já existem ou já foram decididas.

| Fonte | O que extrair |
|---|---|
| `BRIEFING.md` (raiz do projeto) | fonte de verdade do projeto inteiro: públicos (patrocinadores empresariais e famílias/alunos), sitemap completo, dobras propostas da home, níveis de patrocínio, enquadramento fiscal já confirmado (Lei 11.438/2006), stack decidido (HTML/CSS/JS puro) |
| **`references/` (raiz do projeto)** — hoje contém `Logo goetten jiu jitsu.pdf` | **fonte oficial e obrigatória da identidade visual.** É o "puro suco" da marca: paleta (preto, branco, vermelho de destaque), o monograma e o wordmark "GOETTEN BRAZILIAN JIU-JITSU" na tipografia condensada/geométrica oficial. Toda decisão de cor e tipografia do design system deriva deste arquivo — não de suposição. Qualquer novo asset de marca que o cliente adicionar a esta pasta passa a valer também. Ver seção 2 para a extração detalhada |
| `index.html`, `style.css`, `script.js` do site (quando já existirem) | estrutura de seções, convenção de nomes de classe (adote BEM se ainda não houver padrão definido), padrão de `id`s — assim que o site começar a ser codificado, esses arquivos passam a ser a fonte de convenções, não este documento |
| [institutostartdoing.org](https://institutostartdoing.org/) | referência de tom citada no `BRIEFING.md`: corporativo-direto, foco em resultado/método, cita o mecanismo de incentivo fiscal explicitamente e sem rodeios. Extraia a *técnica* e o *ritmo* — nunca copie marcação ou classes geradas |

**Sobre referências externas em geral:** extraia a técnica e reimplemente no stack deste projeto. Descreva cada técnica replicada em uma nota "Referência → como foi reimplementado".

### Stack a respeitar (não introduza dependências novas)

- HTML estático + **CSS puro**, sem framework CSS (sem Tailwind, sem Bootstrap) — decisão já tomada no `BRIEFING.md`
- JavaScript vanilla. GSAP via CDN é permitido **apenas se necessário** para revelações de texto/scroll (ex: entrada de seções, contadores de impacto) — use com moderação; para um site institucional, prefira `IntersectionObserver` + CSS transitions sempre que resolver o problema sozinho
- **Sem Three.js e sem qualquer elemento 3D** — não há necessidade disso neste projeto institucional
- Fontes: a wordmark oficial (`references/Logo goetten jiu jitsu.pdf`) usa uma condensada/geométrica bold para títulos de impacto — ver seção 2 para a especificação completa e a fonte de substituição recomendada
- Zero build step, zero framework, zero bundler. O arquivo abre com duplo clique — compatível com o deploy estático já decidido (Vercel, sem build)

---

## 1. Quem o sistema representa

O site é onde a Goetten Jiu Jitsu se apresenta simultaneamente como **causa social**, **escola de aulas particulares** e **oportunidade de patrocínio empresarial**. O design system precisa **carregar essa tripla identidade nos tokens e nos componentes**, não só descrevê-la em texto.

### 1.0 A intenção central: transmitir confiança institucional e orgulho esportivo ao mesmo tempo

Este é o objetivo que governa todos os outros. O site precisa convencer uma empresa a assinar um patrocínio **e** convencer uma família a matricular o filho — na mesma visita, sem que um tom contradiga o outro.

Consequências práticas que o design system deve assumir:

- **A identidade é de academia de luta, não de ONG genérica nem de startup corporativa.** A marca já existente (`references/Logo goetten jiu jitsu.pdf`) é preto, branco e vermelho, com um monograma geométrico de cortes angulares e uma tipografia condensada e agressiva — isso é o ponto de partida inegociável. Confiança institucional para o patrocinador se constrói **em cima** dessa estética de combate (dados bem apresentados, transparência, hierarquia clara), nunca substituindo-a por um visual corporativo genérico e "suavizado". Se o sistema perder a energia de jiu-jitsu, ele falhou — mesmo que fique "elegante".
- **Sobriedade institucional é a base, não é frieza.** O lado patrocinador exige clareza corporativa (dados, transparência, linguagem legal correta); o lado escola/comunidade exige acolhimento humano (fotos reais, tom convidativo). O sistema precisa sustentar os dois registros com os mesmos tokens, variando peso e contexto — não são dois sites.
- **Prova social tem peso visual real.** Números de impacto, conquistas e depoimentos não são detalhes de rodapé: são o argumento central tanto para patrocinador quanto para família. Documente, para cada seção de prova social, como o dado se torna elemento gráfico grande e legível — não apenas texto corrido.
- **O mecanismo fiscal se comunica com precisão, não com vaguidade.** Sempre que o design system tratar da seção de patrocínio, a referência à Lei 11.438/2006 deve ser tratada como informação factual de destaque (ver `BRIEFING.md`, seção 3) — nunca como promessa genérica de "isenção de impostos".
- **Economia de gesto, como no próprio jiu-jitsu.** Cada animação é um gesto único, intencional, com preparação e finalização limpas — nada de movimento decorativo redundante. Isso não é só metáfora aqui: é literalmente a disciplina que o site representa.
- **Diferente ≠ confuso.** Um site institucional para patrocinadores corporativos não pode arriscar clareza por ousadia estética. Ousadia visual, se houver, entra na fotografia e na prova social — não em layouts que competem com a legibilidade.

Traduza a identidade da associação em decisões concretas — para cada uma, escreva a frase "isso representa X porque Y":

- **Causa social / impacto real** → seção de números com peso visual forte, linguagem de resultado ("X alunos atendidos", "X anos de atuação"), não de caridade genérica
- **Escola / acolhimento familiar** → tom convidativo, fotos reais de alunos e aulas, clareza prática imediata (como matricular, faixas etárias, horários)
- **Excelência esportiva / conquistas** → tratamento quase editorial-esportivo para medalhas e campeonatos: números grandes, fotos de ação, destaque de atletas
- **Patrocínio empresarial / confiança institucional** → seção com tom formal de parceria de negócio, menção explícita e correta ao mecanismo legal, link visível para a página de Transparência/Prestação de Contas
- **Comunidade / disciplina do jiu-jitsu** → economia visual e de movimento: poucos elementos, gestos de animação limpos, sem ruído decorativo
- **Identidade de combate / academia de luta** → preto, branco e vermelho como paleta inegociável; tipografia condensada e geométrica em títulos de impacto; ângulos e cortes diagonais (como o corte vermelho do monograma) como vocabulário gráfico recorrente, não decoração isolada
- **Tradição japonesa / tinta sumi-ê** → a linguagem de movimento e ornamento do site remete à caligrafia e à tinta japonesa: traços de pincel como divisores e sublinhados, revelações que parecem uma pincelada única e decisiva (preparação → golpe → assentamento), um selo/carimbo vermelho (hanko) como elemento-assinatura recorrente. Isso comunica disciplina, tradição e valor — a herança japonesa do jiu-jitsu — e é o que faz o site parecer *diferente* sem sacrificar a sobriedade institucional

Elegante, institucional, confiável — mas caloroso o suficiente para não parecer corporação distante de quem pratica o esporte.

---

## 2. Paleta e tipografia — extraídas de `references/Logo goetten jiu jitsu.pdf`

A Goetten Jiu Jitsu **já tem** identidade visual definida, e ela está no arquivo de referência. Este design system **não inventa cores nem tipografia** — parte diretamente do que está documentado abaixo.

### 2.1 Paleta (obrigatória, não é placeholder)

- **Preto** — `#030303` no vetor oficial. Decisão de implementação: o preto de **produção** é `#0A0A0A`, ligeiramente mais claro, para dar profundidade às superfícies empilhadas sobre ele; o `#030303` da marca fica reservado ao lockup e ao footer, onde o logo precisa assentar sem emenda visível.
- **Branco** — `#FFFFFF`. Cor do monograma, do wordmark e do texto principal sobre fundo preto.
- **Vermelho de destaque** — `#EC1C24`, lido do vetor oficial. Usado no corte diagonal do monograma e na linha divisória.
  - **Restrição descoberta na medição:** este vermelho é claro demais para carregar texto. Branco sobre ele dá 4.41:1 e preto dá 4.49:1 — ambos abaixo do mínimo AA (4.5:1). Por isso o sistema tem **dois vermelhos**: `--color-red` (`#EC1C24`) para grafismo, e `--color-red-ink` (`#E71B23`, 2% mais escuro e visualmente idêntico) para superfícies preenchidas que carregam texto — botão primário, badge, hanko, seleção.

Essa é a paleta inteira da marca: **preto, branco e vermelho**. Qualquer cor adicional (feedback de erro/sucesso, tons neutros intermediários para superfícies e bordas) deve ser derivada matematicamente dessas três — nunca introduzida por gosto pessoal.

**Regras de uso:**

1. Vermelho é **cor de destaque/ação**, não de fundo extenso nem de texto corrido longo — ele marca CTAs, divisores, badges, ênfase pontual, do mesmo jeito que marca o corte diagonal do monograma.
2. Fundo preto é o padrão para seções de alto impacto (hero, prova social, conquistas); fundo branco entra em seções de leitura mais longa (conteúdo institucional, formulário) para não cansar a leitura. Documente qual seção do sitemap usa qual fundo.
3. Para **cada** par cor-de-texto × cor-de-fundo usado no site, informe o **ratio de contraste calculado** e o veredito **AA / AAA / decorativo-apenas**. Sem "provavelmente passa" — calcule. Branco sobre preto e preto sobre branco já passam com folga (~21:1); o ponto de atenção real é qualquer uso de vermelho como cor de texto — calcule antes de aprovar.
4. Texto sobre botão preenchido em vermelho: teste branco e preto e documente qual passa no cálculo de contraste — nunca por suposição.

### 2.2 Tipografia

O wordmark oficial ("GOETTEN BRAZILIAN JIU-JITSU") usa uma fonte **condensada, bold, geométrica, com cortes angulares** nas letras — estética de esporte de combate/automobilismo, não uma sans-serif institucional neutra. Ao implementar:

1. Se o arquivo da fonte original (`.otf`/`.ttf`) existir ou puder ser identificado a partir do vetor, use-o para o wordmark e para títulos de grande impacto (H1 do hero, números de estatística).
2. Se o arquivo da fonte não estiver disponível, use uma substituta gratuita fiel ao mesmo espírito — condensada, bold, geométrica — como **Oswald** ou **Anton** (Google Fonts, self-hostável para manter zero dependência de CDN se preferir) para títulos, e declare explicitamente que é uma substituta, não a fonte oficial.
3. Para o corpo de texto (parágrafos, formulário, textos longos), **não** use a fonte condensada de impacto — ela não foi desenhada para leitura longa. Escolha uma sans-serif legível e neutra que combine sem competir com o wordmark (ex: Inter, Manrope, ou similar), e documente o motivo do pareamento.
4. Documente a escala completa (seção 3.4) usando essa dupla: condensada/geométrica para títulos e elementos de impacto (números, CTAs, headers de seção), sans-serif legível para corpo — nunca a condensada em blocos de texto corrido.

---

## 3. Estrutura do arquivo entregue

`docs/design_system.html`, nesta ordem, com navegação lateral/sticky ancorada em cada seção e indicador de seção ativa:

### 3.1 Hero — a primeira dobra

Não é uma capa com um título solto. É uma **prévia funcional do hero real do site**, seguindo a dobra 1 já definida no `BRIEFING.md`:

- Declaração de posicionamento forte, em português, que sustenta ao mesmo tempo a causa social e a excelência esportiva
- **Dois CTAs lado a lado, com peso visual equivalente**: "Seja Patrocinador" e "Conheça as Aulas" — nenhum dos dois pode parecer secundário
- Entrada com revelação de texto (fade + leve deslocamento, ou palavra-a-palavra se o peso de JS valer a pena) — sóbria, sem exagero cinematográfico
- Fundo preto (base da marca), com o vermelho de destaque usado com parcimônia — ex: um corte diagonal, uma linha divisória, um detalhe no CTA — ecoando o corte do monograma. Pode combinar com textura leve ou fotografia de tapete/treino com overlay escuro
- Deve funcionar em mobile sem travar scroll, e respeitar `prefers-reduced-motion`

Ao final da seção, inclua um bloco "Anatomia do hero": lista em texto (elemento → gatilho → propriedades animadas → duração → easing) e o snippet de código correspondente.

### 3.2 Fundação — tokens

Todos os tokens como custom properties CSS em `:root`, mostrados numa tabela **token → valor → onde usar → exemplo renderizado ao lado**:

- **Cor** (ver 3.3)
- **Espaçamento**: escala nomeada, base 4px ou 8px — declare qual
- **Escala fluida**: como `clamp()` é construído (min, preferido em `vw`, max) e a regra para gerá-lo
- **Grid & layout**: larguras de container, gutters, breakpoints (padrão mobile / tablet / desktop / wide — declare os valores exatos escolhidos), colunas por breakpoint
- **Raios de borda**, **espessuras de borda**
- **Elevação**: sombras — documente cada nível e a cor de sombra escolhida a partir da paleta real
- **Motion tokens**: durações nomeadas (`--dur-instant/fast/base/slow`), curvas de easing nomeadas com `cubic-bezier` exato, escala de stagger
- **Escala de z-index** nomeada
- **Opacidade**: os degraus usados e o que cada um significa semanticamente

### 3.3 Cor — especificação completa

Ver seção 2 para o processo de extração. Para **cada** cor do sistema: nome do token, HEX + RGB + HSL, variantes de opacidade, papel semântico e regras de uso contextual (text / background / border / hover / active / focus / disabled / selected) — com o ratio de contraste e o veredito AA/AAA de cada combinação válida. Inclua também: paleta de feedback (success / warning / error / info) harmonizada com a marca, cor de seleção de texto, cor de foco visível.

### 3.4 Tipografia — especificação completa

- Famílias: primária, fallback stack completo, mono (se houver, para dados institucionais como CNPJ)
- Estratégia de carregamento: local vs CDN, `font-display`, `preconnect`/`preload`, e o que acontece antes da fonte carregar (evitar layout shift)
- Escala completa **h1 → h6**, `body-lg / body / body-sm`, `caption`, `label`, `helper`, `overline`, `quote`
- Para **cada** papel de texto: `font-family`, `font-weight` numérico, `font-size` (com `clamp()` fluido), `line-height`, `letter-spacing`, medida de linha máxima, e uma amostra renderizada em português com acentuação real
- Regras de pareamento entre as famílias escolhidas, e o que nunca fazer
- Detalhes finos: `text-wrap: balance` em títulos, algarismos tabulares em números de impacto/conquistas, tratamento de aspas e travessões em português

### 3.5 Componentes de UI — com animações

Para **cada** componente: anatomia, variantes, **todos os estados** (default / hover / active / focus-visible / disabled / loading / error / empty), tokens consumidos, comportamento responsivo, notas de acessibilidade (roles, ARIA, ordem de foco, alvo de toque ≥ 44px), a animação de entrada/interação com duração + easing exatos, exemplo ao vivo interativo e o snippet de código (HTML + CSS + JS) copiável logo abaixo.

Componentes obrigatórios, alinhados ao sitemap do `BRIEFING.md`:

- **Buttons** (primary / secondary / ghost / link, + tamanhos) — incluindo o par de CTAs do hero
- **Inputs** (text, textarea, select, checkbox, radio, com label, helper, erro) — para o formulário de contato/patrocínio
- **Cards**: card de professor/equipe, card de conquista/atleta, card de nível de patrocínio, card de depoimento
- **Tabela de níveis de patrocínio** (Apoiador / Parceiro / Patrocinador Oficial, ver `BRIEFING.md` seção 7) — comparação clara de benefícios lado a lado
- **Blocos de estatística** (números de impacto: anos de atuação, alunos atendidos, conquistas)
- **Navbar** (desktop + menu mobile, estado no topo vs. scrolled)
- **Section header** (título de seção, numeração/ornamento opcional, divisor)
- **Badges** (ex: nível de patrocínio, faixa/graduação se aplicável)
- **Marquee/strip de logos de patrocinadores e parceiros** — rolagem contínua e discreta
- **Acordeão** (ex: dúvidas frequentes sobre matrícula ou patrocínio)
- **Botão/link de WhatsApp** como alternativa ao formulário de contato
- **Footer institucional** (dados da associação, CNPJ, redes sociais, links do sitemap)

Se um padrão de nomenclatura de classes ainda não existir no projeto, adote BEM e declare a convenção aqui; se o `style.css` real do site já existir com outro padrão, siga o dele e documente o mapeamento.

### 3.6 Ícones

Sistema de ícones definido, não uma coleção aleatória: fonte/biblioteca (ou SVGs autorais inline), grid (16/20/24), espessura de traço, alinhamento óptico com o texto, tamanhos, cor herdada via `currentColor`, e a grade completa dos ícones do site renderizada. Priorize ícones que sirvam ao conteúdo real do site: faixa/graduação, medalha/troféu, escudo, aperto de mãos (patrocínio), família, calendário/horário, localização, WhatsApp, Instagram, documento/transparência.

### 3.7 Animações e movimento

- **Princípios de movimento** em 4–6 regras, coerentes com a "economia de gesto" descrita na seção 1.0 — vale para o jiu-jitsu de verdade, não é metáfora emprestada
- Catálogo de animações: nome, o que faz, propriedades animadas (só `transform`/`opacity` sempre que possível), duração, easing, delay/stagger, gatilho, e um botão "replay" para cada uma ao vivo
- Padrões de scroll: revelação de seções, contadores de números de impacto, transição entre seções — sóbrios, sem exagero cinematográfico (o público inclui patrocinadores corporativos avaliando seriedade institucional)
- Micro-interações: hover, press, focus, transições de estado, loading do formulário
- **Performance**: `will-change` com parcimônia, evitar propriedades que causam layout, orçamento de 60fps, o que desligar em mobile
- **`prefers-reduced-motion`**: alternativa declarada para cada animação do catálogo

### 3.8 Fundos de seção

Cada seção do site precisa de um tratamento de fundo alinhado à paleta preto/branco/vermelho (seção 2): alternância entre seções em fundo preto (alto impacto: hero, conquistas, patrocínio) e fundo branco (leitura longa: institucional, formulário), gradiente sutil dentro dessa paleta, textura leve, ou fotografia com overlay escuro (ex: foto de tatame/treino em seções de conquistas). Documente cada variante como token/classe reutilizável, com custo de performance estimado e fallback estático.

### 3.9 Padrões transversais

Fecha o documento: acessibilidade (foco visível, contraste, navegação por teclado, `alt` em todas as fotos — especialmente relevante com fotos reais de alunos —, hierarquia de headings, `prefers-reduced-motion`), responsividade (mobile-first, o que colapsa, o que desaparece), estados de página (loading, vazio, erro, 404), do's & don'ts com exemplo visual **errado ao lado do certo**, e um changelog/versionamento do sistema.

---

## 4. Requisitos técnicos do arquivo

1. **Auto-contido**: um `.html`, CSS e JS inline, salvo fontes e eventual GSAP via CDN. Nenhum asset local pesado
2. **Todo exemplo é ao vivo** — nunca uma captura de tela ou uma caixa de cor estática onde poderia haver o componente real
3. **Todo exemplo tem código copiável** ao lado/abaixo, com botão "copiar"
4. Navegação sticky com seção ativa destacada; funciona com teclado
5. Português (PT-BR) em toda a documentação e em todo o conteúdo do site (única língua do projeto, ver `BRIEFING.md` seção 5); nomes de token e classes em inglês
6. Sem `console` errors. Sem scroll horizontal em nenhum breakpoint
7. Responsivo de 320px a 2560px — teste os breakpoints
8. Cada decisão relevante vem acompanhada de **uma frase de racional** ("por que assim, e não do outro jeito")

---

## 5. Anti-padrões — não faça

- Fugir da paleta preto/branco/vermelho definida em `references/Logo goetten jiu jitsu.pdf`, ou introduzir tons "corporativos suavizados" (azuis institucionais, pastéis, cinzas frios) para tentar parecer mais "confiável" — a confiança vem da execução, não de abandonar a identidade de combate
- Estimar o hex do vermelho "de olho" em vez de extrair do arquivo vetorial original
- Usar a fonte condensada/geométrica de impacto em blocos de texto corrido
- Introduzir Three.js, qualquer elemento 3D, framework CSS (Tailwind, Bootstrap), bundler ou qualquer dependência que não conste na seção 0
- Animar `width`, `height`, `top`, `left` onde `transform` resolve
- Documentar componente sem estado de foco e sem estado de erro
- Tratar a seção de patrocínio como apêndice — ela é tão central quanto a seção da escola e a do projeto social
- Mencionar benefício fiscal de forma vaga ou genérica — a associação já tem o enquadramento confirmado (Lei 11.438/2006, ver `BRIEFING.md` seção 3); trate isso como fato, com precisão, não como promessa
- Excesso de ousadia estética que comprometa a leitura de patrocinadores corporativos avaliando seriedade institucional
- "Contraste provavelmente OK" — calcule o ratio
- Um hero bonito parado sem os dois CTAs com peso equivalente
- Entregar um sistema genérico que ignore a dupla natureza institucional/comunitária do projeto

---

## 6. Checklist de aceitação (verifique item por item antes de entregar)

- [ ] Paleta preto/branco/vermelho aplicada conforme extraída de `references/Logo goetten jiu jitsu.pdf`, com o hex do vermelho conferido no arquivo original (não estimado)
- [ ] Tipografia condensada/geométrica de impacto usada em títulos e números, sans-serif legível usada em corpo de texto, pareamento justificado
- [ ] Identidade de academia de luta preservada nas seções institucionais/patrocínio — nenhuma seção "amaciada" a ponto de perder a energia da marca
- [ ] Hero com declaração de posicionamento, os dois CTAs ("Seja Patrocinador" / "Conheça as Aulas") com peso visual equivalente, fallback mobile e reduced-motion
- [ ] Bloco "Anatomia do hero" com lista de propriedades e snippet
- [ ] Todos os tokens da seção 3.2 declarados em `:root` e tabelados
- [ ] Cada cor com HEX + RGB + HSL, papel semântico e ratios de contraste calculados
- [ ] h1–h6 + todos os papéis de texto com as propriedades especificadas e amostra renderizada em português
- [ ] Todos os componentes da seção 3.5 documentados, cada um com anatomia, variantes, todos os estados, animação, exemplo ao vivo e snippet
- [ ] Tabela de níveis de patrocínio com todos os benefícios lado a lado
- [ ] Grade de ícones renderizada + regra de criação
- [ ] Catálogo de animações com replay individual
- [ ] Alternativa reduced-motion declarada para cada animação
- [ ] Variantes de fundo de seção documentadas com fallback
- [ ] Do's & don'ts com par errado/certo
- [ ] Nota "referência → como foi reimplementado" para cada técnica trazida de referências externas
- [ ] Menção ao mecanismo fiscal (Lei 11.438/2006) tratada com precisão factual, não genérica
- [ ] Zero erro de console, zero scroll horizontal, 320px–2560px OK

---

## 7. Ao final, reporte

Um resumo curto contendo: as decisões de design que você tomou e por quê; como o sistema equilibra o tom institucional (patrocinador) com o tom acolhedor (aluno/família) sem contradição; o que foi extraído da identidade visual real vs. o que ficou como placeholder e precisa ser revisitado; os hex de texto escolhidos e seus contrastes calculados; o que das referências externas foi replicado e como; qualquer item do checklist que ficou incompleto e o motivo; e as 3 próximas evoluções que você recomenda para o sistema.
