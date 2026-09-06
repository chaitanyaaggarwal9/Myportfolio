(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var hamburger = document.getElementById("hamburger");
  var mobileNav = document.getElementById("mobile-nav");

  function closeMobileNav() {
    hamburger.classList.remove("is-active");
    mobileNav.classList.remove("is-active");
    hamburger.setAttribute("aria-expanded", "false");
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", function () {
      var isOpen = hamburger.classList.toggle("is-active");
      mobileNav.classList.toggle("is-active", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileNav);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealTargets.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Timeline progress ---------- */
  var timelineProgress = document.getElementById("timeline-progress");
  var timeline = document.querySelector(".timeline");
  var ticking = false;

  function updateTimelineProgress() {
    ticking = false;
    if (!timelineProgress || !timeline) return;
    var rect = timeline.getBoundingClientRect();
    var vh = window.innerHeight;
    var scrolled = vh / 2 - rect.top;
    var pct = Math.min(100, Math.max(0, (scrolled / rect.height) * 100));
    timelineProgress.style.setProperty("--timeline-progress", pct + "%");
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateTimelineProgress);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  updateTimelineProgress();

  /* ---------- Avatar: gesture sprites (namaste on load, wave on mousemove, dance on click) ---------- */
  var avatarStage = document.getElementById("avatar-stage");
  var heroHint = document.getElementById("hero-hint");
  if (avatarStage) {
    var avatarMask = avatarStage.parentElement;
    var layers = [document.getElementById("avatar-layer-a"), document.getElementById("avatar-layer-b")];
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // namaste/hi are motion-interpolated (ffmpeg minterpolate, optical-flow
    // in-betweening) from the original ~25-frame sprites up to 56/55 frames
    // at 60fps, which is what makes the pose changes read as fluid motion
    // instead of a flipbook. Dance keeps its original 25 frames — the same
    // interpolation introduced visible ghosting on its fast arm/leg swings,
    // so it relies on the runtime crossfade below instead.
    var GESTURES = {
      namaste: { src: "../Public/images/avatar-namaste-smooth.png", count: 56, ar: "80.44 / 187", bgSize: "5600% 387.17%", posY: "50.28%", fps: 60 },
      hi:      { src: "../Public/images/avatar-Hi-smooth.png",      count: 55, ar: "94.44 / 210", bgSize: "5500% 344.76%", posY: "47.86%", fps: 60, loops: 1 },
      dance:   { src: "../Public/images/avatar-dance-fixed.png",    count: 25, ar: "97 / 201",     bgSize: "2500% 408.46%", posY: "49.68%", fps: 30, loops: 2 }
    };

    var current = null; // "namaste" | "hi" | "dance" | null (idle)
    var rafId = null;
    var lastWaveAt = 0;
    var WAVE_COOLDOWN = 4000;
    var frontLayer = 0; // index into `layers` currently at opacity 1

    // Paints one frame onto whichever layer is hidden, then crossfades it to
    // the front — this dissolves consecutive poses into each other instead
    // of hard-cutting, which is what makes a low frame-count sprite (~25
    // poses) read as smooth motion rather than a flipbook.
    function paint(name, frameIndex) {
      var g = GESTURES[name];
      var back = layers[1 - frontLayer];
      // Match the crossfade length to this gesture's own frame duration so
      // each dissolve finishes right as the next one begins, instead of
      // overlapping (too fast a fade looks like a cut again; too slow and
      // consecutive fades pile up into a blur).
      back.style.transitionDuration = (1000 / g.fps) + "ms";
      back.style.setProperty("--bg-src", "url('" + g.src + "')");
      back.style.setProperty("--count", g.count);
      back.style.setProperty("--bg-size", g.bgSize);
      back.style.setProperty("--pos-y", g.posY);
      back.style.setProperty("--frame", frameIndex);
      back.classList.add("is-visible");
      layers[frontLayer].classList.remove("is-visible");
      avatarMask.style.setProperty("--ar", g.ar);
      frontLayer = 1 - frontLayer;
    }

    function goIdle() {
      current = null;
      paint("hi", 0);
    }

    function play(name, onComplete) {
      if (rafId) cancelAnimationFrame(rafId);
      var g = GESTURES[name];
      var loops = g.loops || 1;
      current = name;
      paint(name, 0);

      var frameDuration = 1000 / g.fps;
      var totalFrames = g.count * loops;
      var start = null;

      (function step(ts) {
        if (start === null) start = ts;
        var elapsed = ts - start;
        var frameIndex = Math.floor(elapsed / frameDuration);
        if (frameIndex >= totalFrames) {
          rafId = null;
          if (current === name) onComplete && onComplete();
          return;
        }
        paint(name, frameIndex % g.count);
        rafId = requestAnimationFrame(step);
      })(performance.now());
    }

    if (reduceMotion) {
      // Respect reduced-motion for the ambient greeting/wave loop, but a
      // click is a deliberate user action, so dance is still allowed.
      goIdle();
      avatarStage.addEventListener("click", function () { play("dance", goIdle); });
    } else {
      play("namaste", goIdle);

      window.addEventListener("mousemove", function () {
        if (current !== null) return;
        var now = Date.now();
        if (now - lastWaveAt < WAVE_COOLDOWN) return;
        lastWaveAt = now;
        play("hi", goIdle);
      }, { passive: true });

      avatarStage.addEventListener("click", function () { play("dance", goIdle); });
      avatarStage.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play("dance", goIdle); }
      });
    }

    if (heroHint) {
      avatarStage.addEventListener("click", function () { heroHint.style.opacity = "0"; }, { once: true });
    }

    // Tactile 3D feel: the card tilts toward the cursor (Apple-product-page
    // style) and dips slightly on press. Kept on a separate element from the
    // idle float animation above, since a running CSS animation and a
    // JS-driven inline transform fight over the same property otherwise.
    if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
      var pressed = false;
      var tiltX = 0, tiltY = 0;

      function applyTilt() {
        avatarMask.style.transform =
          "perspective(900px) rotateX(" + tiltX + "deg) rotateY(" + tiltY + "deg) scale(" + (pressed ? 0.96 : 1) + ")";
      }

      avatarStage.addEventListener("pointermove", function (e) {
        var rect = avatarMask.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        var MAX_TILT = 10;
        tiltY = px * MAX_TILT * 2;
        tiltX = -py * MAX_TILT;
        applyTilt();
      });
      avatarStage.addEventListener("pointerleave", function () {
        tiltX = 0; tiltY = 0; applyTilt();
      });
      avatarStage.addEventListener("pointerdown", function () { pressed = true; applyTilt(); });
      window.addEventListener("pointerup", function () { if (pressed) { pressed = false; applyTilt(); } });
    }
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Assistant widget ---------- */
  var trigger = document.getElementById("assistant-trigger");
  var panel = document.getElementById("assistant-panel");
  var closeBtn = document.getElementById("assistant-close");
  var messages = document.getElementById("assistant-messages");
  var quickPrompts = document.getElementById("quick-prompts");

  var answers = {
    experience: "7+ years spanning construction-site business analysis, B2B fintech SaaS product management, LLM evaluation for frontier AI labs, and now 0-to-1 AI product management.",
    building: "MyEdMaster, an AI-powered virtual fitness coaching platform. I own the product strategy and I'm building the frontend alongside a custom OpenAI-integrated backend.",
    strengths: "Turning ambiguous, 0-to-1 problems into shipped products people actually adopt, plus fluency across the full stack: PRDs, roadmaps, SQL/Python, and hands-on AI/LLM evaluation.",
    contact: "Fastest way is email: chaitanyaaggarwal9@gmail.com, or book time directly via the Calendly link in the Contact section."
  };

  function openPanel() {
    panel.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
  }

  function closePanel() {
    panel.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  }

  if (trigger && panel && closeBtn) {
    trigger.addEventListener("click", function () {
      if (panel.hidden) openPanel(); else closePanel();
    });
    closeBtn.addEventListener("click", closePanel);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panel.hidden) closePanel();
    });
    document.addEventListener("click", function (e) {
      if (!panel.hidden && !panel.contains(e.target) && e.target !== trigger && !trigger.contains(e.target)) {
        closePanel();
      }
    });
  }

  if (quickPrompts && messages) {
    quickPrompts.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-q]");
      if (!btn) return;
      var key = btn.getAttribute("data-q");
      var answer = answers[key];
      if (!answer) return;

      var userIcon = document.createElement("div");
      userIcon.className = "clip-mini";
      userIcon.setAttribute("aria-hidden", "true");
      userIcon.textContent = "🙋";
      var userBubble = document.createElement("p");
      userBubble.className = "assistant-bubble";
      userBubble.textContent = btn.textContent;

      var botIcon = document.createElement("div");
      botIcon.className = "clip-mini";
      botIcon.setAttribute("aria-hidden", "true");
      botIcon.textContent = "💬";
      var botBubble = document.createElement("p");
      botBubble.className = "assistant-bubble";
      botBubble.textContent = answer;

      messages.append(userIcon, userBubble, botIcon, botBubble);
      panel.scrollTop = panel.scrollHeight;
      btn.disabled = true;
    });
  }
})();
