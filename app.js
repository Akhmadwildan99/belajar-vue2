var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue'
    }
})

var app1 = new Vue({
    el: '#app1',
    data: {
        message: 'Hello Vue'
    },
    methods: {
        reverseMessage: function(){
            this.message = this.message.split('').reverse().join('')
        }
    }
})

var app3 = new Vue({
    el: '#app2',
    data:{
        count: 0
    },
    methods: {
        maju: function(){
            this.count++
        },
        mundur: function(){
            this.count--
        }
    }
})

var todoApp = new Vue({
    el: '#todo',
    data: {
        todolist: [],
        nextTodo: ''
    }, 
    methods: {
        addTodo: function(){
            this.todolist.push(this.nextTodo)
            this.nextTodo = ''
        },
        removeTodo: function(index){
            this.todolist.splice(index, 1)
        }
    }
})




Vue.component('button-counter', {
    data: function(){
        return {
            counter: 0
        }
    },
    template: `<button @click="counter++">Clicked me {{counter}}</button>`
})

var app4 = new Vue({
    el: '#component-demo',
})