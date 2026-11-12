(function () {
  const $ = (id) => document.getElementById(id);
  const screens = ["intro", "quiz", "result"];
  let current = 0;
  let answers = []; // index 0-3 per question

  function show(name) {
    screens.forEach((s) => ($(s).hidden = s !== name));
    window.scrollTo(0, 0);
  }

  function renderQuestion() {
    const item = QUESTIONS[current];
    const counter = $("counter");
    counter.textContent = String(current + 1).padStart(2, "0");
    const total = document.createElement("small");
    total.textContent = " / " + QUESTIONS.length;
    counter.appendChild(total);
    counter.setAttribute("aria-label", "Question " + (current + 1) + " of " + QUESTIONS.length);
    const bar = $("bar");
    bar.innerHTML = "";
    QUESTIONS.forEach((_, n) => {
      const seg = document.createElement("i");
      if (n <= current) seg.className = "done";
      bar.appendChild(seg);
    });
    $("question").textContent = item.q;
    $("back").hidden = current === 0;

    const box = $("options");
    box.innerHTML = "";
    item.a.forEach((text, i) => {
      const b = document.createElement("button");
      b.className = "option" + (answers[current] === i ? " selected" : "");
      const letter = document.createElement("span");
      letter.className = "letter";
      letter.textContent = "ABCD"[i];
      const label = document.createElement("span");
      label.textContent = text;
      b.append(letter, label);
      b.addEventListener("click", () => choose(i));
      box.appendChild(b);
    });
    $("question").focus({ preventScroll: true });
  }

  function choose(i) {
    answers[current] = i;
    if (current < QUESTIONS.length - 1) {
      current++;
      renderQuestion();
    } else {
      finish();
    }
  }

  function score() {
    const totals = { strategic: 0, innovation: 0, impact: 0, visionary: 0 };
    answers.forEach((i) => totals[ORDER[i]]++);
    const top = Math.max(...Object.values(totals));
    const tied = ORDER.filter((k) => totals[k] === top);
    // Tie-break: among tied archetypes, the one chosen most recently wins.
    let winner = tied[0];
    for (let n = answers.length - 1; n >= 0; n--) {
      if (tied.includes(ORDER[answers[n]])) { winner = ORDER[answers[n]]; break; }
    }
    return { totals, winner };
  }

  function fillList(id, items) {
    const ul = $(id);
    ul.innerHTML = "";
    items.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      ul.appendChild(li);
    });
  }

  function finish() {
    const { totals, winner } = score();
    const a = ARCHETYPES[winner];
    document.body.dataset.type = winner;
    $("r-name").textContent = a.name;
    $("r-tagline").textContent = a.tagline;
    $("r-desc").textContent = a.desc;
    fillList("r-strengths", a.strengths);
    fillList("r-careers", a.careers);
    $("r-sauder").textContent = a.sauder;

    const mix = $("r-mix");
    mix.innerHTML = "";
    ORDER.slice().sort((x, y) => totals[y] - totals[x]).forEach((k) => {
      const pct = Math.round((totals[k] / QUESTIONS.length) * 100);
      const row = document.createElement("div");
      row.className = "mix-row";
      row.dataset.type = k;
      const name = document.createElement("span");
      name.className = "mix-name";
      name.textContent = ARCHETYPES[k].name;
      const track = document.createElement("span");
      track.className = "mix-track";
      const fill = document.createElement("span");
      fill.className = "mix-fill";
      track.appendChild(fill);
      const num = document.createElement("span");
      num.className = "mix-num";
      num.textContent = pct + "%";
      row.append(name, track, num);
      mix.appendChild(row);
      requestAnimationFrame(() => requestAnimationFrame(() => (fill.style.width = pct + "%")));
    });

    show("result");
    $("r-name").focus({ preventScroll: true });
    submit(totals, a.name);
  }

  // Sends the response to Netlify Forms. Fails silently when not on Netlify.
  function submit(totals, name) {
    const data = new URLSearchParams({
      "form-name": "quiz-results",
      archetype: name,
      answers: answers.map((i) => "ABCD"[i]).join("")
    });
    ORDER.forEach((k) => data.append(ARCHETYPES[k].field, totals[k]));
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data.toString()
    }).catch(() => {});
  }

  function restart() {
    current = 0;
    answers = [];
    delete document.body.dataset.type;
    renderQuestion();
    show("quiz");
  }

  $("start").addEventListener("click", restart);
  $("retake").addEventListener("click", restart);
  $("back").addEventListener("click", () => {
    if (current > 0) { current--; renderQuestion(); }
  });
  $("share").addEventListener("click", async () => {
    const text = "I got " + $("r-name").textContent + " on the Entrepreneurial DNA Quiz. What's yours?";
    const url = location.href.split("#")[0];
    const btn = $("share");
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, text, url });
      } else {
        await navigator.clipboard.writeText(text + " " + url);
        btn.textContent = "Link copied!";
        setTimeout(() => (btn.textContent = "Share my result"), 2000);
      }
    } catch (e) { /* share cancelled */ }
  });
})();
