const baseUri = "https://localhost:7160/api/boards"

const HomePage = {
  template: /*html*/`
    <div class="home-page">
      <br>
      <br>

      <h1>Project management for game developers</h1>
      <h2>Your all-in-one toolkit for game design and project management</h2>

      <br>

      <div class="homePage-image">
        <img v-bind:src="imageDevOrganizer">
      </div>

      <br>
      <br>
      <br>

    <!--<h2>How To Create A Loader</h2>
    <div class="loader" v-if="loading"></div>

    <div v-if="error" style="color: red">Error: {{error}}</div>
    <div v-if="statuscode" style="color: green">Statuscode: {{statuscode}}</div>

      <ul v-if="boardsList.length">
        <li v-for="board in boardsList" :key="board.id">
          Board {{board.id}} {{board.title}}
        </li>
      </ul>-->

      <h1 class="feature-title">Features</h1>

      <div class="feature-container black-background">
        <div class="feature-content">
          <div class="feature-text">
            <h2>Kanban boards</h2>
            <p>Visualize your workflow and manage tasks efficiently with customizable Kanban boards. Drag and drop tasks between columns to reflect their current status and keep your team aligned.</p>
          </div>
          <img v-bind:src="imgKanbanboard" class="homePage-sideImage">
        </div>
      </div>

      <div class="feature-container">
        <div class="feature-content">
          <img v-bind:src="imgGameDesignDocuments" class="homePage-sideImage">
          <div class="feature-text">
            <h2>Integrated game design documentation</h2>
            <p>Keep all your game design documents organized and easily accessible within the platform. Collaborate with your team in real-time and ensure everyone is on the same page.</p>
          </div>
        </div>
      </div>

      <div class="feature-container black-background">
        <div class="feature-content">
          <div class="feature-text">
            <h2>Moodboards</h2>
            <p>Visualize your workflow and manage tasks efficiently with customizable Kanban boards. Drag and drop tasks between columns to reflect their current status and keep your team aligned.</p>
          </div>
          <img v-bind:src="imgMoodboard" class="homePage-sideImage">
        </div>
      </div>
    </div>

    <!-- <div class="cart">Cart({{ cart.length }})</div>
    <product-display :premium="premium" @add-to-cart="updateCart"></product-display> -->
  `,
  data() {
        return {
            cart: [],
            premium: true,
            imageDevOrganizer: './assets/images/DevOrganizer.png',
            imageGreen: './assets/images/socks_green.jpg',
            imageBlue: './assets/images/socks_blue.jpg',

            imgKanbanboard: './assets/images/Kanbanboard_icon.png',
            imgGameDesignDocuments: './assets/images/Game_design_documentation_icon.png',
            imgMoodboard: './assets/images/Moodboard_icon.png',

            // loading: false,
            // boardsList: [],
            // error: null, 
            // statuscode: null,
        }
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
    }
}