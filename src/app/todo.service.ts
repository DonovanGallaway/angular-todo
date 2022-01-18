import { Injectable } from '@angular/core';
import { Todo } from '../types'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // url of API
  url = "https://masonite-todo.herokuapp.com/todos/";

  // property to hold array of todos from api
  todos: Array<Todo> = [];
  
  // get todos when service constructed
  constructor() { 
    this.getTodos();
   }

   async getTodos() {
     const response = await fetch(this.url);
     const data = await response.json();
     this.todos = data;
     return data;
   }

   // method to create todos
   async createTodo(todo: Todo) {
     await fetch(this.url, {
       method: "post",
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify(todo)
     })

     this.getTodos();
   }

   async updateTodo(todo: Todo) {
     await fetch(this.url + todo.id + '/', {
       method: "put",
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify(todo)
     })

     this.getTodos()
   }

   async DeleteTodo(todo: Todo){
     await fetch(this.url + todo.id + '/', {
       method: "delete"
     })

     return this.getTodos()
   }
}
