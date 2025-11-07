const BacklogPage = {
  template: /*html*/`
    <div class="backlog-page">
      <h1 class="page-title">Project Backlog</h1>

      <div class="backlog-columns">
        <div class="backlog-column">
          <h2 class="column-title">To Do</h2>
          <div class="task-card">Design login UI</div>
          <div class="task-card">Create database schema</div>
          <div class="task-card">Write user stories</div>
        </div>

        <div class="backlog-column">
          <h2 class="column-title">In Progress</h2>
          <div class="task-card in-progress">Implement authentication</div>
          <div class="task-card in-progress">Integrate API endpoints</div>
        </div>

        <div class="backlog-column">
          <h2 class="column-title">Completed</h2>
          <div class="task-card completed">Setup project repo</div>
          <div class="task-card completed">Add CI/CD pipeline</div>
        </div>
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