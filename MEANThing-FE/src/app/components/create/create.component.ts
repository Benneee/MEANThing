import { Issue } from "./../../issue.model";
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
  formHeadline = "Create a new issue";
  formBtn = {
    type: "create",
    text: "Save"
  };
  formUpdateProps: any;
  editState = false;
  id: string;
  status: string;

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
    if (this.formBtn.type === "create") {
      console.log("Creating new issue...");
      this.addIssue(description, responsible, severity, title);
    } else {
      console.log("Updating issue...");
      const { _id, status } = this.formUpdateProps;
      this.updateIssue(_id, title, responsible, description, severity, status);
    }
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

  updateIssue(
    id: any,
    title: string,
    responsible: string,
    description: string,
    severity: string,
    status: string
  ) {
    this.isLoading = true;
    this.issuesService
      .updateIssue(id, title, responsible, description, severity, status)
      .subscribe(
        (res: any) => {
          console.log("res: ", res);
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
          const { _id, status } = res;
          this.formUpdateProps = { _id, status };
          // Load form with the data from the issue
          // this.editState = true;
          this.populateForm(res);
        }
      },
      (error: any) => {
        console.log("err: ", error);
      }
    );
  }

  populateForm(issueData: any) {
    let title = "";
    let responsible = "";
    let description = "";
    let severity = "";

    if (issueData) {
      this.formHeadline = "Update Issue";
      this.formBtn = {
        type: "update",
        text: "Update"
      };

      title = issueData.title;
      description = issueData.description;
      responsible = issueData.responsible;
      severity = issueData.severity;

      this.createIssueForm = this.fb.group({
        title,
        description,
        responsible,
        severity
      });
    } else {
      this.createIssueForm = this.fb.group({
        title: [title, Validators.required],
        description,
        responsible,
        severity
      });
    }
  }

  getIssueID() {
    this.route.params.subscribe((params: Params) => {
      if (!params["id"]) {
        this.editState = true;
      } else {
        this.issueID = params["id"];
      }
    });
  }
}
