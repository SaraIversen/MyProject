const routes = [
    // { name: 'animals', path: '/animals', component: AnimalCollection },
    // { name: 'food', path: '/food', component: FoodItems },
    { name: 'home', path: '', component: HomePage },
    { name: 'kanbanboard', path: '/kanbanboard', component: KanbanBoardPage },
    { name: 'about', path: '/about-us', component: AboutPage },
    { name: 'contact', path: '/contact', component: ContactPage },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(), // HASH IS ONLY FOR LOCAL USE !!!!! Otherwise use --> VueRouter.createWebHistory(),
    routes
});

const app = Vue.createApp({
    data() {
        return {

        }
    },
    methods: {

    }
})

// Register components
app.component('product-display', ProductDisplay);
app.component('review-form', ReviewForm);
app.component('review-list', ReviewList);
app.component('contact-form', ContactForm);

// Use router
app.use(router)

// Mount App
app.mount('#app')
