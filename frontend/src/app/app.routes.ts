import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing-component/landing-component';
import { LoginComponent } from './components/login-component/login-component';
// 1. IMPORTA EL DASHBOARD AQUÍ (Revisa que la ruta sea correcta según tus carpetas)
import { DashboardComponent } from './components/dashboard-component/dashboard-component'; 

export const routes: Routes = [
    {path:'', component: LandingComponent},
    {path:'login', component: LoginComponent},
    // 2. AGREGA LA RUTA DEL DASHBOARD
    {path:'dashboard', component: DashboardComponent} 
];