import { useEffect, useState } from 'react'
import { ThemeProvider } from './theme/ThemeContext'
import { AuthProvider } from './auth/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Mentorship from './components/Mentorship'
import CourseBanner from './components/CourseBanner'
import Team from './components/Team'
import HowItWorks from './components/HowItWorks'
import Faq from './components/Faq'
import CtaBand from './components/CtaBand'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Login from './components/Login'
import Signup from './components/Signup'
import Checkout from './components/Checkout'
import Dashboard from './components/Dashboard'
import FacilitatorPage from './components/FacilitatorPage'
import Admin from './components/Admin'
import FloatingChat from './components/FloatingChat'
import './styles/navbar.css'
import './styles/hero.css'
import './styles/services.css'
import './styles/mentorship.css'
import './styles/course.css'
import './styles/team.css'
import './styles/howitworks.css'
import './styles/faq.css'
import './styles/cta.css'
import './styles/footer.css'
import './styles/login.css'
import './styles/chat.css'
import './styles/checkout.css'
import './styles/dashboard.css'
import './styles/facilitator.css'
import './styles/admin.css'
import './styles/contact.css'

type Route =
  | 'home'
  | 'login'
  | 'signup'
  | 'dashboard'
  | 'admin'
  | { checkout: string }
  | { facilitator: string }

function routeFromHash(): Route {
  const hash = window.location.hash
  if (hash === '#/login') return 'login'
  if (hash === '#/signup') return 'signup'
  if (hash === '#/dashboard') return 'dashboard'
  if (hash === '#/admin') return 'admin'
  if (hash.startsWith('#/checkout/')) {
    return { checkout: hash.slice('#/checkout/'.length) }
  }
  if (hash.startsWith('#/facilitator/')) {
    return { facilitator: hash.slice('#/facilitator/'.length) }
  }
  return 'home'
}

export default function App() {
  const [route, setRoute] = useState<Route>(routeFromHash)

  useEffect(() => {
    const onHashChange = () => setRoute(routeFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <ThemeProvider>
      <AuthProvider>
        {route === 'login' || route === 'signup' ? (
          route === 'login' ? (
            <Login />
          ) : (
            <Signup />
          )
        ) : route === 'dashboard' ? (
          <Dashboard />
        ) : route === 'admin' ? (
          <Admin />
        ) : typeof route === 'object' && 'checkout' in route ? (
          <Checkout trackId={route.checkout} />
        ) : typeof route === 'object' ? (
          <FacilitatorPage facId={route.facilitator} />
        ) : (
          <>
            <Navbar />
            <main>
              <Hero />
              <Services />
              <Mentorship />
              <CourseBanner />
              <Team />
              <HowItWorks />
              <Faq />
              <CtaBand />
              <Contact />
            </main>
            <Footer />
          </>
        )}
        <FloatingChat />
      </AuthProvider>
    </ThemeProvider>
  )
}
