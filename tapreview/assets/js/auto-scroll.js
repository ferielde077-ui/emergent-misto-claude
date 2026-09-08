// Auto-scroll script for the hero section.
// Behavior:
// - Reads `tapreviewAutoScroll.delay` in seconds (0 = disabled)
// - If delay > 0, after that many seconds it scrolls the page smoothly to the section immediately after the hero
// - If the user interacts (scrolls, clicks, presses keys), the auto-scroll is cancelled

(function(){
  document.addEventListener('DOMContentLoaded', function(){
    try {
      var delay = (window.tapreviewAutoScroll && window.tapreviewAutoScroll.delay) ? parseInt(window.tapreviewAutoScroll.delay,10) : 0;
      if (!delay || delay <= 0) return;

      var cancelled = false;
      var cancel = function(){ cancelled = true; window.removeEventListener('scroll', cancel); window.removeEventListener('keydown', cancel); window.removeEventListener('mousedown', cancel); };
      window.addEventListener('scroll', cancel, { passive: true });
      window.addEventListener('keydown', cancel);
      window.addEventListener('mousedown', cancel);

      setTimeout(function(){
        if (cancelled) return;
        var hero = document.querySelector('.hero-canvas-bg');
        if (!hero) hero = document.getElementById('hero');
        if (!hero) return;
        // compute bottom offset
        var rect = hero.getBoundingClientRect();
        var target = window.scrollY + rect.height;
        window.scrollTo({ top: target, behavior: 'smooth' });
      }, delay * 1000);
    } catch(e){
      console && console.error && console.error('auto-scroll error', e);
    }
  });
})();
