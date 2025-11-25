import './Hero.css'

function Hero({ scrollToSection }) {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <div className="hero-avatar">
          <img 
            src="https://scontent-dfw5-2.xx.fbcdn.net/v/t1.6435-9/66262397_100211571298174_1657509595574173696_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=t9cBEPRHCncQ7kNvwFllNfW&_nc_oc=AdkPe8-zQhLCRKCxTw9dHq_YfmNnDo8Yg06Rc-tQRA1GzhOah3obrawJU_OKqDzdGSk&_nc_zt=23&_nc_ht=scontent-dfw5-2.xx&_nc_gid=gRHmqlzVWVJ2IqVq3GiUoA&oh=00_AfjmIAOgo9jDXE9nxvcGrxzdCF2m0tNXXIqzAFmGtlRJ3A&oe=694C75ED" 
            alt="J. Kyle Berry"
            className="avatar-image"
          />
        </div>
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

