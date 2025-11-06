const routes = [
    { name: 'home', path: '/', component: HomePage },
    { name: 'boards', path: '/boards', component: BoardsPage },
    { name: 'kanbanboard', path: '/board/:id/:title', component: KanbanBoardPage },
    { name: 'about', path: '/about-us', component: AboutPage },
    { name: 'contact', path: '/contact', component: ContactPage },
    { name: 'test2', path: '/test2', component: TestPage2 },
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
