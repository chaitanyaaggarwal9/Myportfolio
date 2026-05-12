const QA = {
  'what type of pm are you': "I'm a 0→1 builder — I thrive in ambiguity, love starting from scratch, and I ship fast without cutting corners. I've launched 6 products across AI, FinTech, and EdTech. I'm equally comfortable talking to a user on a construction site and presenting a roadmap to a CXO. Engineering background + product brain = I understand what I'm asking engineers to build.",
  'biggest product win': "Reducing $1.8M in NPAs annually at Savax by building a B2B payment automation platform from zero. We went from manual, fragmented vendor workflows to full automation — 0→1 in under 6 months. That's the kind of problem I live for: messy, high-stakes, nobody's built the right solution yet.",
  'how do you prioritize features': "RICE scoring as the framework — Reach × Impact × Confidence ÷ Effort. But honestly, the best prioritization happens in user interviews, not spreadsheets. I ask: 'If we shipped nothing else this quarter, what would hurt users the most?' Then I cross-check with business OKRs. At Savax, that question led us to tackle onboarding drop-off before any new features — best decision we made.",
  'are you open to work': "Yes, actively. I'm looking for Senior PM or PM roles at AI-first companies, SaaS platforms, or FinTech startups. Based in Washington DC — open to remote or hybrid. If you're building something where 0→1 experience, AI knowledge, and a builder's mindset matter, let's talk. chaitanyaaggarwal9@gmail.com",
  'tell me about finwise': "Finwise is my baby — an AI-powered personal finance coach I built end-to-end. The problem: finance apps show you data but never tell you what to do with it. I did 15+ user interviews, built the product in React + Firebase with Gemini API, validated with 50+ real financial scenarios, and shipped a production-ready MVP. It's live at finwise.tech. Ask me about any part of the build.",
  'how do you work with engineers': "I write clear PRDs that answer the 'why' before the 'what.' I join standups, I shield the team from scope creep, and I never throw requirements over a wall. I've been an engineer — I know what it's like to get a vague ticket with a tight deadline. At MyEdMaster I managed 30+ engineers using Agile rituals and improved delivery velocity by 25%. Respect the craft, communicate clearly, remove blockers fast.",
  'what is your ai experience': "Deep and hands-on. I'm an AI/LLM Analyst at Handshake AI — designing evaluation prompts, detecting hallucinations, reducing bias at scale, and improving model alignment. I built Finwise on Gemini API. I evaluate AI systems, not just use them. In 2026, every PM needs to understand how LLMs fail — I do.",
  'what roles are you targeting': "Senior PM or PM roles at companies building with AI, in FinTech, EdTech, or SaaS. I'm especially excited about 0→1 opportunities or platform roles where I can shape product direction. Company size: 50–2000 people. I want a seat at the table, not just a backlog to manage.",
  'how do you handle stakeholder conflict': "I don't avoid it — I bring data. When the CEO wants one thing and users want another, I make the user's voice undeniable through research and metrics, then I find the business goal underneath the CEO's request. Most conflicts are really just misaligned definitions of success. At Savax I navigated CXO-level disagreements by presenting KPI frameworks that aligned both sides. Conflict is just a prioritization problem.",
  'what is your approach to user research': "Talk to real users before writing a single line of a PRD. I use structured interviews, usability testing, and journey mapping — but I also do observational research. At PKA I went to 50+ construction sites. At Savax I sat with vendor relationship managers. At GWU I interviewed students. The insight you get from watching someone use your product is worth 100 survey responses.",
  'tell me about savax': "Savax Credit Solutions — I was PM for 3 years building their B2B vendor payment SaaS platform. The problem was real: vendors missing payments, NPAs piling up, manual workflows everywhere. I defined the product vision, led engineering and data teams, implemented SAFe Agile, and owned the roadmap end-to-end. Result: $1.8M NPAs reduced annually, +25% enterprise upsells, -30% onboarding time, 40% NPS improvement. All while maintaining zero compliance issues.",
  'tell me about mygwu': "The MyGWU mobile app — 10,000 GWU students were juggling 5 different tools to manage one campus life. I led cross-functional delivery with IT, design, and QA teams. Sprint planning, backlog grooming, iterative user testing. We unified schedule syncing, campus alerts, and email into one app. University-wide launch, 10K+ students onboarded. It taught me how to manage delivery at scale with multiple stakeholders and zero margin for error.",
  'what is your education': "Master of Science in Engineering Management (STEM) from George Washington University, graduated May 2025. Focus on product + systems thinking, tech strategy, and delivery. Before that, Bachelor of Technology in Mechanical Engineering from Sharda University. The engineering foundation is why I think in systems — and why engineers trust me.",
  'what tools do you use': "For product: Jira, Confluence, Aha!, Productboard. For design: Figma, Sketch. For analytics: Amplitude, Mixpanel, Google Analytics, Tableau. For data: SQL, Power BI, Google Data Studio. For building: React, Firebase, REST APIs, Gemini API. For AI evaluation: structured prompt design frameworks, hallucination detection protocols. I use what the job needs — not what's on trend.",
  'how do you measure success': "By outcomes, not outputs. I shipped X features is an output. User retention went up 15% is an outcome. I set success criteria before any sprint starts — what does 'done' actually mean for the user and the business? At Savax that meant zero compliance issues and measurable NPA reduction. At MyEdMaster it's delivery velocity and MVP quality. Metrics without empathy are just numbers.",
  'walk me through your resume': "8+ years across four industries. Started as a Mechanical Engineer, moved into Business Analyst / Product Owner at PKA Constructions where I built my first SaaS product from scratch (90% adoption). Then PM at Savax for 3 years — that's where the big enterprise impact happened ($1.8M, 25% upsells). MS at GWU while working as Technical Support at the university and co-launching MyGWU. Now I'm PM at MyEdMaster, AI/LLM Analyst at Handshake AI, and building Finwise. The through-line: I build things that work.",
  'default': "Great question! I'd love to dig into that properly — let's hop on a 30-min call. Book one at calendly.com/chaitanyaaggarwal9/30min or email me at chaitanyaaggarwal9@gmail.com. I usually respond within a few hours."
};

