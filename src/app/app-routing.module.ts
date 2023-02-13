import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router'
import { AdminComponent } from './admin/admin.component';
import { FinanceComponent } from './finance/finance.component';
import { HomeComponent } from './home/home.component';
import { HrComponent } from './hr/hr.component';
import { ItComponent } from './it/it.component';


const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'it', component: ItComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'hr', component: HrComponent },
  { path: 'finance', component: FinanceComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
