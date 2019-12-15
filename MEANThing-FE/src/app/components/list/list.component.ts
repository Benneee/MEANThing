import { IssuesService } from "./../../issues.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  constructor(private issuesService: IssuesService) {}

  ngOnInit() {
    this.getAllIssues();
  }

  getAllIssues() {
    this.issuesService.getIssues().subscribe(
      (res: any) => {
        console.log('res: ', res);
      },
      (error: any) => {
        console.log("err: ", error);
      }
    );
  }
}
