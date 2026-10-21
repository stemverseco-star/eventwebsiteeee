// Hero video: ONE download. The blurred background is a canvas that copies
// every frame of the front video, so both are always perfectly in sync.
(function () {
  function start() {
    var box = document.querySelector('.video-container');
    var main = box && box.querySelector('.video-main');
    if (!main) return;

    main.muted = true;
    main.setAttribute('playsinline', '');
    main.preload = 'auto';

    // Remove the old blurred <video> if it is still in the HTML (stops its download)
    var old = box.querySelector('video.video-bg');
    if (old) { old.pause(); old.removeAttribute('src'); old.innerHTML = ''; old.load(); old.remove(); }
    if (box.querySelector('canvas.video-bg')) return;

    var canvas = document.createElement('canvas');
    canvas.className = 'video-bg';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.width = 160;
    canvas.height = 90;
    box.insertBefore(canvas, box.firstChild);
    var ctx = canvas.getContext('2d', { alpha: false });

    function draw() {
      if (main.readyState >= 2) ctx.drawImage(main, 0, 0, canvas.width, canvas.height);
    }
    function loop() {
      draw();
      if (main.requestVideoFrameCallback) main.requestVideoFrameCallback(loop);
      else requestAnimationFrame(loop);
    }
    main.addEventListener('loadedmetadata', function () {
      canvas.height = Math.round(canvas.width * main.videoHeight / main.videoWidth) || 90;
    });
    main.addEventListener('loadeddata', draw);
    loop();

    var p = main.play();
    if (p && p.catch) p.catch(function () {});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();