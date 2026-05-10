import { Component } from "@angular/core";
import path from "node:path";
import { EstudiantePageComponent } from "./pages/estudiante-page.component";

export const ESTUDIANTE_ROUTES = [
    { 
        path:'/estudiantes',
        component: EstudiantePageComponent
    }
]