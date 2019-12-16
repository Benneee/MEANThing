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

  constructor(private issuesService: IssuesService, private router: Router) {}

  ngOnInit() {
    this.getAllIssues();
  }

  getAllIssues() {
    this.issuesService.getIssues().subscribe(
      (data: Issue[]) => {
        this.issues = data;
        console.log(this.issues);
      },
      (error: any) => {
        console.log("err: ", error);
      }
    );
  }

  editIssue(id: string) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id: string) {
    this.issuesService.deleteIssue(id).subscribe(
      (res: any) => {
        console.log("res: ", res);
        // this.getAllIssues();
      },
      (error: any) => {
        console.log("error: ", error);
      }
    );
  }
}
