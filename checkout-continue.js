(function () {
    "use strict";
  
    var FORM_SELECTOR = "#order-form";
    var BUTTON_SELECTOR = "#submit-btn";   // Send Order Request
  
    var form = document.querySelector(FORM_SELECTOR);
    var button = document.querySelector(BUTTON_SELECTOR);
    if (!form || !button) return;
  
    var armed = false;   // true after the first click
  
    function isField(el) {
      return !!(el && el.closest && el.closest("input, textarea, select"));
    }
  
    form.addEventListener("focusin", function (e) {
      if (isField(e.target)) armed = false;
    });
  
    document.addEventListener("click", function (e) {
      var hit = e.target && e.target.closest && e.target.closest(BUTTON_SELECTOR);
      if (!hit || hit.disabled) return;
      if (armed) return;
  
      e.preventDefault();
      e.stopImmediatePropagation();
      armed = true;
      var active = document.activeElement;
      if (active && active !== document.body && active.blur) active.blur();
    }, true);
  })();
