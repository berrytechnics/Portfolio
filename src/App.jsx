import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import './App.css'
import About from './components/About'
import BackgroundScene from './components/BackgroundScene'
import Contact from './components/Contact'
import Hero from './components/Hero'
import Navigation from './components/Navigation'
import Projects from './components/Projects'
import Skills from './components/Skills'

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="app">
      <div className="canvas-container">
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ pointerEvents: 'auto' }}
        >
          <BackgroundScene />
        </Canvas>
      </div>
      
      <Navigation 
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
      />
      
      <main className="content">
        <Hero scrollToSection={scrollToSection} />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  )
}

export default App
