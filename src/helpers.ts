import Browser from 'webextension-polyfill'

export const actionIconDefault: Browser.Action.SetIconDetailsType = {
  path: {
    16: 'images/icon-inactive-16.png',
    24: 'images/icon-inactive-24.png',
    32: 'images/icon-inactive-32.png',
  }
}

export const actionIconActive: Browser.Action.SetIconDetailsType = {
  path: {
    16: 'images/icon-16.png',
    24: 'images/icon-24.png',
    32: 'images/icon-32.png',
  }
}