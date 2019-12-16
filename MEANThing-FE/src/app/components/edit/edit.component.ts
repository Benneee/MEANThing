import { Component, OnInit } from "@angular/core";
import { IssuesService } from "src/app/issues.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  constructor(private issuesService: IssuesService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // this.route.queryParamMap.subscribe()
  }
}
