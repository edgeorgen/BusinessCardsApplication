import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/auth.guard';
import { WebCamComponent } from './web-cam/web-cam.component';


const routes: Routes = [
  {path: '', redirectTo: '/create-user', pathMatch: 'full'},
  {path: 'create-user', component: CreateUserComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'webcam', component: WebCamComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
