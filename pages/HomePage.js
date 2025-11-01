const HomePage = {
  template: /*html*/`
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page</p>
    </div>
    <div class="cart">Cart({{ cart.length }})</div>
    <product-display :premium="premium" @add-to-cart="updateCart"></product-display>
  `,
  data() {
        return {
            cart: [],
            premium: true,
        }
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
    }
}