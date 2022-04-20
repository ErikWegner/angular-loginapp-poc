import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CallbackComponent } from './callback/callback.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProtectedComponent } from './protected/protected.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'front', component: FrontpageComponent },
  { path: 'index.html', component: CallbackComponent },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/front', pathMatch: 'full' }, // redirect to `FrontpageComponent`
  { path: '**', component: NotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
