const HomePage = {
  template: /*html*/`
    <div class="home-page">
      <h1>Project management for game developers</h1>
      <p>Your all-in-one toolkit for game design and project management</p>
      <div class="homePage-image">
        <img v-bind:src="imageGreen">
      </div>

      <h1>Features</h1>

      <div class="feature-container black-background">
        <div class="feature-content">
          <div class="feature-text">
            <h2>Kanban boards</h2>
            <p>Visualize your workflow and manage tasks efficiently with customizable Kanban boards. Drag and drop tasks between columns to reflect their current status and keep your team aligned.</p>
          </div>
          <img v-bind:src="imageBlue" class="homePage-sideImage">
        </div>
      </div>

      <div class="feature-container">
        <div class="feature-content">
          <img v-bind:src="imageGreen" class="homePage-sideImage">
          <div class="feature-text">
            <h2>Integrated game design documentation</h2>
            <p>Keep all your game design documents organized and easily accessible within the platform. Collaborate with your team in real-time and ensure everyone is on the same page.</p>
          </div>
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
            imageGreen: './assets/images/socks_green.jpg',
            imageBlue: './assets/images/socks_blue.jpg',
        }
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
    }
}