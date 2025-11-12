import './Skills.css'

function Skills() {
  const skillCategories = [
    {
      category: 'Programming Languages',
      skills: ['JavaScript', 'PHP', 'Python', 'HTML5', 'CSS3', 'SQL'],
    },
    {
      category: 'Frontend Frameworks',
      skills: ['React.js', 'Next.js', 'Vue.js', 'Tailwind CSS', 'React Hooks', 'Context API'],
    },
    {
      category: 'Backend Technologies',
      skills: ['Node.js', 'Express.js', 'Laravel', 'Yii2', 'WebSockets'],
    },
    {
      category: 'Databases',
      skills: ['MySQL', 'MongoDB', 'Redis', 'NoSQL', 'Sequelize.js', 'Mongoose.js'],
    },
    {
      category: 'DevOps & Tools',
      skills: ['Docker', 'Git', 'Jira', 'Notion', 'Confluence', 'Cypress', 'Jest', 'CI/CD'],
    },
    {
      category: 'APIs & Integration',
      skills: ['RESTful APIs', 'Google Maps API', 'FlightAware', 'AI Route Optimization'],
    },
    {
      category: 'Authentication & Security',
      skills: ['JWT', 'Passport.js', 'bCrypt.js', 'ActiveRecord', 'HIPAA Compliance'],
    },
    {
      category: 'Design Tools',
      skills: ['Adobe Photoshop', 'Illustrator', 'After Effects', 'Figma'],
    },
  ]

  return (
    <section id="skills" className="skills">
      <div className="section-content">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="category-title">{category.category}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

