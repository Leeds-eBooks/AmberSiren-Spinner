define(function() {
  var overlay = document.getElementById('spinner-overlay') || document.createElement('div'),
      whichTransitionEvent = function whichTransitionEvent() {
        var t,
            el=document.createElement('fakeelement'),
            transitions={
                    'transition':'transitionend',
                   'OTransition':'oTransitionEnd',
                 'MozTransition':'transitionend',
              'WebkitTransition':'webkitTransitionEnd'
            };
        for (t in transitions) {
          if (el.style[t] !== undefined) {
            return transitions[t];
          }
        }
      },
      transitionEvent = whichTransitionEvent() || "transitionend";

  return {
    show: function() {
      var frag = document.createDocumentFragment(),
          div = document.getElementById('blocking-spinner') || document.createElement('div'),
          dots = [
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div')
          ];

      overlay = document.getElementById('spinner-overlay') || document.createElement('div');

      for (var i=0;i<dots.length;i++) {
        div.appendChild(dots[i]);
      }

      div.id = "blocking-spinner";
      overlay.id = "spinner-overlay";

      overlay.appendChild(div);
      frag.appendChild(overlay);
      document.body.appendChild(frag);

      window.setTimeout(function() {
        overlay.className = "overlay-show";
        for (var i=0;i<dots.length;i++) {
          dots[i].className = "go-spin";
        }
      }, 0);
    },

    hide: function() {
      function handler() {
        overlay.removeEventListener(transitionEvent, handler, false);
        overlay.parentNode.removeChild(overlay);
      }

      overlay.addEventListener(transitionEvent, handler, false);

      overlay.className = overlay.className.replace(/overlay-show/g, '');
    }
  };
});
