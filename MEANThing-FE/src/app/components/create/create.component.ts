import { IssuesService } from "./../../issues.service";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {
  createIssueForm: FormGroup;
  isLoading = false;
  issueID: string;
  editState = false;
  formBtn = {
    type: "create",
    text: "Save"
  };

  constructor(
    private issuesService: IssuesService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.createIssue();
    this.getIssueID();
    if (this.issueID) {
      this.getIssueDetails();
    }
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

  getIssueDetails() {
    this.isLoading = true;
    this.issuesService.getSingleIssue(this.issueID).subscribe(
      (res: any) => {
        if (res) {
          console.log("res: ", res);
          // Load form with the data from the issue
          if (this.editState === true) {
            this.formBtn = {
              type: "update",
              text: "Update"
            };
            this.createIssueForm.patchValue({
              title: res.title,
              responsible: res.responsible,
              description: res.description,
              severity: res.severity
            });
          }
        }
      },
      (error: any) => {
        console.log("err: ", error);
      }
    );
  }

  getIssueID() {
    this.route.params.subscribe((params: Params) => {
      if (!params["id"]) {
        this.editState = false;
      } else {
        this.editState = true;
        this.issueID = params["id"];
      }
    });
  }
}
