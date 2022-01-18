import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router'
import {TodoService} from '../todo.service';
import {Todo} from '../../types'

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  id: number | null = null;
  route;
  tdsrv;
  post: Todo = {
    subject: "",
    details: ""
  }
  router: Router;
  constructor(route: ActivatedRoute, todoService: TodoService, router: Router) {
    this.route = route;
    this.tdsrv = todoService
    this.router = router;  
   }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      const post = this.tdsrv.todos.find((p) => p.id == params['id'])
      if (post) {
        this.post = post
      }
    })
  }
  async deleteTodo() {
    await this.tdsrv.DeleteTodo(this.post)
    this.router.navigate(['/'])
  }
}
