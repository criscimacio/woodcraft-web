'use client'
import { useState } from 'react'
import styles from './ProjectDetail.module.css'

const DIFFICULTY_COLORS = {
  Beginner:     { bg: '#d1fae5', text: '#065f46' },
  Intermediate: { bg: '#fef3c7', text: '#92400e' },
  Advanced:     { bg: '#fee2e2', text: '#991b1b' },
}

export default function ProjectDetail({ project, onBack }) {
  const [activeTab, setActiveTab] = useState('steps')
  const [currentStep, setCurrentStep] = useState(0)
  const diff = DIFFICULTY_COLORS[project.difficulty]
  const total = project.steps.length
  const step = project.steps[currentStep]
  const progress = Math.round(((currentStep + 1) / total) * 100)

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <button className={styles.backBtn} onClick={onBack}>
            ← Back to Projects
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.inner}>

          {/* Project header */}
          <div className={styles.projectHeader}>
            <h1 className={styles.projectTitle}>{project.title}</h1>
            <div className={styles.metaRow}>
              <span className={styles.diffBadge} style={{ background: diff.bg, color: diff.text }}>
                {project.difficulty}
              </span>
              <span className={styles.metaItem}>⭐ {project.rating} ({project.reviews} reviews)</span>
              <span className={styles.metaItem}>🕐 {project.time}</span>
              <span className={styles.metaItem}>📋 {project.steps.length} steps</span>
            </div>
            <p className={styles.projectDesc}>{project.description}</p>
          </div>

          {/* Tabs */}
          <div className={styles.tabBar}>
            {['steps', 'materials', 'tools'].map(tab => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'steps' && '📋 '}
                {tab === 'materials' && '🪵 '}
                {tab === 'tools' && '🔧 '}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Steps Tab */}
          {activeTab === 'steps' && (
            <div className={styles.stepsTab}>
              <div className={styles.stepLayout}>

                {/* Step image */}
                <div className={styles.stepImageWrap}>
                  <img src={step.image} alt={step.title} className={styles.stepImage} />
                  <div className={styles.stepBadge}>Step {currentStep + 1} of {total}</div>
                </div>

                {/* Step info */}
                <div className={styles.stepInfo}>
                  {/* Progress */}
                  <div className={styles.progressWrap}>
                    <div className={styles.progressTrack}>
                      <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                    </div>
                    <span className={styles.progressPct}>{progress}%</span>
                  </div>

                  {/* Step dots */}
                  <div className={styles.dots}>
                    {project.steps.map((_, i) => (
                      <button
                        key={i}
                        className={`${styles.dot} ${i === currentStep ? styles.dotActive : ''} ${i < currentStep ? styles.dotDone : ''}`}
                        onClick={() => setCurrentStep(i)}
                        title={`Step ${i + 1}: ${project.steps[i].title}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  {/* Step content */}
                  <h2 className={styles.stepTitle}>{step.title}</h2>
                  <p className={styles.stepDesc}>{step.description}</p>

                  {/* Navigation */}
                  <div className={styles.navRow}>
                    <button
                      className={`${styles.navBtn} ${styles.navBtnOutline}`}
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                    >
                      ← Previous
                    </button>
                    <button
                      className={`${styles.navBtn} ${styles.navBtnPrimary}`}
                      onClick={() => setCurrentStep(Math.min(total - 1, currentStep + 1))}
                      disabled={currentStep === total - 1}
                    >
                      Next Step →
                    </button>
                  </div>

                  {currentStep === total - 1 && (
                    <div className={styles.completeBanner}>
                      🎉 You've reached the last step — great work!
                    </div>
                  )}
                </div>
              </div>

              {/* All steps list */}
              <div className={styles.allSteps}>
                <h3 className={styles.allStepsTitle}>All Steps</h3>
                {project.steps.map((s, i) => (
                  <button
                    key={i}
                    className={`${styles.stepRow} ${i === currentStep ? styles.stepRowActive : ''}`}
                    onClick={() => setCurrentStep(i)}
                  >
                    <div className={`${styles.stepNum} ${i === currentStep ? styles.stepNumActive : ''} ${i < currentStep ? styles.stepNumDone : ''}`}>
                      {i + 1}
                    </div>
                    <div className={styles.stepRowText}>
                      <span className={styles.stepRowTitle}>{s.title}</span>
                    </div>
                    {i === currentStep && <span className={styles.currentTag}>Current</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Materials Tab */}
          {activeTab === 'materials' && (
            <div className={styles.listTab}>
              <h2 className={styles.listTabTitle}>Materials Needed</h2>
              <p className={styles.listTabSub}>Gather these materials before you start</p>
              <div className={styles.listGrid}>
                {project.materials.map((m, i) => (
                  <div key={i} className={styles.listItem}>
                    <div className={styles.listBullet} />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tools Tab */}
          {activeTab === 'tools' && (
            <div className={styles.listTab}>
              <h2 className={styles.listTabTitle}>Tools Required</h2>
              <p className={styles.listTabSub}>Make sure you have these tools ready</p>
              <div className={styles.listGrid}>
                {project.tools.map((t, i) => (
                  <div key={i} className={styles.listItem}>
                    <span className={styles.toolEmoji}>🔧</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
