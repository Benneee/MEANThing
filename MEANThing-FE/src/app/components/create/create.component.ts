import { IssuesService } from "./../../issues.service";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {
  createIssueForm: FormGroup;
  isLoading = false;

  constructor(
    private issuesService: IssuesService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.createIssue();
  }

  createIssue() {
    this.createIssueForm = this.fb.group({
      title: ["", Validators.required],
      description: "",
      responsible: "",
      severity: ""
    });
  }

  submit() {
    // console.log("form values: ", this.createIssueForm.value);
    // Destructure out the parameters needed to create an issue and pass them to the addIssue function
    const {
      description,
      responsible,
      severity,
      title
    } = this.createIssueForm.value;
    this.addIssue(description, responsible, severity, title);
  }

  addIssue(
    description: string,
    responsible: string,
    severity: string,
    title: string
  ) {
    this.isLoading = true;
    this.issuesService
      .createIssue(title, responsible, description, severity)
      .subscribe(
        (res: any) => {
          if (res) {
            console.log("res: ", res);
            this.router.navigate(["/list"]);
          }
        },
        (error: any) => {
          console.log("err: ", error);
        }
      );
  }
}
