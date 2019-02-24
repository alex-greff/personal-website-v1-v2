import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home.vue'
import Projects from '../views/Projects/Projects.vue';
import ProjectPage from '../views/Projects/ProjectPage.vue';
import Music from '../views/Music.vue';
import Experience from '../views/Experience.vue';
import Contact from '../views/Contact.vue';
import About from '../views/About.vue';
import NotFound from '../views/404.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/projects', name: 'projects', component: Projects, 
            children: [
                { path: ':id', component: ProjectPage } // TODO: make dynamic
            ]
        },
        { path: '/experience', name: 'experience', component: Experience,
            children: [
                { path: ':id', component: Experience } // TODO: make dynamic
            ]
        },
        { path: '/music', name: 'music', component: Music },
        { path: '/contact', name: 'contact', component: Contact },
        { path: '/about', name: 'about', component: About },
        { path: '/home', redirect: {name: 'home' }},
        { path: '*', component: NotFound }
    ]
});
