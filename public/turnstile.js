(function () {
  "use strict";
  var loading = false;
  var pending = [];

  function apiReady() {
    loading = false;
    pending.splice(0).forEach(function (cb) {
      cb();
    });
  }

  function loadApi(cb) {
    if (window.turnstile) {
      cb();
      return;
    }
    pending.push(cb);
    if (loading) return;
    loading = true;
    var s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.addEventListener("load", apiReady);
    s.addEventListener("error", apiReady);
    document.head.appendChild(s);
  }

  function slotOf(container) {
    return container && container.querySelector
      ? container.querySelector("[data-turnstile-slot]")
      : null;
  }

  function ensure(container) {
    var slot = slotOf(container);
    if (!slot || !slot.dataset.turnstileSitekey) return;
    if (slot.dataset.widgetId || slot.dataset.renderQueued) return;
    slot.dataset.renderQueued = "1";
    loadApi(function () {
      if (!window.turnstile) {
        delete slot.dataset.renderQueued;
        return;
      }
      if (slot.dataset.widgetId) return;
      slot.dataset.widgetId = String(
        window.turnstile.render(slot, { sitekey: slot.dataset.turnstileSitekey }),
      );
    });
  }

  function getToken(container) {
    return new Promise(function (resolve) {
      var slot = slotOf(container);
      if (!slot || !slot.dataset.turnstileSitekey) {
        resolve("");
        return;
      }
      ensure(container);
      var waited = 0;
      (function poll() {
        var id = slot.dataset.widgetId;
        var token =
          id !== undefined && window.turnstile ? window.turnstile.getResponse(id) || "" : "";
        if (token) {
          if (window.turnstile) window.turnstile.reset(id);
          resolve(token);
        } else if (waited >= 8000) {
          resolve("");
        } else {
          waited += 200;
          setTimeout(poll, 200);
        }
      })();
    });
  }

  window.VyotishTurnstile = { ensure: ensure, getToken: getToken };
})();
