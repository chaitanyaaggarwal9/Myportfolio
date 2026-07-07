const cases = {
  finwise: {
    sector: "Founder / Live Product",
    title: "Finwise",
    summary: "AI personal finance coach built end-to-end after users said finance apps showed data but did not tell them what to do next.",
    problem: "Users were drowning in charts and starving for answers.",
    action: "Ran 15+ interviews, built with React, Firebase, and Gemini API, then validated 50+ financial scenarios.",
    result: "Live MVP ready for user testing with personalized AI insights.",
    impact: "Live",
    link: "https://finwise.tech"
  },
  savax: {
    sector: "FinTech / B2B SaaS",
    title: "Savax Credit",
    summary: "A vendor payment automation platform for a high-stakes credit workflow with manual processes and limited visibility.",
    problem: "Vendors missed payments, manual workflows slowed teams, and NPAs reached $1.8M annually.",
    action: "Defined product vision, led engineering and data teams, implemented SAFe agile, and aligned CXO stakeholders.",
    result: "$1.8M annual NPA reduction, 25% enterprise upsell lift, 30% onboarding reduction, and zero compliance issues.",
    impact: "$1.8M",
    link: "#contact"
  },
  mygwu: {
    sector: "EdTech / Mobile",
    title: "MyGWU App",
    summary: "A student experience platform that unified scattered campus workflows into one mobile experience.",
    problem: "10,000 students used five different tools for schedules, email, alerts, and campus updates.",
    action: "Led cross-functional delivery with IT, design, and QA while folding user feedback into iterative releases.",
    result: "University-wide launch with 10K+ students onboarded into a unified campus experience.",
    impact: "10K+",
    link: "#contact"
  },
  pka: {
    sector: "Construction / SaaS",
    title: "PKA Labor",
    summary: "A field-first labor planning system built from site research and translated into executive visibility.",
    problem: "50 construction sites had no clear view of who was working where, causing idle labor costs.",
    action: "Observed workflows across 50+ sites, converted field pain into sprint goals, and launched real-time analytics.",
    result: "90% Q1 adoption, 50% idle labor cost reduction, and dashboards for senior leadership decisions.",
    impact: "90%",
    link: "#contact"
  }
};

const answers = [
  {
    keys: ["type", "pm", "product"],
    text: "I am a 0 to 1 product builder: strongest when the problem is ambiguous, the users are frustrated, and the team needs someone to turn noise into a shipped product."
  },
  {
    keys: ["ai", "llm", "gpt", "gemini"],
    text: "My AI experience is hands-on: LLM evaluation at Handshake AI, Gemini API product work in Finwise, prompt design, hallucination detection, and bias evaluation."
  },
  {
    keys: ["prioritize", "priority", "features", "roadmap"],
    text: "I prioritize with user pain, business impact, confidence, and effort. RICE helps, but interviews and product telemetry keep the spreadsheet honest."
  },
  {
    keys: ["engineer", "developer", "team"],
    text: "I work with engineers by clarifying the why, reducing ambiguity, protecting focus, and writing requirements that respect implementation reality."
  },
  {
    keys: ["savax", "impact", "win"],
    text: "The clearest product win was Savax: a B2B payment platform that reduced $1.8M in annual NPAs, improved upsells, shortened onboarding, and stayed compliant."
  },
  {
    keys: ["finwise", "finance"],
    text: "Finwise is an AI personal finance coach I built end-to-end with React, Firebase, and Gemini API after user interviews showed people wanted decisions, not dashboards."
  },
  {
    keys: ["contact", "hire", "available", "work"],
    text: "Yes, I am open to PM and Senior PM roles, especially AI-first, SaaS, FinTech, EdTech, or 0 to 1 teams. Email: chaitanyaaggarwal9@gmail.com."
  }
];

function initBoot() {
  const boot = document.getElementById("boot");
  const stream = document.getElementById("boot-stream");
  if (!boot || !stream) return;

  const lines = [
    "loading product judgment...",
    "mounting AI evaluation logs...",
    "indexing shipped products...",
    "syncing recruiter fast mode...",
    "system ready."
  ];

  lines.forEach((line, index) => {
    setTimeout(() => {
      const div = document.createElement("div");
      div.textContent = `> ${line}`;
      stream.appendChild(div);
    }, index * 260);
  });

  setTimeout(() => boot.classList.add("done"), 2100);
}

