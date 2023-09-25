import Browser from 'webextension-polyfill'

export const actionIconDefault: Browser.Action.SetIconDetailsType = {
  path: {
    16: 'images/icon-inactive-16.png',
    32: 'images/icon-inactive-32.png',
    48: 'images/icon-inactive-48.png',
    128: 'images/icon-inactive-128.png'
  }
}

export const actionIconActive: Browser.Action.SetIconDetailsType = {
  path: {
    16: 'images/icon-16.png',
    32: 'images/icon-32.png',
    48: 'images/icon-48.png',
    128: 'images/icon-128.png'
  }
}