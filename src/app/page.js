'use client'
import { useState, useMemo } from 'react'
import { PROJECTS, CATEGORIES, DIFFICULTIES } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import ProjectDetail from '../components/ProjectDetail'
import styles from './page.module.css'

export default function Home() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = useMemo(() => {
    return PROJECTS.filter(p => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      const matchCat = category === 'All' || p.category === category
      const matchDiff = difficulty === 'All' || p.difficulty === difficulty
      return matchSearch && matchCat && matchDiff
    })
  }, [search, category, difficulty])

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerTop}>
            <div>
              <h1 className={styles.logo}>🪵 WoodCraft</h1>
              <p className={styles.logoSub}>{PROJECTS.length} woodworking projects</p>
            </div>
            <button
              className={`${styles.filterToggle} ${showFilters ? styles.filterToggleActive : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              ⚙ Filters
            </button>
          </div>

          {/* Search */}
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search projects by name or category..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className={styles.clearBtn} onClick={() => setSearch('')}>✕</button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className={styles.filters}>
              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Category</span>
                <div className={styles.chips}>
                  {CATEGORIES.map(c => (
                    <button
                      key={c}
                      className={`${styles.chip} ${category === c ? styles.chipActive : ''}`}
                      onClick={() => setCategory(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Difficulty</span>
                <div className={styles.chips}>
                  {DIFFICULTIES.map(d => (
                    <button
                      key={d}
                      className={`${styles.chip} ${difficulty === d ? styles.chipActive : ''}`}
                      onClick={() => setDifficulty(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className={styles.main}>
        <div className={styles.mainInner}>
          <p className={styles.resultCount}>
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
            {(category !== 'All' || difficulty !== 'All' || search) ? ' found' : ' available'}
          </p>

          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🔍</span>
              <h3>No projects found</h3>
              <p>Try different search terms or clear your filters</p>
              <button className={styles.clearFiltersBtn} onClick={() => { setSearch(''); setCategory('All'); setDifficulty('All') }}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>🪵 WoodCraft — Learn woodworking step by step</p>
      </footer>
    </div>
  )
}
