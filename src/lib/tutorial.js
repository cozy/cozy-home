import { introJs } from 'intro.js'
import { shouldEnableTracking, getTracker } from 'cozy-ui/react/helpers/tracker'
require('../../node_modules/intro.js/minified/introjs.min.css')

export function isTutorial() {
  return window.location.pathname.endsWith('/intro')
}

export function display(t) {
  const isSmall = document.querySelectorAll('.coz-nav')[0].offsetParent === null
  const isEmptyView = !!document.querySelectorAll('[data-tutorial=empty-view]')
    .length
  const cozyBarMenuClass = isSmall
    ? '[data-tutorial=apps-mobile]'
    : '[data-tutorial=apps]'
  const cozyBarMenuButton = document.querySelectorAll(cozyBarMenuClass)[0]
  const trackerInstance = getTracker()
  const shouldTrackTutorial = shouldEnableTracking() && trackerInstance
  const pageURLsForTracking = [
    'tutorial/automate',
    'tutorial/apps',
    'tutorial/complete'
  ]
  const tutorial = introJs()
  tutorial
    .setOptions({
      overlayOpacity: 0.75,
      showBullets: false,
      hidePrev: true,
      hideNext: true,
      exitOnEsc: false,
      exitOnOverlayClick: false,
      disableInteraction: true,
      doneLabel: `${t('tutorial.menu_apps.button')}`,
      nextLabel: `${t('tutorial.cozy_collect.button')}`,
      steps: [
        {
          element: isEmptyView
            ? document.querySelectorAll('[data-tutorial=empty-view]')[0]
            : document.querySelectorAll('[data-tutorial=top-bar]')[0],
          intro: `<h1>${t('tutorial.cozy_collect.title')}</h1><div>${t(
            'tutorial.cozy_collect.text'
          )}</div>`,
          tooltipClass: isEmptyView ? 'tooltipEmptyBottom' : 'tooltipBottom',
          position: 'bottom'
        },
        {
          element: cozyBarMenuButton,
          intro: `<h1>${t('tutorial.menu_apps.title')}</h1><div>${t(
            'tutorial.menu_apps.text'
          )}</div>`,
          tooltipClass: 'tooltipApps',
          position: isSmall ? 'right' : 'bottom'
        }
      ]
    })
    .onafterchange(targetElement => {
      if (shouldTrackTutorial) {
        let stepIndex
        let steps = tutorial._options.steps
        for (let i = 0, l = steps.length; i < l; ++i) {
          if (steps[i].element === targetElement) {
            stepIndex = i
            break
          }
        }

        const trackingURL = pageURLsForTracking[stepIndex]
        trackerInstance.push(['setCustomUrl', trackingURL])
        trackerInstance.push(['trackPageView'])
      }

      // The intro.js button for the last step is hidden, so we need to show it when we arrive on it
      const doneButton = document.querySelectorAll('.introjs-donebutton')[0]
      if (!doneButton) return // step 1, no done button yet

      if (targetElement.className === cozyBarMenuButton.className) {
        doneButton.classList.remove('introjs-skipbutton')
      } else {
        doneButton.classList.add('introjs-skipbutton')
      }
    })
    .oncomplete(() => {
      if (shouldTrackTutorial) {
        trackerInstance.push([
          'setCustomUrl',
          pageURLsForTracking[pageURLsForTracking.length - 1]
        ])
        trackerInstance.push(['trackPageView'])
      }

      cozyBarMenuButton.click()
      window.location.hash = '#/connected'
    })
    .start()
  const clickZone =
    '.introjs-disableInteraction, .introjs-overlay, .introjs-tooltiptext, .introjs-tooltipbuttons'
  const clickAction = e => {
    if (e.target.tagName !== 'A') {
      e.stopPropagation()
      tutorial.nextStep()
    }
  }
  for (const elem of document.querySelectorAll(clickZone)) {
    elem.onclick = clickAction
  }
}
