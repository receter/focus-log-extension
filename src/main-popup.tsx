import "@sys42/components/base.css"
import "@sys42/components/default-custom-properties.css"
import React from 'react'
import ReactDOM from 'react-dom/client'
import Popup from './Popup'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
)
