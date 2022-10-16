import { BrowserRouter } from 'react-router-dom'
import { Header } from './components/Header'
import { BlogContextProvider } from './context/BlogContext'
import { Router } from './Router'

import './styles/global.css'

export function App() {
  return (
    <BlogContextProvider>
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </BlogContextProvider>
  )
}
