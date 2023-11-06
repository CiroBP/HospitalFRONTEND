import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Medico } from '../models/Medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private url = 'http://localhost:8080/medico'

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<any>{
    return this.http.get(this.url)
  }

  add(m: Medico): Observable<any>{
    return this.http.post(this.url, m)
  }
  
  delete(id: number): Observable<any>{
    return this.http.post(this.url + '/' + id +'/delete',null)
  }

  update(m: Medico): Observable<any>{
    return this.http.post(this.url + '/' + m.id +'/update',m)
  }

  setPaciente(medico: number, pacienteId:number): Observable<any>{
    return this.http.post(this.url + '/' + medico+'/setPacientes', pacienteId)
  }
}
