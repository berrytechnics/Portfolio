import './Hero.css'

function Hero({ scrollToSection }) {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-greeting">Hi, I'm</span>
          <span className="hero-name">J. Kyle Berry</span>
          <span className="hero-role">Full-Stack Web Developer</span>
        </h1>
        <p className="hero-description">
          Dedicated Full-Stack Web Developer with 5+ years of experience building scalable
          web applications serving 1,000+ daily users and e-commerce platforms processing
          $500K+ annual revenue. Passionate about delivering innovative software solutions
          that drive measurable business results.
        </p>
        <div className="hero-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => scrollToSection('projects')}
          >
            View My Work
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => scrollToSection('contact')}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero

