/* ============================================================
   GOETTEN JIU-JITSU — comportamento do site
   Vanilla JS, sem dependências. Ver docs/design_system.html §8.

   Princípio nº 4 do sistema: "a tinta seca uma vez" — revelações
   disparam uma única vez e o observer se desconecta.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- Revelações por scroll -------------------------------
     Adiciona .is-inked quando o elemento entra na viewport.
     Sem IntersectionObserver ou com reduced-motion, tudo já
     aparece no estado final: conteúdo nunca fica escondido. */
  var revealables = document.querySelectorAll(
    ".ink-reveal, .rise, .stamp-in, .traco-draw, .stagger, .draw-path"
  );

  if ("IntersectionObserver" in window && !reduceMotion) {
    /* threshold 0, e não um valor positivo: elementos cujo estado de
       repouso tem área visível zero — o scaleX(0) do .traco-draw, por
       exemplo — nunca alcançariam um threshold > 0 e ficariam
       invisíveis para sempre. */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-inked");
        io.unobserve(entry.target);
      });
    }, { threshold: 0 });

    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("is-inked"); });
  }

  /* --- Navbar: fundo e borda ao sair do topo --------------- */
  var navbar = document.querySelector(".navbar");
  if (navbar) {
    var onScroll = function () {
      navbar.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- Menu mobile -----------------------------------------
     O painel é de tela cheia, então enquanto aberto o resto da página
     sai da árvore de acessibilidade e da ordem de Tab (inert); o scroll
     é travado por CSS (html:has(.is-open)). */
  var toggle = document.querySelector(".navbar__toggle");
  var menu = toggle && document.getElementById(toggle.getAttribute("aria-controls"));

  if (toggle && menu) {
    var iconeToggle = toggle.querySelector("use");
    var fundo = document.querySelectorAll("main, .footer, .skip-link");

    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      if (iconeToggle) iconeToggle.setAttribute("href", open ? "#i-x" : "#i-menu");
      menu.classList.toggle("is-open", open);
      fundo.forEach(function (el) { el.inert = open; });
    };

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    /* Esc fecha e devolve o foco ao botão */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });

    /* Navegar para uma âncora fecha o menu */
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });

    /* Girar o aparelho / alargar a janela até o desktop: o painel some por
       CSS, então o estado (inert, ícone) precisa acompanhar. */
    window.matchMedia("(min-width: 768px)").addEventListener("change", function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* --- Acordeão: um painel aberto por vez ------------------
     Usa <button> real, então teclado e leitor de tela já
     funcionam sem tratamento extra. */
  document.querySelectorAll("[data-accordion]").forEach(function (acc) {
    var triggers = acc.querySelectorAll(".accordion__trigger");

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var wasOpen = trigger.getAttribute("aria-expanded") === "true";

        triggers.forEach(function (other) {
          other.setAttribute("aria-expanded", "false");
          var panel = document.getElementById(other.getAttribute("aria-controls"));
          if (panel) panel.hidden = true;
        });

        if (!wasOpen) {
          trigger.setAttribute("aria-expanded", "true");
          var panel = document.getElementById(trigger.getAttribute("aria-controls"));
          if (panel) panel.hidden = false;
        }
      });
    });
  });

  /* --- Galeria expansível ----------------------------------
     Os extras carregam o atributo `hidden`: recolhidos, ficam fora da
     ordem de tabulação e da árvore de acessibilidade — não basta
     escondê-los visualmente. */
  var galeriaBotao = document.querySelector("[data-galeria-toggle]");
  if (galeriaBotao) {
    var galeria = document.getElementById(galeriaBotao.getAttribute("aria-controls"));
    var rotulo = galeriaBotao.querySelector("[data-galeria-rotulo]");
    var extras = galeria ? galeria.querySelectorAll("[data-extra]") : [];
    var icone = galeriaBotao.querySelector("use");

    galeriaBotao.addEventListener("click", function () {
      var abrindo = galeriaBotao.getAttribute("aria-expanded") !== "true";

      galeriaBotao.setAttribute("aria-expanded", String(abrindo));
      rotulo.textContent = abrindo ? "Ver menos" : "Ver mais fotos";
      if (icone) icone.setAttribute("href", abrindo ? "#i-x" : "#i-mais");

      /* Ao recolher, some conteúdo ACIMA do botão e ele salta para cima
         na tela — às vezes para fora dela. Em vez de rolar até ele depois
         (que depende de scroll suave e falha se o navegador o suspender),
         ancoramos: medimos antes e depois e corrigimos o scroll pela
         diferença, de modo que o botão não sai do lugar.
         Na expansão não se corrige nada: as fotos novas devem empurrar
         a página mesmo, senão elas entram fora da vista. */
      var antes = galeriaBotao.getBoundingClientRect().top;

      extras.forEach(function (li) { li.hidden = !abrindo; });
      galeria.classList.toggle("is-expandida", abrindo);

      if (!abrindo) {
        var depois = galeriaBotao.getBoundingClientRect().top;
        if (depois !== antes) {
          window.scrollBy({ top: depois - antes, behavior: "instant" });
        }
      }
    });
  }

  /* --- Lightbox da galeria ---------------------------------
     Cada foto vira um botão (só com JS: sem ele, um botão que não faz
     nada seria pior que a foto solta) e abre um <dialog> modal nativo.
     Setas do teclado, botões e arrastar na tela trocam de foto; o
     dialog cuida de Esc e do foco. Navega por todas as fotos, inclusive
     as que ainda estão recolhidas atrás do "Ver mais". */
  var galeriaLista = document.getElementById("galeria");
  if (galeriaLista && typeof HTMLDialogElement === "function") {
    var fotos = Array.prototype.slice.call(galeriaLista.querySelectorAll("img"));
    var atual = 0;

    var caixa = document.createElement("dialog");
    caixa.className = "lightbox";
    caixa.setAttribute("aria-label", "Foto ampliada");
    caixa.innerHTML =
      '<button type="button" class="lightbox__btn lightbox__fechar" data-lb="fechar" aria-label="Fechar">' +
        '<svg class="icon" aria-hidden="true"><use href="#i-x"/></svg></button>' +
      '<button type="button" class="lightbox__btn lightbox__ant" data-lb="ant" aria-label="Foto anterior">' +
        '<svg class="icon" aria-hidden="true"><use href="#i-seta"/></svg></button>' +
      '<figure class="lightbox__fig">' +
        '<img class="lightbox__img" alt="">' +
        '<figcaption class="lightbox__legenda" aria-live="polite"></figcaption></figure>' +
      '<button type="button" class="lightbox__btn lightbox__prox" data-lb="prox" aria-label="Próxima foto">' +
        '<svg class="icon" aria-hidden="true"><use href="#i-seta"/></svg></button>';
    document.body.appendChild(caixa);

    var fotoGrande = caixa.querySelector(".lightbox__img");
    var legenda = caixa.querySelector(".lightbox__legenda");

    var mostrar = function (i) {
      var total = fotos.length;
      atual = (i + total) % total;
      fotoGrande.src = fotos[atual].src;
      fotoGrande.alt = fotos[atual].alt;
      legenda.textContent = (atual + 1) + " / " + total;
      /* pré-carrega as vizinhas para a troca não piscar */
      [atual - 1, atual + 1].forEach(function (n) {
        new Image().src = fotos[(n + total) % total].src;
      });
    };

    fotos.forEach(function (img, i) {
      var botao = document.createElement("button");
      botao.type = "button";
      botao.className = "galeria-foto";
      botao.setAttribute("aria-label", "Ampliar foto: " + img.alt);
      img.parentNode.insertBefore(botao, img);
      botao.appendChild(img);
      botao.addEventListener("click", function () {
        mostrar(i);
        caixa.showModal();
      });
    });

    caixa.addEventListener("click", function (e) {
      var acao = e.target.closest("[data-lb]");
      if (acao) {
        var qual = acao.getAttribute("data-lb");
        if (qual === "fechar") caixa.close();
        else mostrar(atual + (qual === "prox" ? 1 : -1));
      } else if (e.target === caixa || e.target.classList.contains("lightbox__fig")) {
        caixa.close(); /* clique fora da foto */
      }
    });

    caixa.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") mostrar(atual + 1);
      else if (e.key === "ArrowLeft") mostrar(atual - 1);
    });

    var toqueX = null;
    caixa.addEventListener("touchstart", function (e) {
      toqueX = e.touches[0].clientX;
    }, { passive: true });
    caixa.addEventListener("touchend", function (e) {
      if (toqueX === null) return;
      var dx = e.changedTouches[0].clientX - toqueX;
      toqueX = null;
      if (Math.abs(dx) > 50) mostrar(atual + (dx < 0 ? 1 : -1));
    });
  }

  /* --- Carrosséis mobile ------------------------------------
     A pista horizontal é só CSS (ver "Carrossel mobile" em style.css).
     Aqui ficam as pistas de que há mais conteúdo: os traços de posição
     e as classes que esmaecem a borda com mais cards. Sem JS, a pista
     ainda desliza — só perde os indicadores. */
  var reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.querySelectorAll("[data-carrossel]").forEach(function (pista) {
    var itens = Array.prototype.slice.call(pista.children);
    var nome = pista.getAttribute("data-carrossel");
    if (itens.length < 2) return;

    var pontos = document.createElement("div");
    pontos.className = "carrossel-dots";
    pontos.setAttribute("role", "group");
    pontos.setAttribute("aria-label", nome + " — navegação");
    var botoes = itens.map(function (item, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Ir para o item " + (i + 1) + " de " + itens.length);
      b.addEventListener("click", function () {
        pista.scrollBy({
          left: item.getBoundingClientRect().left - pista.getBoundingClientRect().left - margem(),
          behavior: reduzMovimento.matches ? "auto" : "smooth"
        });
      });
      pontos.appendChild(b);
      return b;
    });
    pista.insertAdjacentElement("afterend", pontos);

    /* Onde o snap encosta o card: o scroll-padding da pista. */
    function margem() {
      return parseFloat(getComputedStyle(pista).scrollPaddingLeft) || 0;
    }

    function atualizar() {
      var max = pista.scrollWidth - pista.clientWidth;
      var x = pista.scrollLeft;
      var rolavel = max > 1;

      pista.classList.toggle("tem-ant", rolavel && x > 4);
      pista.classList.toggle("tem-prox", rolavel && x < max - 4);
      /* Pista rolável por teclado só quando de fato rola (no desktop
         ela não rola e não deve virar uma parada de Tab à toa). */
      if (rolavel) {
        pista.setAttribute("tabindex", "0");
        pista.setAttribute("aria-label", nome + " — role para o lado para ver mais");
      } else {
        pista.removeAttribute("tabindex");
        pista.removeAttribute("aria-label");
      }

      /* Ativo: o card cujo início está mais perto do alinhamento do snap;
         no fim da pista, o último (ele nunca chega a alinhar no início). */
      var esquerda = pista.getBoundingClientRect().left + margem();
      var ativo = 0, menor = Infinity;
      itens.forEach(function (item, i) {
        var d = Math.abs(item.getBoundingClientRect().left - esquerda);
        if (d < menor) { menor = d; ativo = i; }
      });
      if (rolavel && x >= max - 4) ativo = itens.length - 1;
      botoes.forEach(function (b, i) {
        if (i === ativo) b.setAttribute("aria-current", "true");
        else b.removeAttribute("aria-current");
      });
    }

    /* Um timer curto, e não requestAnimationFrame: o rAF pausa com a aba
       em segundo plano e deixaria o "já agendado" preso para sempre.
       Como atualizar() lê a posição na hora em que roda, o último evento
       de scroll sempre é coberto por uma execução posterior a ele. */
    var espera = null;
    pista.addEventListener("scroll", function () {
      if (espera) return;
      espera = setTimeout(function () { espera = null; atualizar(); }, 40);
    }, { passive: true });
    window.addEventListener("resize", atualizar);
    atualizar();
  });

  /* --- Contadores de impacto -------------------------------
     Contam de 0 ao valor uma única vez, com ease-out cúbico:
     o número "assenta" como um golpe. */
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var end = parseInt(el.dataset.count, 10);
    if (isNaN(end)) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      el.textContent = end;
      return;
    }

    var counter = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      counter.disconnect();

      var start = performance.now();
      (function tick(now) {
        var progress = Math.min((now - start) / 900, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(end * eased);
        if (progress < 1) requestAnimationFrame(tick);
      })(start);
    }, { threshold: 0.6 });

    counter.observe(el);
  });

  /* --- Formulário de contato ------------------------------
     Validação no cliente com ARIA, estado de envio e tratamento de
     falha. O formulário tem `novalidate`: as mensagens do navegador
     não são traduzíveis nem estilizáveis, então validamos aqui e
     ligamos cada erro ao seu campo por aria-describedby. */
  var form = document.querySelector("[data-form-contato]");
  if (form) {
    var status = form.querySelector("[data-form-status]");
    var botao = form.querySelector('button[type="submit"]');

    var mostrarErro = function (campo, mensagem) {
      var alvo = document.getElementById("e-" + campo.id.replace(/^f-/, ""));
      campo.setAttribute("aria-invalid", "true");
      campo.closest(".field").classList.add("field--error");
      if (!alvo) return;
      alvo.hidden = false;
      alvo.innerHTML =
        '<svg class="icon icon--sm" aria-hidden="true"><use href="#i-x"/></svg> ' + mensagem;
      campo.setAttribute("aria-describedby", alvo.id);
    };

    var limparErro = function (campo) {
      var alvo = document.getElementById("e-" + campo.id.replace(/^f-/, ""));
      campo.removeAttribute("aria-invalid");
      campo.removeAttribute("aria-describedby");
      campo.closest(".field").classList.remove("field--error");
      if (alvo) { alvo.hidden = true; alvo.textContent = ""; }
    };

    var soDigitos = function (v) { return (v || "").replace(/\D/g, ""); };

    var validar = function () {
      var erros = [];
      var nome = form.querySelector("#f-nome");
      var email = form.querySelector("#f-email");
      var cnpj = form.querySelector("#f-cnpj");

      [nome, email, cnpj].forEach(limparErro);

      if (nome.value.trim().length < 2) {
        mostrarErro(nome, "Escreva seu nome."); erros.push(nome);
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
        mostrarErro(email, "Confira o e-mail — parece incompleto."); erros.push(email);
      }
      /* CNPJ é opcional, mas se preenchido tem de ter 14 dígitos */
      if (cnpj.value.trim() && soDigitos(cnpj.value).length !== 14) {
        mostrarErro(cnpj, "CNPJ incompleto — confira os 14 dígitos."); erros.push(cnpj);
      }
      return erros;
    };

    var dizer = function (texto, tipo) {
      status.className = "form-status is-visivel form-status--" + tipo;
      status.innerHTML = texto;
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var erros = validar();
      if (erros.length) {
        dizer("Confira os campos destacados antes de enviar.", "erro");
        erros[0].focus();
        return;
      }

      status.className = "form-status";
      botao.classList.add("btn--loading");
      botao.setAttribute("aria-busy", "true");
      botao.disabled = true;

      var soltar = function () {
        botao.classList.remove("btn--loading");
        botao.removeAttribute("aria-busy");
        botao.disabled = false;
      };

      fetch(form.action, {
        method: "post",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          soltar();
          form.reset();
          dizer("Mensagem enviada. A associação responde em breve.", "ok");
        })
        .catch(function () {
          soltar();
          /* Falha nunca é beco sem saída: oferece o caminho que funciona. */
          dizer(
            'Não conseguimos enviar agora. Fale com a gente pelo ' +
            '<a href="https://wa.me/55SEUNUMERO" target="_blank" rel="noopener">WhatsApp</a>.',
            "erro"
          );
        });
    });

    /* Limpa o erro assim que a pessoa corrige o campo */
    form.querySelectorAll(".field__control").forEach(function (campo) {
      campo.addEventListener("input", function () {
        if (campo.getAttribute("aria-invalid")) limparErro(campo);
      });
    });
  }

  /* --- Formulário: assunto pré-selecionado pela URL --------
     A dobra 7 (patrocínio) linka para /#contato?assunto=patrocinio;
     aqui o <select> já chega na opção certa. */
  var assunto = new URLSearchParams(location.search).get("assunto");
  if (assunto) {
    var select = document.querySelector('[data-assunto]');
    if (select) {
      var match = Array.prototype.find.call(select.options, function (opt) {
        return opt.value === assunto;
      });
      if (match) select.value = assunto;
    }
  }
})();
