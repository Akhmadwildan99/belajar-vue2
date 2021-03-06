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

Vue.component('blog-post', {
    props: ['title', 'number'],
    emits: ['remove'],
    template: 
    `<h3 >{{number}}. My journey at {{title}}
    <button v-on:click="$emit('remove')">remove place</button>
    </h3>`
})
new Vue({
    el: '#blogApp',
    data: {
        places: [],
        nextPlace:''
    },
    methods:{
        addPlace: function(){
            if(this.nextPlace.length >= 1){
                this.places.push(this.nextPlace)
            }
            this.nextPlace = ''
        },
        removePlace: function(index){
            this.places.splice(index, 1)
        }
    }
})

new Vue({
    el:'#demoTransition',
    data: {
        show: true
    }
})

// Mixins
var mixin = {
    created: function(){
        this.hello()
    },

    methods: {
        hello: function(){
            console.log('hello mixin');
        }
    }
}

var Component = Vue.extend({
    mixins: [mixin]
})

var component = new Component()

var mixin1 = {
    data: function(){
        return {
            message: 'hallo',
            foo: 'abc'
        }
    }
}


new Vue({
    el: '#mixinEl',
    mixins: [mixin1],
    data: function(){
        return {
            message: 'goodbay',
            bar: 'def'
        }
    },
    created: function(){
        console.log(this.$data)
    }
})

var mixin2 = {
    created: function(){
        console.log('mixin hook called')
    }
}

var vueMixin = new Vue({
    el: '#mixinCreated',
    mixins: [mixin2],
    created: function(){
        console.log('component hook called')
    }
})

var mixin3 = {
    methods:{
        foo: function(){
            console.log('foo')
        },
        conflict: function(){
            console.log('conflict in mixin3')
        }
    }
}

var vm = new Vue({
    mixins: [mixin3],
    methods: {
        bar: function(){
            console.log('bar')
        },
        conflict: function(){
            console.log('conflict in component')
        }
    }
})

vm.foo()
vm.bar()
vm.conflict()

// Component Directive
Vue.directive('demo',{
    bind: function(el, binding, vnode){
        var s = JSON.stringify
        el.innerHTML = 
        'name: ' + s(binding.name) + '<br/>' +
        'value: ' + s(binding.value) + '<br/>' +
        'expression: ' + s(binding.expression) + '<br/>'+
        'arguments: ' + s(binding.arg) + '<br/>'+
        'modifiers: ' + s(binding.modifiers) + '<br/>' +
        'vnode keys: ' + Object.keys(vnode).join(', ')
    }
})
new Vue({
    el: '#component-directive',
    data: {
        message: 'hello'
    }
})

Vue.directive('binding', {
    bind: function(el, binding) {
        el.style.backgroundColor = binding.value.backgroundColor
        el.style.padding = binding.value.padding
        el.style.width = binding.value.width
    }
})

new Vue({
    el: '#binding-direct'
})

new Vue({
    el: '#filterApp',
    data: {
        value: '',
        valueUpper: ''
    },
    methods: {
        capitelize: function(){
            if (!this.value) return ''
            this.value = this.value.toString()
            this.valueUpper = this.value.charAt(0).toUpperCase() + this.value.slice(1)
        }
    }
})

// Watch
new Vue({
    el: '#watchDemo',
    data: {
        firstname: 'foo',
        lastname: 'bar',
        fullname: 'foo bar'
    },

    watch: {
        firstname: function(val){
            this.fullname = val + ' ' + this.lastname
        },
        lastname: function(val){
            this.fullname = this.firstname + ' ' + val
        }
    }
})


// Computed
var newComputed = new Vue({
    el: '#computedDemo',
    data: {
        firstname: 'foo',
        lastname: 'bar',
    },

    computed: {
        fullname: {
            get: function(){
                return this.firstname + ' ' + this.lastname
            },
            set: function(value){
                var names = value.split(' ')
                this.firstname = names[0]
                this.lastname = names[names.length - 1]
            }
        }
    }
})

// console.log(newComputed.firstname)
// console.log(newComputed.lastname)


new Vue({
    el: '#watch-example',
    data: {
        question: '',
        answer: 'I cannot give you an answer until you ask a question!',
    },

    watch: {
        // whenever question changes, this function will run
        question: function () {
          this.answer = 'Waiting for you to stop typing...'
          this.debouncedGetAnswer()
        }, 
        
    },

    created: function(){
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
    },

    methods: {
        getAnswer: function () {
          if (this.question.indexOf('?') === -1) {
            this.answer = 'Questions usually contain a question mark. ;-)'
            return
          }
          this.answer = 'Thinking...'
          var vm = this
          axios.get('https://yesno.wtf/api')
            .then(function (response) {
              vm.answer = _.capitalize(response.data.answer)
            })
            .catch(function (error) {
              vm.answer = 'Error! Could not reach the API. ' + error
            })
        }
    }
})

// Mounted
new Vue({
    el: '#mountedDemo',
    data: {
        count: 0
    },
    created: function(){
            setInterval(() => {
                this.counter()
            }, 1000)
    },
    methods: {
        counter: function () {
            this.count++
        }
    },
    mounted: function () {
        console.log("this mounting")
        console.log(this.count)
    }
})

new Vue({
    el: '#refDemo',
    data: {
        inputRef: 'Ref default',
        testRef: 'Test default'
    },

    methods: {
        submit: function () {
            console.log(this.$refs)
            this.inputRef = this.$refs.input.value
            this.testRef = this.$refs.test.innerHTML
        }
    }
})

