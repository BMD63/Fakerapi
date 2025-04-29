import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.scss'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
    <App />
  </React.StrictMode>,
)
