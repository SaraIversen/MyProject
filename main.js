const routes = [
    // Public pages:
    { name: 'home', path: '/', component: HomePage },
    { name: 'about', path: '/about-us', component: AboutPage },
    { name: 'contact', path: '/contact', component: ContactPage },
    { name: 'login', path: '/login', component: LoginPage },
    // Requires authentication:
    { name: 'boards', path: '/boards', component: BoardsPage, meta: { requiresAuth: true } },
    { name: 'kanbanboard', path: '/board/:id/:title', component: KanbanBoardPage, meta: { requiresAuth: true } },
    { name: 'test2', path: '/test2', component: TestPage2, meta: { requiresAuth: true } },
    { name: 'documents', path: '/documents', component: DocumentsPage, meta: { requiresAuth: true } },
    { name: 'roadmap', path: '/roadmap', component: RoadmapPage, meta: { requiresAuth: true } },
    { name: 'roadmap2', path: '/roadmap2', component: RoadmapPage2, meta: { requiresAuth: true } },
    { name: 'dashboard', path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } },
    { name: 'backlog', path: '/backlog', component: BacklogPage, meta: { requiresAuth: true } },
    { name: 'moodboard', path: '/moodboard', component: MoodboardPage, meta: { requiresAuth: true } },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(), // HASH IS ONLY FOR LOCAL USE !!!!! Otherwise use --> VueRouter.createWebHistory(),
    routes
});

// Global guard to make sure user that are not logged in can't access user pages. 
router.beforeEach((to, from, next) => 
{
    const loggedIn = !!localStorage.getItem("user");

    if (to.meta.requiresAuth && !loggedIn) {
        // Not logged in → redirect to login.
        next("/login");
    } 
    else if (to.path === "/login" && loggedIn) {
        // Logged in → redirect to dashboard.
        next("/dashboard");
    } 
    else {
        next();
    }
});

const app = Vue.createApp({
    data() {
        return {
            showNav: true,
            loggedIn: !!localStorage.getItem("user")
        }
    },
    provide() {
        return {
            loginSuccess: (userData) => this.loginSuccess(userData)
        }
    },
    methods: {
        loginSuccess(userData){
            localStorage.setItem("user", JSON.stringify(userData));
            this.loggedIn = true;
            this.showNav = false;
            this.$router.push("/dashboard"); // Navigate to the user home page
        },
        logOut() {
            localStorage.removeItem("user");
            this.loggedIn = false;
            this.showNav = true;
        },
        toggleResponsiveNav() {
            const x = document.getElementById("myTopnav");
            if (x.className === "topnav") {
                x.className += " responsive";
            } 
            else {
                x.className = "topnav";
            }
        }
    },
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
