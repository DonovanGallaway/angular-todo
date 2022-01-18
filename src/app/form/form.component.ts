import { Component, OnInit } from "@angular/core";
import { TodoService } from "../todo.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit {
  subject: string = ""; // variable for subject form field
  details: string = ""; // variable for details form field
  tdsrv: TodoService; // variable for todo service
  route: ActivatedRoute; // variable for route service
  id: number | null | undefined = null; // variable for edited post if editing
  buttonLabel = "create todo";
  router: Router; // variable for router service

  constructor(todoService: TodoService, route: ActivatedRoute, router: Router) {
    this.tdsrv = todoService;
    this.route = route;
    this.router = router;
  }

  // check to see if a post need to be edited by looking for an id
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // fetch post from todoservice if there is an id in url
      const post = this.tdsrv.todos.find((p) => p.id == params["id"]);
      if (post) {
        this.subject = post.subject;
        this.details = post.details;
        this.id = post.id;
        this.buttonLabel = "edit todo";
      }
    });
  }

  async handleSubmit() {
    console.log("test");
    //if there is an id, edit the post, if not, create a new post
    if (this.id) {
      //update the todo with the form data
      this.tdsrv.updateTodo({
        id: this.id,
        subject: this.subject,
        details: this.details,
      });
    } else {
      //create the todo with the form data
      this.tdsrv.createTodo({
        subject: this.subject,
        details: this.details,
      });
    }
    // send back to main page
    this.router.navigate(["/"]);
  }
}