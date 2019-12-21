import { MatSnackBar } from "@angular/material/snack-bar";
import { IssuesService } from "./../../issues.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material";
import { Issue } from "src/app/issue.model";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  issues: Issue[];
  displayedColumns = ["title", "responsible", "severity", "status", "actions"];
  isLoading = false;

  constructor(
    private issuesService: IssuesService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllIssues();
  }

  getAllIssues() {
    this.isLoading = true;
    this.issuesService.getIssues().subscribe(
      (data: Issue[]) => {
        this.issues = data;
        // console.log(this.issues);
        this.isLoading = false;
      },
      (error: any) => {
        // console.log("err: ", error);
        this.notify(error, "Error");
        this.isLoading = false;
      }
    );
  }

  editIssue(id: string) {
    // console.log('item: ', id);
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id: string) {
    console.log("item: ", id);
    this.issuesService.deleteIssue(id).subscribe(
      (res: any) => {
        // console.log("res: ", res);
        this.notify(res, "Delete Issue");
        this.getAllIssues();
      },
      (error: any) => {
        // console.log("error: ", error);
        this.notify(error, "Error");
      }
    );
  }

  private notify(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: "top",
      horizontalPosition: "end"
    });
  }
}
