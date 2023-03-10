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

  getClientes(): Observable<Cliente[]> {
    // return of(CLIENTES); 
    return this.http.get<Cliente[]>(this.urlEndpoint);
  }

  create(cliente: Cliente) :Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndpoint, cliente, { headers: this.httpHeaders } )
  }
}
