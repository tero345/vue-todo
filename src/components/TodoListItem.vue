<template>
    <li>
        <span 
            class="itme" 
            :class="todoItemlClass"
            @click="toggleItem"
        >{{todoItem.title}}</span>
        <button @click="removeTodo">삭제</button>
    </li>
</template>

<script lang="ts">
    import { Todo } from '@/App.vue';
    import Vue, { PropType } from 'vue'

    export default Vue.extend({
        props: {
            todoItem: Object as PropType<Todo>,
            index:Number
            
        },
        methods:{
            removeTodo(){
                this.$emit("remove", this.index);
            },
            toggleItem(){
                this.$emit("toggle", this.index,  this.todoItem);
            }
        },
        computed:{
            todoItemlClass() : any{
                return this.todoItem.done ? 'complete' : null
            }
        }
    })
</script>

<style scoped>
    .itme{
         cursor: pointer;
    }
    .complete{  
        text-decoration: line-through;
    }
</style>