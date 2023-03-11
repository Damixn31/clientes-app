import { Injectable } from '@angular/core';

import { CLIENTES } from './clientes.json';
import { Cliente } from'./cliente';
import { of, Observable } from 'rxjs';
// vinculacion cone el backend
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ClienteService {

  private urlEndpoint:string = 'http://localhost:8080/api/clientes';

  // Atributo para las cabeceras http
  public httpHeaders = new HttpHeaders({'content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  // obtener un cliente 
  getClientes(): Observable<Cliente[]> {
    // return of(CLIENTES); 
    return this.http.get<Cliente[]>(this.urlEndpoint);
  }

  // cliente que vamos a crear en el formulario
  create(cliente: Cliente) :Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndpoint, cliente, { headers: this.httpHeaders } )
  }

  // cliente que vamos a editar en el formulario
  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`)
  }

  //  cliente que vamos actualizar en el formulario
  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndpoint}/${cliente.id}`, cliente, {headers: this.httpHeaders})
  }

  // eliminar un cliente
  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, { headers: this.httpHeaders})
  }

}