function initCanvas() {
  const canvas = document.getElementById("signal-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const particles = [];
  let width = 0;
  let height = 0;
  let pointer = { x: 0, y: 0, active: false };

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles.length = 0;
    const count = Math.min(90, Math.floor(width * height / 17000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(73, 215, 255, 0.58)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130) {
          ctx.globalAlpha = 1 - dist / 130;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      if (pointer.active) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 170) {
          ctx.globalAlpha = 1 - dist / 170;
          ctx.strokeStyle = "rgba(255, 59, 79, 0.45)";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        }
      }
      ctx.globalAlpha = 1;
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", event => {
    pointer = { x: event.clientX, y: event.clientY, active: true };
  });
  window.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  resize();
  draw();
}

function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal, .timeline").forEach(el => observer.observe(el));
}

function initCounters() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.dataset.done) return;
      entry.target.dataset.done = "true";
      const target = Number(entry.target.dataset.counter);
      const decimal = Number(entry.target.dataset.decimal || 0);
      const duration = 1200;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        entry.target.textContent = decimal ? value.toFixed(decimal) : Math.round(value);
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll("[data-counter]").forEach(el => observer.observe(el));
}

function initMissionTabs() {
  const tabs = document.querySelectorAll(".mission-tab");
  const ids = {
    sector: document.getElementById("mission-sector"),
    title: document.getElementById("mission-title"),
    summary: document.getElementById("mission-summary"),
    problem: document.getElementById("mission-problem"),
    action: document.getElementById("mission-action"),
    result: document.getElementById("mission-result"),
    impact: document.getElementById("mission-impact"),
    link: document.getElementById("mission-link")
  };

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const data = cases[tab.dataset.case];
      if (!data) return;
      tabs.forEach(item => item.classList.remove("active"));
      tab.classList.add("active");
      ids.sector.textContent = data.sector;
      ids.title.textContent = data.title;
      ids.summary.textContent = data.summary;
      ids.problem.textContent = data.problem;
      ids.action.textContent = data.action;
      ids.result.textContent = data.result;
      ids.impact.textContent = data.impact;
      ids.link.href = data.link;
      ids.link.textContent = data.link.startsWith("http") ? "View mission" : "Contact for details";
    });
  });
}

function findAnswer(question) {
  const q = question.toLowerCase();
  const match = answers.find(item => item.keys.some(key => q.includes(key)));
  return match ? match.text : "Strong question. The short version: I start with the user pain, define the business outcome, align the team on tradeoffs, and ship the smallest version that can teach us something real.";
}

function addTerminalLine(role, text) {
  const body = document.getElementById("terminal-body");
  if (!body) return;
  const line = document.createElement("p");
  const label = document.createElement("b");
  label.textContent = role;
  line.appendChild(label);
  line.append(document.createTextNode(text));
  body.appendChild(line);
  body.scrollTop = body.scrollHeight;
}

function initTerminal() {
  const form = document.getElementById("terminal-form");
  const input = document.getElementById("terminal-input");
  const prompts = document.getElementById("prompt-buttons");
  if (!form || !input) return;

  function ask(question) {
    const clean = question.trim();
    if (!clean) return;
    addTerminalLine("you", clean);
    input.value = "";
    setTimeout(() => addTerminalLine("agent", findAnswer(clean)), 360);
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    ask(input.value);
  });

  if (prompts) {
    prompts.addEventListener("click", event => {
      const button = event.target.closest("button[data-prompt]");
      if (button) ask(button.dataset.prompt);
    });
  }
}

function initTilt() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  document.querySelectorAll(".tilt").forEach(card => {
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 7}deg) translateY(-2px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

function initFastMode() {
  const button = document.getElementById("mode-toggle");
  if (!button) return;
  button.addEventListener("click", () => {
    document.body.classList.toggle("fast-mode");
    const on = document.body.classList.contains("fast-mode");
    button.textContent = on ? "Exit Fast Mode" : "Recruiter Fast Mode";
    if (on) document.getElementById("recruiter-panel")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function initMagneticButtons() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  document.querySelectorAll(".magnetic").forEach(button => {
    button.addEventListener("pointermove", event => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
    });
    button.addEventListener("pointerleave", () => {
      button.style.transform = "";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initBoot();
  initCanvas();
  initReveal();
  initCounters();
  initMissionTabs();
  initTerminal();
  initTilt();
  initFastMode();
  initMagneticButtons();
});
