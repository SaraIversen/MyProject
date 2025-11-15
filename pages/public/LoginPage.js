const loginUri = "https://localhost:7160/api/user/login"

const LoginPage = {
  inject: ['loginSuccess'],
  template: /*html*/`
    <div class="login-container">
      <div class="login-box">
        <h2 class="login-h2">Login</h2>

          <form @submit.prevent="login">

          <div class="input-group">
            <label>Email</label>
            <input type="email" v-model="email" required />
          </div>

          <div class="input-group">
            <label>Password</label>
            <input type="password" v-model="password" required />
          </div>

          <button type="submit" class="login-button">Login</button>

          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  `,
  data() {
    return {
      email: "",
      password: "",
      errorMessage: null
    }
  },
  methods: {
    login() 
    {
      console.log("LOGIN FUNCTION CALLED");
      this.errorMessage = "";

      axios.post(loginUri, {"email" : this.email, "password" : this.password})
      .then(response => 
      {
        console.log("Login successful:", response.data);

        this.loginSuccess(response.data)

        // Save user info or token if needed
        //localStorage.setItem("user", JSON.stringify(response.data));

        //this.setShowNav(false); // Hide navbar
        //this.$router.push("/dashboard"); // Navigate to home page
      })
      .catch(error => 
        {
        if (error.response) 
        {
          this.errorMessage = error.response.data.message; // Status code response
        }
        else 
        {
          this.errorMessage = "Cannot reach server"; // Network error, server not reachable, etc.
        }
      })
    },
  }
};