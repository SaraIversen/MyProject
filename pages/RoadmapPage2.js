const RoadmapPage2 = {
  template: /*html*/`
  <div class="roadmap-wrapper2">
    <h1 class="roadmap-title2">ROADMAP</h1>

    <!-- Timeline header -->
    <div class="roadmap-header2">
      <div v-for="month in months" :key="month" class="month2">{{ month }}</div>
    </div>

    <div v-for="team in teams" :key="team.name" class="team-section2">
      <div class="team-header2">
        <div class="team-icon2" :style="{ color: team.color }">⬛</div>
        <h2>{{ team.name }}</h2>
      </div>

      <div class="team-roadmap2">
        <div v-for="task in team.tasks" 
             :key="task.title" 
            class="task-bar2"
             :style="getTaskStyle(task, team.color)">
          {{ task.title }}
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      months: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
      teams: [
        {
          name: "WEB TEAM",
          color: "#E3B44B",
          tasks: [
            { title: "New admin console", start: 1, end: 1 },
            { title: "3rd party integrations", start: 2, end: 2 },
            { title: "Security 2.0", start: 3, end: 3 },
            { title: "On premise backup", start: 4, end: 4 },
            { title: "API", start: 5, end: 5 },
            { title: "Code review", start: 6, end: 6 }
          ]
        },
        {
          name: "MOBILE MOCK UP",
          color: "#7EC8E3",
          tasks: [
            { title: "Mobile mock up", start: 1, end: 1 },
            { title: "UX improvements", start: 2, end: 4 },
            { title: "Interactive dialogue box", start: 4, end: 4 },
            { title: "Ticketing system", start: 6, end: 6 },
            { title: "Application upgrade", start: 5, end: 6 }
          ]
        },
        {
          name: "MARKETING TEAM",
          color: "#A58AD7",
          tasks: [
            { title: "Market analysis", start: 1, end: 1 },
            { title: "Customer outreach", start: 2, end: 2 },
            { title: "SEO plan", start: 3, end: 3 },
            { title: "Pricing review", start: 4, end: 4 },
            { title: "Content review", start: 5, end: 5 }
          ]
        }
      ]
    }
  },
  methods: {
    getTaskStyle(task, color) {
      const width = (task.end - task.start + 1) * 150 - 10; // 150px per month
      const left = (task.start - 1) * 150;
      return {
        background: color,
        width: width + "px",
        left: left + "px"
      }
    }
  }
}