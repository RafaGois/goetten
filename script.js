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

  /* --- Menu mobile ----------------------------------------- */
  var toggle = document.querySelector(".navbar__toggle");
  var menu = toggle && document.getElementById(toggle.getAttribute("aria-controls"));

  if (toggle && menu) {
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      menu.classList.toggle("is-open", open);
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
