import './Contact.css'

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="section-content">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <p className="contact-description">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your visions. Feel free to reach out!
            </p>
            <div className="contact-methods">
              <a href="mailto:kyle@berrytechnics.com" className="contact-link">
                <span className="contact-icon">✉</span>
                <span>kyle@berrytechnics.com</span>
              </a>
              <a href="https://github.com/berrytechnics" className="contact-link" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon">🔗</span>
                <span>github.com/berrytechnics</span>
              </a>
              <a href="https://linkedin.com/in/jkyleberry" className="contact-link" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon">💼</span>
                <span>linkedin.com/in/jkyleberry</span>
              </a>
              <div className="contact-location">
                <span className="contact-icon">📍</span>
                <span>Picayune, MS 39466, USA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

