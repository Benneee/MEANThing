import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class IssuesService {
  url = "https://meanthing-be.benneee.now.sh";

  constructor(private http: HttpClient) {}

  getIssues() {
    return this.http.get(`${this.url}/issues`);
  }

  getSingleIssue(id: any) {
    return this.http.get(`${this.url}/issues/${id}`);
  }

  createIssue(
    title: string,
    responsible: string,
    description: string,
    severity: string
  ) {
    const issue = {
      title,
      responsible,
      description,
      severity
    };

    return this.http.post(`${this.url}/issues/add`, issue);
  }

  updateIssue(
    id: any,
    title: string,
    responsible: string,
    description: string,
    severity: string,
    status: string
  ) {
    const issue = {
      title,
      responsible,
      description,
      severity,
      status
    };

    return this.http.put(`${this.url}/issues/update/${id}`, issue);
  }

  deleteIssue(id: any) {
    return this.http.delete(`${this.url}/issues/delete/${id}`);
  }
}
