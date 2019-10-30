import { introJs } from 'intro.js-fix-cozy'
import { shouldEnableTracking, getTracker } from 'cozy-ui/react/helpers/tracker'

export function isTutorial() {
  return window.location.pathname.endsWith('/intro')
}

export function display(t) {
  const appsPanel = document.querySelectorAll('[data-tutorial=home-apps]')[0]
  const servicesPanel = document.querySelectorAll(
    '[data-tutorial=home-services]'
  )[0]

  for (const element in [appsPanel, servicesPanel]) {
    if (!element) throw new Error('Missing tutorial element.')
  }

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
      doneLabel: `${t('tutorial.home.services.button')}`,
      nextLabel: `${t('tutorial.home.apps.button')}`,
      steps: [
        {
          element: appsPanel,
          intro: `<h1>${t('tutorial.home.apps.title')}</h1><div>${t(
            'tutorial.home.apps.text'
          )}</div>`,
          tooltipClass: 'tooltipApps',
          position: 'bottom-middle-aligned'
        },
        {
          element: servicesPanel,
          intro: `<h1>${t('tutorial.home.services.title')}</h1><div>${t(
            'tutorial.home.services.text'
          )}</div>`,
          position: 'bottom'
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

      if (targetElement.className === servicesPanel.className) {
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

      // When a click occurs on the last tutorial button, it seems that there
      // is some kind of conflict or event capture that block the click() call
      // on cozyBarMenuButton. So we must delay a little bit this call. It is
      // really dirty and hackish and we should instead call directly a method
      // on the Cozy-Bar to show the app panel.
      setTimeout(() => servicesPanel.click(), 10)
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
