const hero = document.querySelector(".home-hero");
const background = hero?.querySelector(".home-hero-bg");
const firstImage = background?.querySelector("img");

if (hero && background && firstImage) {
  const sources = [
    firstImage.getAttribute("src"),
    "/catalog/images/catalog-forged-wheels-hero.webp",
    "/catalog/images/factory-cnc.webp"
  ];
  const images = [firstImage];
  const pending = [];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const connection = navigator.connection;
  let current = 0;
  let userPaused = false;
  let inView = true;
  let timer;
  let request = 0;

  const controls = document.createElement("div");
  controls.className = "hero-slideshow-controls";
  controls.setAttribute("role", "group");
  controls.setAttribute("aria-label", "Background slideshow controls");

  function button(label, symbol, className = "") {
    const element = document.createElement("button");
    element.type = "button";
    element.className = `hero-slideshow-button ${className}`;
    element.setAttribute("aria-label", label);
    element.title = label;
    element.textContent = symbol;
    controls.append(element);
    return element;
  }

  const previous = button("Previous background image", "\u2039");
  const dots = sources.map((_, index) => {
    const dot = button(`Show background image ${index + 1}`, "", "hero-slide-dot");
    dot.addEventListener("click", () => show(index, true));
    return dot;
  });
  const next = button("Next background image", "\u203a");
  const pause = button("Pause background slideshow", "\u275a\u275a");
  firstImage.classList.add("is-active");
  hero.classList.add("is-slideshow-enhanced");
  hero.append(controls);

  function canPlay() {
    return !userPaused && !reducedMotion.matches && !connection?.saveData && inView && !document.hidden;
  }

  function sync() {
    clearTimeout(timer);
    const playing = canPlay();
    hero.classList.toggle("is-slideshow-running", playing);
    const label = userPaused ? "Play background slideshow" : "Pause background slideshow";
    pause.setAttribute("aria-label", label);
    pause.title = label;
    pause.setAttribute("aria-pressed", String(userPaused));
    pause.textContent = userPaused ? "\u25b6" : "\u275a\u275a";
    pause.hidden = reducedMotion.matches || Boolean(connection?.saveData);
    dots.forEach((dot, index) => dot.setAttribute("aria-pressed", String(index === current)));
    if (playing) timer = setTimeout(() => show((current + 1) % sources.length), 9000);
  }

  function load(index) {
    if (images[index]) return Promise.resolve(images[index]);
    if (!pending[index]) {
      const image = new Image();
      image.alt = "";
      image.setAttribute("aria-hidden", "true");
      image.width = 1600;
      image.height = 900;
      image.decoding = "async";
      image.fetchPriority = "low";
      image.src = sources[index];
      pending[index] = image.decode().then(() => {
        images[index] = image;
        background.append(image);
        // Commit the hidden state before starting the crossfade.
        image.getBoundingClientRect();
        return image;
      }).catch(() => null);
    }
    return pending[index];
  }

  async function show(index, manual = false) {
    if (manual) userPaused = true;
    clearTimeout(timer);
    const id = ++request;
    const image = await load(index);
    if (id !== request) return;
    if (image && (manual || canPlay())) {
      images[current].classList.remove("is-active");
      image.classList.add("is-active");
      current = index;
    }
    sync();
  }

  previous.addEventListener("click", () => show((current + sources.length - 1) % sources.length, true));
  next.addEventListener("click", () => show((current + 1) % sources.length, true));
  pause.addEventListener("click", () => { userPaused = !userPaused; sync(); });
  reducedMotion.addEventListener("change", sync);
  connection?.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); }, { threshold: 0 }).observe(hero);
  }
  sync();
  const warmNext = () => { if (canPlay()) load(1); };
  if ("requestIdleCallback" in window) window.requestIdleCallback(warmNext, { timeout: 2500 });
  else window.addEventListener("load", warmNext, { once: true });
}
