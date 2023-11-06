import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './components/paciente/paciente.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: 'pacientes', component: PacienteComponent}
  ,{path: 'inicio', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
