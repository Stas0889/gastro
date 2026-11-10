// Local candidate. Publication requires review for the actual Instatic page/revision.
(() => {
  const prefix = 'vlp-gastro758240-c41e7a';
  const checkoutUrls = new Set(["https://urbanqueen-school.com/pl/lite/widget/widget?id=1291010","https://urbanqueen-school.com/pl/lite/widget/widget?id=1221042"]);
  const videoUrls = new Set(["https://www.youtube.com/embed/kfPQy8d5wCw?rel=0","https://www.youtube.com/embed/0cFaKB9zh6g?rel=0","https://www.youtube.com/embed/KtOAgiksco0?rel=0","https://www.youtube.com/embed/a7W0OoD5NWg?rel=0","https://www.youtube.com/embed/egEhazzrWUo?rel=0","https://www.youtube.com/embed/6BNT65Jce_Y?rel=0","https://www.youtube.com/embed/xRuqfw4yEJI?rel=0","https://www.youtube.com/embed/Uq6pyxx5pgA?rel=0","https://www.youtube.com/embed/vTT3xDgBa8c?rel=0","https://www.youtube.com/embed/TwNuccumMiw?rel=0","https://www.youtube.com/embed/sX60nAFvgkk?rel=0","https://www.youtube.com/embed/nygWCkeIry8?rel=0","https://www.youtube.com/embed/mRqFMra7xKg?rel=0","https://www.youtube.com/embed/TsXiqph2IEY?rel=0"]);

  function boot() {
    const root = document.querySelector(`.${prefix}-root`);
    if (!root || root.hasAttribute(`data-${prefix}-ready`)) return;
    root.setAttribute(`data-${prefix}-ready`, 'true');
    let activeVideo = null;

    root.addEventListener('click', event => {
      if (!(event.target instanceof Element)) return;
      const launch = event.target.closest(`[data-${prefix}-dialog]`);
      if (launch) {
        const id = launch.getAttribute(`data-${prefix}-dialog`);
        const dialog = [...root.querySelectorAll('dialog')].find(item => item.id === id);
        if (!(dialog instanceof HTMLDialogElement)) return;
        const frame = dialog.querySelector('iframe');
        const url = frame?.getAttribute(`data-${prefix}-src`);
        if (!frame || !checkoutUrls.has(url)) return;
        if (!frame.hasAttribute('src')) frame.src = url;
        dialog.showModal();
        return;
      }

      const close = event.target.closest(`[data-${prefix}-close]`);
      if (close) {
        close.closest('dialog')?.close();
        return;
      }

      const step = event.target.closest(`[data-${prefix}-review-step]`);
      if (step) {
        const track = root.querySelector(`.${prefix}-reviews`);
        const direction = Number(step.getAttribute(`data-${prefix}-review-step`));
        if (!track || ![-1, 1].includes(direction)) return;
        track.scrollBy({
          left: direction * (track.clientWidth - 70),
          behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        });
        return;
      }

      const video = event.target.closest(`[data-${prefix}-video]`);
      if (!video) return;
      const url = video.getAttribute(`data-${prefix}-video`);
      if (!videoUrls.has(url)) return;
      if (activeVideo?.frame.isConnected) {
        activeVideo.frame.replaceWith(activeVideo.button);
      }
      const frame = document.createElement('iframe');
      frame.className = `${prefix}-video`;
      frame.src = `${url}&autoplay=1&playsinline=1`;
      frame.title = 'Видеоотзыв о курсе Гастрономическая революция';
      frame.allow = 'autoplay; fullscreen; picture-in-picture';
      frame.allowFullscreen = true;
      video.replaceWith(frame);
      activeVideo = { frame, button: video };
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
