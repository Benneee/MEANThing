import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class IssuesService {
  url = "https://meanthing-be.benneee.now.sh/issues";

  constructor(private http: HttpClient) {}
}
