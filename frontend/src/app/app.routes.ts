import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { LandingComponent } from './components/landing-component/landing-component';
import { LoginComponent } from './components/login-component/login-component';
import { DashboardComponent } from './components/dashboard-component/dashboard-component'; 
import { UsuarioStore } from './services/users/usuario-store';

const authGuard = () => {
    const usuarioStore = inject(UsuarioStore);
    const router = inject(Router);
    if (usuarioStore.isValid()) {
        return true;
    }
    return router.createUrlTree(['/login'], { queryParams: { error: 'auth' } });
};

export const routes: Routes = [
    {path:'', component: LandingComponent},
    {path:'login', component: LoginComponent},
    {path:'registro', component: LoginComponent},
    {path:'dashboard', component: DashboardComponent, canActivate: [authGuard]} 
];