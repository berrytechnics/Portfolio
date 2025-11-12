import './About.css'

function About() {
  return (
    <section id="about" className="about">
      <div className="section-content">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Dedicated Full-Stack Web Developer with 5+ years of experience building scalable
              web applications serving 1,000+ daily users and e-commerce platforms processing
              $500K+ annual revenue. Proficient in JavaScript frameworks, PHP development, and
              database management with a proven track record of delivering features that
              generate $10,000+ monthly revenue increases.
            </p>
            <p>
              Skilled in contributing to technical specifications and developing innovative
              software solutions. I specialize in medical logistics, IoT, and hardware integration,
              with expertise in creating AI-powered systems that optimize operations and reduce costs.
            </p>
            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">5+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat">
                <div className="stat-number">1,000+</div>
                <div className="stat-label">Daily Users</div>
              </div>
              <div className="stat">
                <div className="stat-number">$500K+</div>
                <div className="stat-label">Annual Revenue</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

