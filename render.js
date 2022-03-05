Vue.component('anchored-heading', {
    render: function(createElement){
        return createElement(
            'h' + this.level,
            this.$slots.default
        )
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
})

new Vue({
    el: '#app'
})