import { EditComponent } from "./components/edit/edit.component";
import { ListComponent } from "./components/list/list.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateComponent } from "./components/create/create.component";

const routes: Routes = [
  { path: "create", component: CreateComponent },
  { path: "list", component: ListComponent },
  { path: "edit/:id", component: EditComponent },
  { path: "", redirectTo: "list", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
