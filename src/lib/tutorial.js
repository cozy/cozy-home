import { introJs } from 'intro.js'
import isMobile from 'ismobilejs'
import { shouldEnableTracking, getTracker } from 'cozy-ui/react/helpers/tracker'
require('../../node_modules/intro.js/minified/introjs.min.css')

export function isTutorial () {
  return window.location.hash.endsWith('/?intro')
}

export function display (t) {
  const isSmall = document.querySelectorAll('.coz-nav')[0].offsetParent === null
  const isLandscape = window.innerWidth > window.innerHeight
  const cozyBarMenuClass = isSmall ? '.coz-bar-burger' : '[data-icon=icon-cube]'
  const cozyBarMenuButton = document.querySelectorAll(cozyBarMenuClass)[0]
  const tooltipClass = 'tooltip' + (isSmall ? 'Small' : '') + (isSmall && isLandscape ? 'Right' : 'Bottom')
  const shouldTrackTutorial = shouldEnableTracking()
  const trackerInstance = getTracker()
  const pageURLsForTracking = [
    'tutorial/automate',
    'tutorial/apps'
  ]
  const tutorial = introJs()
  tutorial.setOptions({
    overlayOpacity: 0.7,
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
        element: document.querySelectorAll('.item-wrapper')[0],
        intro: `<h1>${t('tutorial.cozy_collect.title')}</h1><div>${t('tutorial.cozy_collect.text')}</div>`,
        tooltipClass: tooltipClass,
        position: isSmall && isLandscape ? 'right' : 'bottom'
      },
      {
        element: cozyBarMenuButton,
        intro: `<h1>${t('tutorial.menu_apps.title')}</h1><div>${t('tutorial.menu_apps.text')}</div>`,
        tooltipClass: isSmall ? 'tooltipCenter' : 'tooltipLeft',
        position: isSmall ? 'right' : 'bottom'
      }
    ]
  })
  .onafterchange((targetElement) => {
    if (shouldTrackTutorial && trackerInstance) {
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
    cozyBarMenuButton.click()
    window.location.hash = '#/discovery'
  })
  .start()
  if (isMobile.phone) {
    const clickZone = '.introjs-disableInteraction, .introjs-overlay, .introjs-tooltiptext, .introjs-tooltipbuttons'
    const clickAction = (e) => {
      if (e.srcElement.tagName !== 'A') {
        e.stopPropagation()
        tutorial.nextStep()
      }
    }
    for (const elem of document.querySelectorAll(clickZone)) {
      elem.onclick = clickAction
    }
  }
}
