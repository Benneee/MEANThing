import { IssuesService } from "./../../issues.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {
  createIssueForm: FormGroup;

  constructor(private issuesService: IssuesService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {}

  createIssue() {
    this.createIssueForm = this.fb.group({
      title: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      responsible: ['', Validators.required],
      severity: ['', Validators.required]
    });
  }

}
