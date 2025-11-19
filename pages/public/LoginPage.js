const loginUri = "https://localhost:7160/api/user/login"

const LoginPage = {
  inject: ['loginSuccess'],
  template: /*html*/`
  <div class="login-page">
    <div class="loginPage-margin">
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
    async login() 
    {
      console.log("LOGIN FUNCTION CALLED");
      this.errorMessage = "";

      await axios.post(loginUri, {"email" : this.email, "password" : this.password})
      .then(response => {
        console.log("Login successful:", response.data);
        this.loginSuccess(response.data)
      })
      .catch(error => {
        if (error.response) {
          this.errorMessage = error.response.data.message; // Status code response
        }
        else {
          this.errorMessage = "Cannot reach server"; // Network error, server not reachable, etc.
        }
      })
    },
  }
};