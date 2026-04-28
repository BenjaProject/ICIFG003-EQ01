import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing-component/landing-component';
import { LoginComponent } from './components/login-component/login-component';

export const routes: Routes = [
    {path:'', component: LandingComponent},
    {
        path:'login', component: LoginComponent
    }
];
