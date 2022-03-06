<template>
  <div>
    <header>
      <h1>Vue todo Typescript</h1>
    </header>
    <main>
      <TodoInput 
        :item="todoText" 
        @input="updateTodoText" 
        @add="addTodoItem"
      ></TodoInput>
      <div>
        <ul>
          <TodoListItem 
            v-for="(todoItem, index) in todoItems" 
            :key="index"
            :todoItem="todoItem"
            :index="index"
            @remove="removeTodoItem"
            @toggle="toggleTodoItem"
          ></TodoListItem>
        </ul>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import TodoInput from './components/TodoInput.vue';
  import TodoListItem from './components/TodoListItem.vue';

  const storage_key = "vue-todo-ts-v1";
  const storage = {
    save(todoItems:any[]){
      const parsed = JSON.stringify(todoItems);
      localStorage.setItem(storage_key, parsed);
    },
    fetch(){
      const todoItems = localStorage.getItem(storage_key) || "[]";
      const result = JSON.parse(todoItems);
      return result;
    }
  }

  export interface Todo {
    title : string,
    done : boolean
  }

  export default Vue.extend({
  components: { TodoInput, TodoListItem },
    data() {
      return {
        todoText: "",
        todoItems: [] as Todo[]
      }
    },
    methods:{
      updateTodoText(value:string){   
        this.todoText = value;
      },
      addTodoItem(){
        const value = this.todoText;

        const todo : Todo = {
          title : value,
          done : false
        }

        this.todoItems.push(todo);
        storage.save(this.todoItems);
        this.initTodoText();
      },
      initTodoText(){
        this.todoText = "";
      },
      fetchTodoItems(){
        this.todoItems = storage.fetch();
      },
      removeTodoItem(index:number){
        this.todoItems.splice(index, 1);
        storage.save(this.todoItems);
      },
      toggleTodoItem(index:number, todoItem:Todo){
        console.log(index, todoItem);
        this.todoItems.splice(index, 1, {
          ...todoItem,
          done : !todoItem.done
        });
        storage.save(this.todoItems);
      }
    },
    created(){
      this.fetchTodoItems();
    }
  });
</script>

<style scoped>

</style>