const ContactForm = { 
  template: /*html*/`
  <!-- <form class="contact-form" @submit.prevent="onSubmit"> -->   
  <form class="contact-form">
    <label for="name">Name</label>
    <input id="name" v-model="name">

    <label for="email">Email</label>
    <input id="email" v-model="email">

    <label for="subject">Subject</label>
    <input id="subject" v-model="subject">

    <label for="message">Message</label>      
    <textarea id="message" v-model="message"></textarea>

    <input class="button" type="submit" value="Submit">   
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