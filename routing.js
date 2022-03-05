const notFound = {template:  '<h1>Not Found<h1>'}
const Home = {template: '<h1>Home</h1>'}
const About = {template: '<h1>About</h1>'}

const routes = {
    '/' : Home,
    '/About': About,
}

new Vue({
    el: '#app',
    data: {
        currentRoute: window.location.pathname
    },
    computed: {
        ViewComponent(){
            return routes[this.currentRoute]
        }
    },
    render (h) {return h(this.ViewComponent)}
})