// Animate the storage usage meter and value over 5 seconds, then reveal the bubble
(function () {
  const DURATION_MS = 5000; // 5 seconds
  const meter = document.querySelector(".storage-meter");
  const storageInfo = document.querySelector(
    ".storage-info .text-preset-2-regular"
  );
  const storageBubble = document.querySelector(".storage-bubble");
  const storageContainer = document.getElementById("storage");

  if (!meter || !storageInfo || !storageContainer || !storageBubble) return;

  const max = Number(meter.getAttribute("max")) || 1000;
  const start = 0; // animate from 0 used
  const end = Number(meter.getAttribute("value")) || 815; // target used GB

  // Prepare initial state
  meter.value = start;
  // Update the displayed "You’ve used X GB" text
  function setUsedText(val) {
    // Replace just the numeric part inside the strong span
    const boldSpan = storageInfo.querySelector(".text-preset-2-bold");
    if (boldSpan) boldSpan.textContent = `${Math.round(val)} GB`;
  }
  setUsedText(start);

  // Move the knob along the bar using a CSS variable on the container
  function setKnob(progress) {
    // Clamp to [0,1] and convert to percentage across the bar width (minus a small padding to avoid overflow)
    const pct = Math.max(0, Math.min(1, progress)) * 100;
    storageContainer.style.setProperty("--knob-left", `${pct}%`);
  }
  setKnob(0);

  // Smooth ease-out for nicer animation
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // Respect users who prefer reduced motion
  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    meter.value = end;
    setUsedText(end);
    setKnob(end / max);
    const bubbleValue = storageBubble.querySelector(".text-preset-1");
    if (bubbleValue)
      bubbleValue.textContent = String(Math.max(0, Math.round(max - end)));
    storageBubble.classList.remove("is-hidden");
    storageBubble.classList.add("fade-in");
    storageBubble.setAttribute("aria-hidden", "false");
    return;
  }

  let rafId = null;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / DURATION_MS);
    const eased = easeOutCubic(t);
    const current = start + (end - start) * eased;

    meter.value = current;
    setUsedText(current);
    setKnob(current / max);

    if (t < 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      // End state: ensure final values are exact and reveal the bubble
      meter.value = end;
      setUsedText(end);
      setKnob(end / max);
      // Reveal the bubble only after animation completes
      const bubbleValue = storageBubble.querySelector(".text-preset-1");
      if (bubbleValue)
        bubbleValue.textContent = String(Math.max(0, Math.round(max - end)));
      storageBubble.classList.remove("is-hidden");
      storageBubble.classList.add("fade-in");
      storageBubble.setAttribute("aria-hidden", "false");
    }
  }

  // Keep bubble hidden and aria-hidden during animation
  storageBubble.classList.add("is-hidden");
  storageBubble.setAttribute("aria-hidden", "true");

  rafId = requestAnimationFrame(tick);

  // Cleanup if needed (e.g., SPA navigation)
  window.addEventListener("beforeunload", () => {
    if (rafId) cancelAnimationFrame(rafId);
  });
})();
