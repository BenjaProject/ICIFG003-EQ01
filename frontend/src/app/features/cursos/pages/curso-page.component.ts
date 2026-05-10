import { Component } from '@angular/core';
import { CursoFormComponent } from '../components/curso-form.component/curso-form.component';
import { CursoListComponent } from '../components/curso-list.component/curso-list.component';

@Component({
  selector: 'app-curso-page',
  standalone: true,
  imports: [CursoFormComponent, CursoListComponent],
  templateUrl: './curso-page.component.html',
  styleUrl: './curso-page.component.css',
})
export class CursoPageComponent {}
