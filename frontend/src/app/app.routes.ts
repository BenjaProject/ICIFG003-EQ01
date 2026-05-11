import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { LandingComponent } from './features/users/components/landing-component/landing-component';
import { LoginComponent } from './features/users/components/login-component/login-component';
import { DashboardComponent } from './features/users/components/dashboard-component/dashboard-component';
import { EstudiantePageComponent } from './features/estudiantes/pages/estudiante-page.component';
import { InasistenciaPageComponent } from './features/inasistencia/pages/inasistencia-page.component';
import { CursoPageComponent } from './features/cursos/pages/curso-page.component';
import { UsuarioStore } from './features/users/services/usuario-store';

const authGuard = () => {
    const usuarioStore = inject(UsuarioStore);
    const router = inject(Router);
    if (usuarioStore.isValid()) {
        return true;
    }
    if (usuarioStore.hasStoredSession()) {
        return true;
    }
    return router.createUrlTree(['/login'], { queryParams: { error: 'auth' } });
};

export const routes: Routes = [
    {path:'', component: LandingComponent},
    {path:'login', component: LoginComponent},
    {path:'registro', component: LoginComponent},
    {path:'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    {path:'estudiantes', component: EstudiantePageComponent, canActivate: [authGuard]},
    {path:'inasistencias', component: InasistenciaPageComponent, canActivate: [authGuard]},
    {path:'cursos', component: CursoPageComponent, canActivate: [authGuard]}
];