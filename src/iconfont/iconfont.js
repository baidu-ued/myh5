;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-tupian" viewBox="0 0 1000 1000">' +
    '' +
    '<path d="M910.7727 46.1987H118.08589736927314c-22.6436 0-40.9999 18.3556-40.9999 41.0002V879.8534593545576c0 22.6426 18.3563 40.9982 40.9999 40.9982h792.6878505270648c22.6436 0 40.9999-18.3556 40.9999-40.9982V87.19887915992956C951.7737 64.5542 933.4173 46.1987 910.7727 46.1987zM924.4391 866.1857c0 15.0958-12.2362 27.3325-27.3326 27.3325H131.75220559724016c-15.0964 0-27.3336-12.2377-27.3336-27.3325v-765.3211122858702c0-15.0958 12.2382-27.3325 27.3336-27.3325h765.3552340711308c15.0964 0 27.3326 12.2377 27.3326 27.3325L924.4391 866.1857 924.4391 866.1857zM329.7683 221.1281c-42.9397 0-77.7496 34.8054-77.7496 77.7443 0 42.9379 34.8099 77.7493 77.7496 77.7493 42.9427 0 77.7525-34.8114 77.7525-77.7493C407.5198 255.9335 372.711 221.1281 329.7683 221.1281zM322.0002 488.7097c56.8628 0 104.4486 109.3319 150.3384 109.3319 45.8878 0 222.1817-218.6637 273.3402-218.6637 27.5525 0 108.6729 110.9897 177.671 213.4193v-45.2403270582545c-68.9981-102.4296-150.1185-213.4193-177.671-213.4193-51.1585 0-227.4523 218.6637-273.3402 218.6637-45.8898 0-93.4755-109.3319-150.3384-109.3319-33.9174 0-139.2175 92.3904-218.6719 166.9508v45.2403270582545C182.7837 581.101 288.0828 488.7097 322.0002 488.7097z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-wenben" viewBox="0 0 1000 1000">' +
    '' +
    '<path d="M810.9434 46.6084H217.89520075711772c-14.9005 0-107.8253 0-107.8253 107.8249V747.453226712289c0 107.8249 107.8253 107.8249 107.8253 107.8249H810.9434290357043c107.8253 0 107.8253-107.8249 107.8253-107.8249V154.43329422651436C918.7687 46.6084 825.791 46.6084 810.9434 46.6084zM864.8581 747.4532c0 0 0 53.9114-53.9137 53.9114H217.89520075711772c0 0-53.9107 0-53.9107-53.9114V154.43329422651436c0-53.9124 39.0111-53.9124 53.9107-53.9124H810.9434290357043c14.8465 0 53.9137 0 53.9137 53.9124V747.453226712289zM325.7195 316.1626h377.3945996400293v-53.90845007085196H325.7195166678826V316.1626417289078zM325.7195 477.899h377.3945996400293v-53.91244736068945H325.7195166678826V477.89898448851676zM325.7195 639.6283h377.3945996400293v-53.90745074839259H325.7195166678826V639.6283319909102z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)