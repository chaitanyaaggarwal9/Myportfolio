const answers = {
  intro: "Chaitanya is a mechanical engineer turned AI Product Manager. He combines systems thinking, user empathy, and hands-on execution to build products from zero to one.",
  impact: "The quick proof: an AI product serving 10K+ monthly users, $1.8M in NPA reduction, and leadership across a 30+ person team.",
  journey: "He started in mechanical engineering in 2016, moved into FinTech program leadership, earned an MS in Engineering Management, and now builds and evaluates AI products.",
  projects: "Start with AI Gym Coach for 0→1 product leadership, Savax for measurable FinTech impact, and Finwise for hands-on AI building.",
  contact: "You can email Chaitanya at chaitanyaaggarwal9@gmail.com. The big ‘Let’s talk’ button up top will get you there!"
};

function initReveal() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function initTimeline() {
  const timeline = document.querySelector(".timeline");
  if (!timeline) return;
  const update = () => {
    const rect = timeline.getBoundingClientRect();
    const distance = window.innerHeight * 0.72 - rect.top;
    const progress = Math.max(0, Math.min(1, distance / Math.max(1, rect.height - window.innerHeight * 0.25)));
    timeline.style.setProperty("--timeline-progress", `${progress * 100}%`);
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function initAssistant() {
  const trigger = document.getElementById("assistant-trigger");
  const panel = document.getElementById("assistant-panel");
  const close = document.getElementById("assistant-close");
  const bubble = document.querySelector(".assistant-bubble");
  const speak = document.getElementById("speak-button");
  if (!trigger || !panel || !close || !bubble) return;

  const open = () => {
    panel.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    close.focus();
  };
  const shut = () => {
    panel.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    window.speechSynthesis?.cancel();
    trigger.focus();
  };

  trigger.addEventListener("click", () => panel.hidden ? open() : shut());
  close.addEventListener("click", shut);
  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      bubble.textContent = answers[button.dataset.answer] || answers.intro;
    });
  });
  speak?.addEventListener("click", () => {
    if (!("speechSynthesis" in window)) {
      speak.textContent = "Voice isn’t available in this browser";
      return;
    }
    window.speechSynthesis.cancel();
    const greeting = new SpeechSynthesisUtterance("Hey there! Welcome to Chaitanya's portfolio. I can give you the quick tour.");
    greeting.rate = 1.03;
    greeting.pitch = 1.08;
    window.speechSynthesis.speak(greeting);
  });

  window.setTimeout(() => {
    if (!sessionStorage.getItem("clip-welcomed")) {
      open();
      sessionStorage.setItem("clip-welcomed", "true");
    }
  }, 1100);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  initReveal();
  initTimeline();
  initAssistant();
});
