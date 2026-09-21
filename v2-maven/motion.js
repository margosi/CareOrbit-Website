/* CareOrbit V2 motion: scroll reveals + count-up stats */
(function () {
  var eased = function (t) { return 1 - Math.pow(1 - t, 3); };
  function countUp(el) {
    if (el.__co_counted) return; el.__co_counted = true;
    var txt = el.textContent;
    var m = txt.match(/^([^0-9]*)(\d+)([\s\S]*)$/);
    if (!m) return;
    var pre = m[1], target = parseInt(m[2], 10), suf = m[3], t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / 1300);
      el.textContent = pre + Math.round(eased(p) * target) + suf;
      if (p < 1) requestAnimationFrame(step); else el.textContent = txt;
    }
    requestAnimationFrame(step);
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        if (e.target.hasAttribute('data-count')) countUp(e.target);
        e.target.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  function scan(root) {
    if (!root || !root.querySelectorAll) return;
    root.querySelectorAll('[data-rv]').forEach(function (el) { if (!el.__co_rv) { el.__co_rv = true; io.observe(el); } });
    if (root.hasAttribute && root.hasAttribute('data-rv') && !root.__co_rv) { root.__co_rv = true; io.observe(root); }
  }
  var mo = new MutationObserver(function (muts) {
    muts.forEach(function (m) { m.addedNodes.forEach(function (n) { scan(n); }); });
  });
  function init() {
    scan(document.body);
    mo.observe(document.body, { childList: true, subtree: true });
  }
  if (document.body) init(); else document.addEventListener('DOMContentLoaded', init);
})();
