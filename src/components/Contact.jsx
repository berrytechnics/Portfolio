import { SiFacebook, SiGithub, SiGmail, SiGoogle, SiGooglemaps } from '@icons-pack/react-simple-icons'
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
              <a href="mailto:berrytechnics@gmail.com" className="contact-link">
                <span className="contact-icon">
                  <SiGmail />
                </span>
                <span>berrytechnics@gmail.com</span>
              </a>
              <a href="https://github.com/berrytechnics" className="contact-link" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon">
                  <SiGithub />
                </span>
                <span>github.com/berrytechnics</span>
              </a>
              <a href="https://linkedin.com/in/jkyleberry" className="contact-link" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <title>LinkedIn</title>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.025H3.555V9h3.564v11.458zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </span>
                <span>linkedin.com/in/jkyleberry</span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61584237034859" className="contact-link" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon">
                  <SiFacebook />
                </span>
                <span>Facebook</span>
              </a>
              <a href="https://share.google/0sAB5RZpFURogQzDS" className="contact-link" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon">
                  <SiGoogle />
                </span>
                <span>Google Profile</span>
              </a>
              <div className="contact-location">
                <span className="contact-icon">
                  <SiGooglemaps />
                </span>
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

