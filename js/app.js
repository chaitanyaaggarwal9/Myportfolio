const cases = {
  aigym: {
    sector: "Product Manager / Live Product",
    title: "AI Gym Coach",
    summary: "0 to 1 AI fitness-coaching product (web + mobile) taken from concept to public beta in 9 months, now live with real users.",
    problem: "Generic fitness apps gave workouts, not coaching — users did not know what to do next or why.",
    action: "Led market and competitive research plus customer interviews, translated findings into PRDs and roadmap decisions, ran agile delivery across a 30+ person cross-functional team.",
    result: "Public beta live in under 9 months, now at 10K+ MAU, delivery velocity up 25%, MVP hit in under 6 months.",
    impact: "10K+",
    link: "https://www.myaigymcoach.com/"
  },
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
    sector: "FinTech / B2B SaaS / Program Manager",
    title: "Savax Credit",
    summary: "Vendor payment automation platform for a high-stakes B2B credit workflow with manual processes and limited visibility.",
    problem: "Vendors missed payments, manual workflows slowed teams, and NPAs were climbing YoY.",
    action: "Led market and competitive research with KPI-driven prioritization, evaluated pricing strategy against cost and revenue forecasts, drafted audit-ready product requirements.",
    result: "$1.8M NPA reduction (20% YoY), 25% enterprise upsell lift, 30% onboarding reduction, and zero compliance issues across quarterly audits.",
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

function initBoot() {
  const boot = document.getElementById("boot");
  const stream = document.getElementById("boot-stream");
  if (!boot || !stream) return;

  const lines = [
    "loading product judgment...",
    "spinning up turbine core...",
    "indexing shipped products...",
    "forming neural pathways...",
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
  initReveal();
  initCounters();
  initMissionTabs();
  initTilt();
  initMagneticButtons();
});
