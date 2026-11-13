(function () {
  const $ = (id) => document.getElementById(id);
  const screens = ["intro", "quiz", "result"];
  const METRES_PER_QUESTION = 400; // 10 questions = 4,000 m to the sea floor
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;
  let answers = []; // index 0-3 per question
  let shownDepth = 0;
  let depthTimer = null;
  let busy = false; // true while a transition is playing

  function show(name) {
    screens.forEach((s) => ($(s).hidden = s !== name));
    window.scrollTo(0, 0);
  }

  // ----- Animation helpers -----

  // Slides `el` out, runs `update`, then slides the new content in.
  // dir 1 = going deeper (content drifts up), -1 = going back up.
  function swap(el, dir, update) {
    if (reduce) { update(); busy = false; return; }
    busy = true;
    const out = dir > 0 ? "out-up" : "out-down";
    el.classList.remove("in-up", "in-down");
    el.classList.add(out);
    setTimeout(() => {
      update();
      el.classList.remove(out);
      el.classList.add(dir > 0 ? "in-up" : "in-down");
      busy = false;
    }, 220);
  }

  // Text resolves out of scrambled DNA bases (A, T, G, C), left to right.
  function decode(el, text) {
    el.setAttribute("aria-label", text);
    clearInterval(el._decode);
    if (reduce) { el.textContent = text; return; }
    const start = performance.now();
    const step = () => {
      const done = Math.floor(((performance.now() - start) / 900) * text.length);
      el.textContent = text.split("").map((ch, i) => {
        if (i < done || ch === " ") return ch;
        const base = "ATGC"[(Math.random() * 4) | 0];
        return ch === ch.toLowerCase() ? base.toLowerCase() : base;
      }).join("");
      if (done >= text.length) { clearInterval(el._decode); el.textContent = text; }
    };
    step();
    el._decode = setInterval(step, 50);
  }

  // Drifting specks and a few fish silhouettes. They rush past when you descend.
  const sea = (function () {
    const canvas = $("sea");
    const ctx = canvas.getContext("2d");
    const FISH = ["..##....", ".####..#", "########", ".####..#", "..##...."];
    const specks = Array.from({ length: 44 }, () => ({
      x: Math.random(), y: Math.random(),
      size: Math.random() < 0.3 ? 3 : 2,
      speed: 0.004 + Math.random() * 0.012,
      alpha: 0.1 + Math.random() * 0.28
    }));
    const fish = Array.from({ length: 3 }, (_, n) => ({
      x: Math.random(), y: 0.25 + n * 0.25 + Math.random() * 0.1,
      dir: n % 2 ? 1 : -1,
      speed: 0.012 + Math.random() * 0.014,
      scale: 2 + n
    }));
    let w = 0, h = 0, rush = 0, last = 0, time = 0;
    let surface = 0.72; // waterline on the start screen, as a fraction of screen height
    let dived = false;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      w = innerWidth; h = innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(0);
    }

    function draw(dt) {
      ctx.clearRect(0, 0, w, h);
      time += dt;
      rush *= Math.pow(0.012, dt); // eases back to a slow drift

      // Waterline: sky above, darker water below. Leaves the top of the screen on the dive.
      if (dived && surface > -0.1) surface -= (rush + 1.1) * dt;
      const top = Math.max(0, surface) * h;
      if (surface > -0.05) {
        for (let x = 0; x < w; x += 4) {
          const wave = Math.sin(x * 0.018 + time * 1.2) * 1.5 + Math.sin(x * 0.007 - time * 0.7) * 1.5;
          const y = Math.round(surface * h) + Math.round(wave) * 2;
          ctx.fillStyle = "rgba(3, 8, 20, .4)";
          ctx.fillRect(x, y, 4, h - y);
          ctx.fillStyle = "rgba(150, 185, 240, .5)";
          ctx.fillRect(x, y, 4, 2);
        }
      } else {
        ctx.fillStyle = "rgba(3, 8, 20, .4)";
        ctx.fillRect(0, 0, w, h);
      }
      const tint = document.body.dataset.type
        ? getComputedStyle(document.body).getPropertyValue("--accent") : "#89a3d6";

      ctx.fillStyle = "#c9d8f5";
      specks.forEach((s) => {
        s.y -= (s.speed + rush) * dt;
        if (s.y < -0.02) { s.y += 1.04; s.x = Math.random(); }
        if (s.y > 1.02) { s.y -= 1.04; s.x = Math.random(); }
        if (s.y * h < top + 8) return; // nothing drifts above the waterline
        ctx.globalAlpha = s.alpha;
        ctx.fillRect(Math.round(s.x * w), Math.round(s.y * h), s.size, s.size);
      });

      ctx.fillStyle = tint;
      ctx.globalAlpha = 0.2;
      fish.forEach((f) => {
        f.x += f.dir * f.speed * dt;
        f.y -= rush * 0.7 * dt;
        if (f.x < -0.1 || f.x > 1.1) { f.dir *= -1; f.y = 0.15 + Math.random() * 0.75; }
        if (f.y < -0.1) f.y += 1.2;
        if (f.y > 1.1) f.y -= 1.2;
        const px = Math.round(f.x * w), py = Math.round(f.y * h);
        if (py < top + 8) return;
        FISH.forEach((row, r) => {
          for (let c = 0; c < row.length; c++) {
            if (row[c] !== "#") continue;
            const col = f.dir < 0 ? c : row.length - 1 - c; // face the way it swims
            ctx.fillRect(px + col * f.scale, py + r * f.scale, f.scale, f.scale);
          }
        });
      });
      ctx.globalAlpha = 1;
    }

    function frame(now) {
      draw(Math.min(0.05, (now - last) / 1000));
      last = now;
      requestAnimationFrame(frame);
    }

    addEventListener("resize", resize);
    resize();
    if (!reduce) requestAnimationFrame((now) => { last = now; frame(now); });

    return {
      rush: (dir) => { rush = dir * 1.5; },
      dive: () => { dived = true; if (reduce) { surface = -1; draw(0); } }
    };
  })();

  // ----- Dive: background and depth gauge -----
  function zoneFor(m) {
    if (m < 200) return "Sunlight zone";
    if (m < 1000) return "Twilight zone";
    return "Midnight zone";
  }

  function setDepth(step) {
    document.body.style.setProperty("--p", step / QUESTIONS.length);
    const target = step * METRES_PER_QUESTION;
    $("zone").textContent = zoneFor(target);
    cancelAnimationFrame(depthTimer);
    const from = shownDepth;
    const start = performance.now();
    (function tick(now) {
      const t = reduce ? 1 : Math.min(1, (now - start) / 900);
      shownDepth = Math.round(from + (target - from) * (1 - Math.pow(1 - t, 3)));
      $("depth").textContent = shownDepth.toLocaleString("en-CA");
      if (t < 1) depthTimer = requestAnimationFrame(tick);
    })(start);
  }

  // ----- Quiz -----
  function renderQuestion() {
    const item = QUESTIONS[current];
    $("counter").textContent =
      String(current + 1).padStart(2, "0") + " / " + QUESTIONS.length;
    $("counter").setAttribute("aria-label", "Question " + (current + 1) + " of " + QUESTIONS.length);
    $("bar").style.width = ((current + 1) / QUESTIONS.length) * 100 + "%";
    setDepth(current);
    $("question").textContent = item.q;
    $("back").hidden = current === 0;

    const box = $("options");
    box.innerHTML = "";
    item.a.forEach((text, i) => {
      const b = document.createElement("button");
      b.className = "option" + (answers[current] === i ? " selected" : "");
      b.style.setProperty("--i", i);
      const letter = document.createElement("span");
      letter.className = "letter";
      letter.textContent = "ABCD"[i];
      const label = document.createElement("span");
      label.textContent = text;
      b.append(letter, label);
      b.addEventListener("click", () => choose(i, b));
      box.appendChild(b);
    });
    $("question").focus({ preventScroll: true });
  }

  function choose(i, button) {
    if (busy) return;
    busy = true;
    answers[current] = i;
    document.querySelectorAll(".option").forEach((o) => o.classList.remove("selected"));
    button.classList.add("selected", "picked");
    // Brief pause so the pick registers before sinking to the next question.
    setTimeout(() => {
      sea.rush(1);
      if (current < QUESTIONS.length - 1) {
        current++;
        swap($("stage"), 1, renderQuestion);
      } else {
        swap($("app"), 1, finish);
      }
    }, reduce ? 0 : 180);
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

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  // Fills a <dl> with [term, description] pairs.
  function fillRows(id, pairs) {
    const dl = $(id);
    dl.innerHTML = "";
    pairs.forEach(([term, text]) => {
      const row = el("div", "row");
      row.append(el("dt", "", term), el("dd", "", text));
      dl.appendChild(row);
    });
  }

  function fillCourses(courses) {
    const box = $("r-courses");
    box.innerHTML = "";
    courses.forEach((c, n) => {
      const card = el("article", "panel course");
      const why = el("p", "why");
      why.append(el("b", "", "Why it suits you: "), c.why);
      card.append(
        el("p", "label", String(n + 1).padStart(2, "0") + " · " + c.code),
        el("h4", "", c.title),
        el("p", "tag", c.tag),
        el("p", "", c.desc),
        why
      );
      box.appendChild(card);
    });
  }

  function finish() {
    const { totals, winner } = score();
    const a = ARCHETYPES[winner];
    document.body.dataset.type = winner;
    setDepth(QUESTIONS.length);
    $("r-quote").textContent = a.quote;
    $("r-summary").textContent = a.summary;
    $("r-strengths-intro").textContent = a.strengthsIntro;
    fillRows("r-strengths", a.strengths);
    fillRows("r-careers", a.careers);
    fillCourses(a.courses);

    const mix = $("r-mix");
    mix.innerHTML = "";
    ORDER.slice().sort((x, y) => totals[y] - totals[x]).forEach((k, n) => {
      const pct = Math.round((totals[k] / QUESTIONS.length) * 100);
      const row = document.createElement("div");
      row.className = "mix-row";
      row.dataset.type = k;
      const name = document.createElement("span");
      name.className = "mix-name";
      name.textContent = ARCHETYPES[k].short;
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
      // Bars fill one after another once the section has appeared.
      setTimeout(() => (fill.style.width = pct + "%"), reduce ? 0 : 700 + n * 120);
    });

    show("result");
    decode($("r-name"), a.name);
    $("r-name").focus({ preventScroll: true });
    submit(totals, a.short);
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

  function restart(dir) {
    if (busy) return;
    sea.rush(dir);
    sea.dive();
    swap($("app"), dir, () => {
      current = 0;
      answers = [];
      delete document.body.dataset.type;
      renderQuestion();
      show("quiz");
    });
  }

  decode($("title"), "Entrepreneurial DNA");
  $("start").addEventListener("click", () => restart(1));
  $("retake").addEventListener("click", () => restart(-1)); // back up to the surface
  $("back").addEventListener("click", () => {
    if (busy || current === 0) return;
    current--;
    sea.rush(-1);
    swap($("stage"), -1, renderQuestion);
  });
  // Keyboard: A-D or 1-4 picks an answer.
  addEventListener("keydown", (e) => {
    if ($("quiz").hidden || e.ctrlKey || e.metaKey || e.altKey) return;
    const i = "abcd".indexOf(e.key.toLowerCase()) >= 0 ? "abcd".indexOf(e.key.toLowerCase()) : "1234".indexOf(e.key);
    const option = document.querySelectorAll(".option")[i];
    if (option) option.click();
  });

  $("share").addEventListener("click", async () => {
    const text = "I got " + $("r-name").getAttribute("aria-label") + " on the Entrepreneurial DNA Quiz. What's yours?";
    const url = location.href.split("#")[0];
    const btn = $("share");
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, text, url });
      } else {
        await navigator.clipboard.writeText(text + " " + url);
        btn.textContent = "Link copied!";
        setTimeout(() => (btn.textContent = "Share result"), 2000);
      }
    } catch (e) { /* share cancelled */ }
  });
})();
