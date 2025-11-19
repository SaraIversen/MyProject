const ContactForm = { 
  template: /*html*/`
  <h1 class="contact-title">Contact</h1>

  <form class="contact-form">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" placeholder="Your name..">

    <label for="email">Email</label>
    <input type="text" id="email" name="email" placeholder="Your email..">

    <label for="subject">Subject</label>
    <select id="subject" name="subject">
      <option value="feedback">Feedback</option>
      <option value="other">Other</option>
    </select>

    <label for="subject">Subject</label>
    <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>

    <input type="submit" value="Submit" @click="onSubmit">
  </form>
  `,
  data() {
    return {
      name: '',
      email: '',
      subject: '',
      message: '',
    }
  },
  methods: {
    onSubmit() {
      // You can replace this with a modal or router navigation
      alert('Submit clicked!');
    },
    // onSubmit() {
    //   if (this.name === '' || this.review === '' || this.rating === null || this.recommend === null) {
    //     alert('Review is incomplete. Please fill out every field.')
    //     return
    //   }

    //   let productReview = {
    //     name: this.name,
    //     review: this.review,
    //     rating: this.rating,
    //     recommend: this.recommend // solution

    //   }
    //   this.$emit('contact-submitted', productReview)

    //   this.name = ''
    //   this.review = ''
    //   this.rating = null
    //   this.recommend = null // solution
    // }
  }
}