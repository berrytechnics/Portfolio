import './Projects.css'
import techrxImage from '../assets/images/techrxrepair.png'
import figueroasImage from '../assets/images/figueroasrecreation.png'
import repairtixImage from '../assets/images/repairtix.png'

function Projects() {
  const professionalProjects = [
    {
      id: 1,
      title: 'AI-Powered Route Optimization System',
      company: 'Smartways Logistics',
      description: 'Implemented ML algorithms reducing route planning time from 2 hours to 15 minutes. Integrated Google Maps API with custom tracking algorithms for medical logistics. Built real-time dashboard serving 150+ drivers with live location updates.',
      technologies: ['Next.js', 'Node.js', 'Google Maps API', 'Machine Learning', 'WebSockets'],
      impact: 'Projected to reduce operational costs by $600,000 annually',
      proprietary: true,
    },
    {
      id: 2,
      title: 'E-commerce Platform with Custom CMS',
      company: 'Phone Doctors',
      description: 'Developed full-stack solution processing $50k+ annual revenue. Created custom CMS reducing content update time by 75%. Implemented automated email marketing system increasing conversion rate by 15%.',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Custom CMS'],
      impact: 'Processing 500+ daily transactions with 99.9% uptime',
      proprietary: true,
    },
    {
      id: 3,
      title: 'Real-time WebSocket Notification Center',
      company: 'Smartways Logistics',
      description: 'Implemented real-time WebSocket notification center for healthcare logistics platform, decreasing healthcare alert exception handling times by 85%. Deployed system serving 200+ concurrent users.',
      technologies: ['Next.js', 'WebSockets', 'Node.js', 'React', 'ShadCN UI'],
      impact: 'Enhanced engagement by 25%, reduced alert handling by 85%',
      proprietary: true,
    },
    {
      id: 4,
      title: 'Lead Generation Widget with A/B Testing',
      company: 'Phone Doctors',
      description: 'Created lead generation widget with A/B testing capabilities, generating $10,000 monthly revenue increase. Built automated inventory management system tracking 10,000+ parts and 25,000+ monthly repair tickets.',
      technologies: ['PHP', 'JavaScript', 'MySQL', 'A/B Testing'],
      impact: '$10,000 monthly recurring revenue increase',
      proprietary: true,
    },
  ]

  const clientProjects = [
    {
      id: 1,
      title: 'TechRx Repair',
      company: 'Client Project',
      description: 'Built a modern, responsive WordPress website for Tulsa\'s on-demand tech repair service. Features include service booking, quote system, protection plans, and a blog. Designed to showcase fast, reliable repair services with emphasis on customer trust and professional service.',
      technologies: ['WordPress', 'PHP', 'Responsive Design', 'E-commerce Integration'],
      website: 'https://www.techrxrepair.com/',
      image: techrxImage,
    },
    {
      id: 2,
      title: 'Figueroa\'s Recreation',
      company: 'Client Project',
      description: 'Developed a commercial playground equipment website using Astro and React. Features product galleries, quote system, and comprehensive service information. Designed for schools, parks, and community centers with focus on safety, quality, and custom solutions.',
      technologies: ['Astro', 'React', 'TypeScript', 'Responsive Design'],
      website: 'https://figueroasrecreation.pages.dev/',
      image: figueroasImage,
    },
  ]

  const products = [
    {
      id: 1,
      title: 'RepairTix',
      description: 'A comprehensive SaaS platform for repair businesses to manage operations end-to-end. Features include customer management with service history, repair ticketing with status tracking and technician assignment, professional invoicing with payment tracking, inventory management with automated reorder alerts, purchase order workflows, multi-location support with data isolation, role-based access control (Admin, Manager, Technician, Front Desk), reporting dashboards with analytics, asset tracking for devices and equipment, and inventory transfers between locations.',
      technologies: [
        'Next.js 14',
        'TypeScript',
        'Node.js',
        'Express',
        'PostgreSQL',
        'Kysely',
        'Tailwind CSS',
        'React Hook Form',
        'Zod',
        'Zustand',
        'Chart.js',
        'Docker',
        'JWT',
        'Jest',
        'Playwright'
      ],
      website: 'https://repairtix.com',
      comingSoon: true,
      image: repairtixImage,
    },
  ]

  const openSourceProjects = [
    {
      id: 1,
      title: 'Procedural Planet Generator',
      description: 'A galaxy-scale WebGL-based space game featuring procedurally generated planets. Built with TypeScript and WebGL for immersive 3D space exploration experiences.',
      technologies: ['TypeScript', 'WebGL', 'Three.js', 'Procedural Generation'],
      github: 'https://github.com/berrytechnics/procedural-planet',
    },
    {
      id: 2,
      title: 'FS Write Queue',
      description: 'A queueing system for transactional writes with Node.js filesystem package. Ensures data integrity and prevents race conditions in file operations.',
      technologies: ['JavaScript', 'Node.js', 'File System', 'Queue Management'],
      github: 'https://github.com/berrytechnics/fs-write-queue',
    },
    {
      id: 3,
      title: 'Weather Vue App',
      description: 'A Vue.js weather application that uses the browser navigator API for location detection. Provides real-time weather information based on user location.',
      technologies: ['Vue.js', 'JavaScript', 'Geolocation API', 'Weather API'],
      github: 'https://github.com/berrytechnics/weather-vue',
    },
    {
      id: 4,
      title: 'Solar System Simulation',
      description: 'Interactive solar system visualization built with JavaScript. Demonstrates 3D graphics and animation capabilities for educational and entertainment purposes.',
      technologies: ['JavaScript', '3D Graphics', 'Animation', 'WebGL'],
      github: 'https://github.com/berrytechnics/solar-system',
    },
    {
      id: 5,
      title: 'NEMA Space Tracker',
      description: 'An Arduino project implementing a star-tracker for astrophotography, built around a NEMA-17 stepper motor. Combines hardware and software for precise astronomical tracking.',
      technologies: ['C++', 'Arduino', 'Hardware Integration', 'IoT'],
      github: 'https://github.com/berrytechnics/nema-space-tracker',
    },
    {
      id: 6,
      title: 'Vegetable Planting Guide',
      description: 'A TypeScript application providing guidance for vegetable planting. Helps users plan and manage their gardening activities with data-driven recommendations.',
      technologies: ['TypeScript', 'Data Management', 'User Interface'],
      github: 'https://github.com/berrytechnics/Vegetable-Planting-Guide',
    },
  ]

  return (
    <section id="projects" className="projects">
      <div className="section-content">
        <h2 className="section-title">Featured Projects</h2>
        
        <div className="projects-section">
          <h3 className="projects-subtitle">Products</h3>
          <p className="projects-subtitle-description">
            Software products and platforms I'm building
          </p>
          <div className="projects-grid">
            {products.map((project) => (
              <div key={project.id} className={`project-card project-card-product ${project.id === 1 ? 'project-card-full-width' : ''}`}>
                {project.image && (
                  <div className="project-image-container">
                    <img src={project.image} alt={project.title} className="project-image" />
                  </div>
                )}
                <div className="project-header">
                  <div className="project-title-row">
                    <h3 className="project-title">{project.title}</h3>
                    {project.comingSoon && (
                      <span className="coming-soon-badge">Coming Soon</span>
                    )}
                  </div>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a 
                    href={project.website} 
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.comingSoon ? 'Learn More' : 'Visit Website'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="projects-section">
          <h3 className="projects-subtitle">Client Work</h3>
          <p className="projects-subtitle-description">
            Websites and applications built for clients
          </p>
          <div className="projects-grid">
            {clientProjects.map((project) => (
              <div key={project.id} className="project-card project-card-client">
                {project.image && (
                  <div className="project-image-container">
                    <img src={project.image} alt={project.title} className="project-image" />
                  </div>
                )}
                <div className="project-header">
                  <div className="project-title-row">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="client-badge">Client Work</span>
                  </div>
                  {project.company && (
                    <p className="project-company">{project.company}</p>
                  )}
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a 
                    href={project.website} 
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="projects-section">
          <h3 className="projects-subtitle">Professional Work</h3>
          <p className="projects-subtitle-description">
            Enterprise projects built for production environments with measurable business impact
          </p>
          <div className="projects-grid">
            {professionalProjects.map((project) => (
              <div key={project.id} className="project-card project-card-proprietary">
                <div className="project-header">
                  <div className="project-title-row">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="proprietary-badge">Proprietary</span>
                  </div>
                  {project.company && (
                    <p className="project-company">{project.company}</p>
                  )}
                </div>
                <p className="project-description">{project.description}</p>
                {project.impact && (
                  <div className="project-impact">
                    <strong>Impact:</strong> {project.impact}
                  </div>
                )}
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="projects-section">
          <h3 className="projects-subtitle">Open Source Projects</h3>
          <p className="projects-subtitle-description">
            Personal projects and contributions available on GitHub
          </p>
          <div className="projects-grid">
            {openSourceProjects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a 
                    href={project.github} 
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects

