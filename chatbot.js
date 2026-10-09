/*
  Kaizen Health & Wellness — free FAQ chatbot.
  This is a rule/keyword-based FAQ helper, not an OpenAI-powered AI.
  Edit the answers below only after the client confirms them.
*/
(() => {
  "use strict";
  if (document.getElementById("kaizen-faq-launcher")) return;

  // Verified information currently available in the website content.
  // Do not invent prices, opening hours, or medical advice.
  const FAQS = [
    {
      keys: ["service", "services", "offer", "treatment", "program"],
      answer: "Kaizen's website lists Peptide Therapy, Hormone Optimization, Longevity Programs, Weight Management, Performance & Recovery, and Wellness Consultation. Please contact the team to confirm which services are currently available and suitable for you."
    },
    {
      keys: ["book", "booking", "appointment", "consultation", "schedule"],
      answer: "You can request a consultation using the “Book Consultation” button on this website. The current form is a demo and needs to be connected to the business's booking or email system before requests are actually sent."
    },
    {
      keys: ["phone", "call", "contact", "number", "whatsapp"],
      answer: "The website lists 0326 8666 884 as the consultation contact number. Please use the contact details on the website to confirm the best way to reach the team."
    },
    {
      keys: ["location", "address", "where", "lahore", "islamabad", "islamabad office"],
      answer: "The website lists a Lahore location at DHA 6 (Official Partner: @primal_strength_studio) and an Islamabad location at Pakland Medical Center, F8 Markaz, Islamabad. Please contact the team to confirm current availability and appointment details."
    },
    {
      keys: ["email", "mail"],
      answer: "The website lists info@kaizenwellness.pk as its contact email."
    },
    {
      keys: ["price", "prices", "fee", "fees", "cost", "charges", "how much"],
      answer: "I don't have confirmed pricing information. Please contact Kaizen Health and Wellness at 0326 8666 884 or info@kaizenwellness.pk to ask about current fees."
    },
    {
      keys: ["hours", "opening", "open", "timing", "working time", "schedule"],
      answer: "I don't have confirmed opening hours. Please contact the team at 0326 8666 884 or info@kaizenwellness.pk to confirm."
    },
    {
      keys: ["online", "virtual", "remote"],
      answer: "I don't have confirmed information about online consultations. Please contact the team to ask whether this option is available."
    },
    {
      keys: ["peptide", "peptides"],
      answer: "The website lists Peptide Therapy as a service. This chatbot cannot determine whether a treatment is appropriate for you. Please discuss treatment questions with a qualified healthcare professional at the clinic."
    },
    {
      keys: ["hormone", "hormones"],
      answer: "The website lists Hormone Optimization. For questions about testing, risks, or treatment suitability, please speak directly with a qualified healthcare professional."
    },
    {
      keys: ["weight", "weight management"],
      answer: "The website lists Weight Management. For personalised advice, please contact the clinic and speak with a qualified healthcare professional."
    },
    {
      keys: ["thank", "thanks"],
      answer: "You're welcome! Is there anything else about Kaizen's services or contact details I can help with?"
    },
    {
      keys: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
      answer: "Hello! Welcome to Kaizen Health & Wellness. You can ask me about listed services, booking, locations, or contact details."
    }
  ];

  const launcher = document.createElement("button");
  launcher.id = "kaizen-faq-launcher";
  launcher.type = "button";
  launcher.textContent = "Chat with Kaizen";
  launcher.setAttribute("aria-controls", "kaizen-faq-panel");
  launcher.setAttribute("aria-expanded", "false");

  const panel = document.createElement("section");
  panel.id = "kaizen-faq-panel";
  panel.setAttribute("aria-label", "Kaizen FAQ chatbot");
  panel.innerHTML = `
    <div id="kaizen-faq-head">
      <div><strong>Kaizen Health & Wellness</strong><small>FAQ assistant · Instant replies</small></div>
      <button id="kaizen-faq-close" type="button" aria-label="Close chat">×</button>
    </div>
    <div id="kaizen-faq-messages" role="log" aria-live="polite">
      <div class="kaizen-faq-bubble kaizen-faq-bot">Hello! I can help with general questions about our listed services, consultations, locations, and contact details. What would you like to know?</div>
    </div>
    <div id="kaizen-faq-chips">
      <button type="button" data-question="What services do you offer?">Our services</button>
      <button type="button" data-question="How do I book a consultation?">Book a consultation</button>
      <button type="button" data-question="Where are you located?">Locations</button>
      <button type="button" data-question="What are your fees?">Fees</button>
    </div>
    <form id="kaizen-faq-form">
      <input id="kaizen-faq-input" maxlength="300" autocomplete="off" required placeholder="Type your question…" aria-label="Type your question">
      <button type="submit">Send</button>
    </form>
    <p id="kaizen-faq-note">Automated FAQ only · Not medical advice</p>
  `;

  document.body.append(launcher, panel);
  const close = panel.querySelector("#kaizen-faq-close");
  const messages = panel.querySelector("#kaizen-faq-messages");
  const form = panel.querySelector("#kaizen-faq-form");
  const input = panel.querySelector("#kaizen-faq-input");

  function toggle(open) {
    panel.classList.toggle("kaizen-faq-open", open);
    launcher.setAttribute("aria-expanded", String(open));
    if (open) input.focus();
  }
  launcher.addEventListener("click", () => toggle(!panel.classList.contains("kaizen-faq-open")));
  close.addEventListener("click", () => toggle(false));

  function addBubble(text, type) {
    const bubble = document.createElement("div");
    bubble.className = `kaizen-faq-bubble kaizen-faq-${type}`;
    bubble.textContent = text; // textContent prevents user input being interpreted as HTML
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  function answerFor(raw) {
    const q = raw.toLowerCase().replace(/[^\p{L}\p{N}\s@.+-]/gu, " ");
    const matches = FAQS.map(item => ({
      item,
      score: item.keys.reduce((score, key) => score + (q.includes(key) ? key.length : 0), 0)
    })).sort((a, b) => b.score - a.score);
    if (matches[0] && matches[0].score > 0) return matches[0].item.answer;
    return "I don't have a confirmed answer to that question yet. Please contact Kaizen at 0326 8666 884 or info@kaizenwellness.pk, and the team can help. You can also ask me about services, booking, locations, or contact details.";
  }

  function submitQuestion(question) {
    const clean = question.trim();
    if (!clean) return;
    addBubble(clean, "user");
    addBubble(answerFor(clean), "bot");
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    submitQuestion(input.value);
    input.value = "";
    input.focus();
  });
  panel.querySelectorAll("[data-question]").forEach(button => {
    button.addEventListener("click", () => submitQuestion(button.dataset.question));
  });
})();
