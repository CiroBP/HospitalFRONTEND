import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/models/Paciente';
import { Medico } from 'src/app/models/Medico';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { MedicoService } from 'src/app/services/medico.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit  {

  pacienteList = new Array<Paciente>()
  medicoList = new Array<Medico>()
  paciente = new Paciente()
  pacienteForm: FormGroup
  id2: number
  nombre2: string
  medicoId: number

  constructor(private pacienteService: PacienteService,private medicoservice:MedicoService ,private modalService: NgbModal){ }

  ngOnInit(): void {
    this.pacienteForm = new FormGroup({
      'nombre': new FormControl( this.paciente.nombre,Validators.required),
      'medico': new FormControl(this.medicoId)
    })
    this.medicoservice.getAll().subscribe(response =>{
      this.medicoList = response
    },error =>{
      console.log(error)
    })
    
    this.getAll()
  }

  get nombre(){
    return this.pacienteForm.get('nombre')
  }
  get medico(){
    return this.pacienteForm.get('medico')
  }

  getAll(){
    this.pacienteService.getAll().subscribe(Response => {
      this.pacienteList = Response
      document.getElementsByTagName('input')[0].focus()
    }, error =>{
      console.log(error)
    })
  }

  add(){
    this.paciente.nombre = this.nombre?.value
    this.pacienteService.add(this.paciente).subscribe(response =>{
      console.log(response)
      console.log(this.medico?.value)
      this.medicoservice.setPaciente(this.medico?.value, response.id).subscribe(()=>{
        
        location.reload()
      },error =>{
        console.log(error)
      })
    }, error =>{
      console.log(error)
    })
  }

  update(paciente:Paciente ,ver:any) {
    this.id2 = paciente.id
    this.nombre2 = paciente.nombre
    this.modalService.open(ver).result.then(()=>{
      paciente.nombre = this.nombre2
      this.pacienteService.update(paciente).subscribe(()=>{
        location.reload()
      },error =>{
        console.log(error)
      })
    },error =>{
      console.log(error)
    }
    )
  }

  delete(id: number){
    this.pacienteService.delete(id).subscribe(()=>{
      location.reload()
    },error=>{
      console.log(error)
    })
    
  }

}
