const DashboardPage = {
  template: /*html*/`
    <div class="dashboard-page">
      <h1 class="dashboard-title">Project Dashboard</h1>

      <div class="project-section">
        <h2 class="section-title">Project Title</h2>
        <p class="project-name">My Awesome Project</p>
      </div>

      <div class="stats-section">
        <h2 class="section-title">Tasks</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <p class="stat-label">Estimated</p>
            <p class="stat-value">42</p>
          </div>
          <div class="stat-card">
            <p class="stat-label">Open</p>
            <p class="stat-value">27</p>
          </div>
          <div class="stat-card">
            <p class="stat-label">Closed</p>
            <p class="stat-value">15</p>
          </div>
        </div>
      </div>

      <div class="tasks-section">
        <h2 class="section-title">My Open Tasks</h2>
        <ul class="task-list">
          <li>Design main menu</li>
          <li>Implement login system</li>
        </ul>
      </div>
    </div>
  `,
  data() {
    return {

    }
  },
  methods: {

  }
}