'use client'
import styles from './ProjectCard.module.css'

const DIFFICULTY_COLORS = {
  Beginner:     { bg: '#d1fae5', text: '#065f46' },
  Intermediate: { bg: '#fef3c7', text: '#92400e' },
  Advanced:     { bg: '#fee2e2', text: '#991b1b' },
}

export default function ProjectCard({ project, onClick }) {
  const diff = DIFFICULTY_COLORS[project.difficulty]

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageWrap}>
        <img src={project.thumbnail} alt={project.title} className={styles.image} />
        <span className={styles.category}>{project.category}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{project.title}</h3>
          <span className={styles.diffBadge} style={{ background: diff.bg, color: diff.text }}>
            {project.difficulty}
          </span>
        </div>
        <div className={styles.meta}>
          <span>⭐ {project.rating} ({project.reviews})</span>
          <span className={styles.dot}>·</span>
          <span>🕐 {project.time}</span>
          <span className={styles.dot}>·</span>
          <span>{project.steps.length} steps</span>
        </div>
        <p className={styles.desc}>{project.description}</p>
        <button className={styles.btn}>View Tutorial →</button>
      </div>
    </div>
  )
}
