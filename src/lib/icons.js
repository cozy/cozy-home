const root = document.querySelector('[role=application]')
const data = root.dataset

const domain = data.cozyDomain

const secure = window && window.location.protocol === 'https:'

export const appIconProps = {
  domain,
  secure
}
