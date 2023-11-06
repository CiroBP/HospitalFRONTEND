import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Paciente } from '../models/Paciente'

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private url = 'http://localhost:8080/paciente'

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(this.url)
  }

  add(p: Paciente): Observable<any>{
    return this.http.post(this.url, p)
  }
  
  delete(id: number): Observable<any>{
    return this.http.post(this.url + '/' + id +'/delete',null)
  }

  update(p: Paciente): Observable<any>{
    return this.http.post(this.url + '/' + p.id +'/update',p)
  }
  
}

