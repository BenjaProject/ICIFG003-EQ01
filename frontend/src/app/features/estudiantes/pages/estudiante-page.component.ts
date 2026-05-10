import { Component } from "@angular/core";
import { EstudianteFormComponent } from "../components/estudiante-form.component/estudiante-form.component";
import { EstudianteListComponent } from "../components/estudiante-list.component/estudiante-list.component";

@Component({
selector: 'app-estudiante-page',
standalone: true,
imports: [EstudianteListComponent, EstudianteFormComponent],
templateUrl: './estudiante-page.component.html',
styleUrl: './estudiante-page.component.css',
})
export class EstudiantePageComponent {}