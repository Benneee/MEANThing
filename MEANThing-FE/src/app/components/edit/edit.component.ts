import { Component, OnInit } from "@angular/core";
import { IssuesService } from "src/app/issues.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  constructor(private issuesService: IssuesService) {}

  ngOnInit() {}
}
