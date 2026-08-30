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
