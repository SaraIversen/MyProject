const RoadmapPage = {
  template: /*html*/`
  <div class="roadmap-container">
    <h1 class="roadmap-title">Project Roadmap</h1>

    <div class="roadmap-columns">
      <div v-for="(items, status) in roadmap" :key="status" class="roadmap-column">
        <h2 class="roadmap-status">{{ status }}</h2>
        <div v-for="item in items" :key="item.id" class="roadmap-item">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <span class="tag">{{ item.category }}</span>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      roadmap: {
        "Planned": [
          { id: 1, title: "New Quest System", description: "Design and implement dynamic quest lines.", category: "Feature" },
          { id: 2, title: "Bug Fixes", description: "Fix player inventory desync issues.", category: "Maintenance" }
        ],
        "In Progress": [
          { id: 3, title: "Multiplayer Optimization", description: "Improve network message handling.", category: "Performance" }
        ],
        "Completed": [
          { id: 4, title: "Character Customization", description: "Add hairstyles and clothing categories.", category: "Feature" }
        ]
      }
    }
  }
}