function findAnswer(q) {
  const ql = q.toLowerCase().trim();
  for (const key of Object.keys(QA)) {
    if (key === 'default') continue;
    const words = key.split(' ');
    const matches = words.filter(w => w.length > 3 && ql.includes(w));
    if (matches.length >= 2) return QA[key];
  }
  if (ql.includes('finwise') || ql.includes('finance')) return QA['tell me about finwise'];
  if (ql.includes('savax') || ql.includes('payment') || ql.includes('npa')) return QA['tell me about savax'];
  if (ql.includes('gw') || ql.includes('university') || ql.includes('student')) return QA['tell me about mygwu'];
  if (ql.includes('open') || ql.includes('available') || ql.includes('hire') || ql.includes('job')) return QA['are you open to work'];
  if (ql.includes('ai') || ql.includes('llm') || ql.includes('gpt') || ql.includes('gemini')) return QA['what is your ai experience'];
  if (ql.includes('tool') || ql.includes('jira') || ql.includes('figma') || ql.includes('stack')) return QA['what tools do you use'];
  if (ql.includes('priorit')) return QA['how do you prioritize features'];
  if (ql.includes('engineer') || ql.includes('dev') || ql.includes('team')) return QA['how do you work with engineers'];
  if (ql.includes('research') || ql.includes('user') || ql.includes('interview')) return QA['what is your approach to user research'];
  if (ql.includes('success') || ql.includes('metric') || ql.includes('measure') || ql.includes('kpi')) return QA['how do you measure success'];
  if (ql.includes('hello') || ql.includes('hi') || ql.includes('hey')) return "Hey! Good to meet you. I'm Chaitanya — PM, AI specialist, and founder. What would you like to know?";
  if (ql.includes('thank')) return "Happy to help! If you'd like to chat more, book a 30-min call at calendly.com/chaitanyaaggarwal9/30min 🙌";
  return QA['default'];
}

function addMessage(text, sender) {
  const msgs = document.getElementById('chat-messages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.style.cssText = 'display:flex;gap:0.6rem;align-items:flex-start;' + (sender === 'user' ? 'flex-direction:row-reverse;' : '');

  const avatar = document.createElement('div');
  avatar.style.cssText = `width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:700;flex-shrink:0;background:${sender === 'user' ? '#0d0d0d' : '#e63946'};color:#fff;`;
  avatar.textContent = sender === 'user' ? 'You' : 'CA';

  const bubble = document.createElement('div');
  bubble.style.cssText = `padding:0.75rem 1rem;max-width:85%;font-size:0.875rem;line-height:1.6;${sender === 'user' ? 'background:#0d0d0d;color:#fff;border-radius:10px 0 10px 10px;' : 'background:#fff;border:1px solid var(--cream-border);border-radius:0 10px 10px 10px;color:#2d2d2d;'}`;
  bubble.textContent = text;

  div.appendChild(avatar);
  div.appendChild(bubble);
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = document.getElementById('chat-messages');
  if (!msgs) return null;
  const div = document.createElement('div');
  div.id = 'typing-indicator';
  div.style.cssText = 'display:flex;gap:0.6rem;align-items:flex-start;';
  div.innerHTML = `
    <div style="width:28px;height:28px;border-radius:50%;background:#e63946;display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:700;color:#fff;flex-shrink:0;">CA</div>
    <div style="background:#fff;border:1px solid var(--cream-border);border-radius:0 10px 10px 10px;padding:0.75rem 1rem;">
      <div style="display:flex;gap:4px;align-items:center;">
        <span style="width:6px;height:6px;background:#aaa;border-radius:50%;animation:bounce 1s infinite;"></span>
        <span style="width:6px;height:6px;background:#aaa;border-radius:50%;animation:bounce 1s 0.15s infinite;"></span>
        <span style="width:6px;height:6px;background:#aaa;border-radius:50%;animation:bounce 1s 0.3s infinite;"></span>
      </div>
    </div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function askBot(q) {
  addMessage(q, 'user');
  const typing = showTyping();
  setTimeout(() => {
    if (typing) typing.remove();
    addMessage(findAnswer(q), 'bot');
  }, 900);
}

function sendChat() {
  const input = document.getElementById('chat-input');
  if (!input) return;
  const q = input.value.trim();
  if (!q) return;
  input.value = '';
  askBot(q);
}

// Add bounce keyframe for typing dots
const style = document.createElement('style');
style.textContent = '@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}';
document.head.appendChild(style);
