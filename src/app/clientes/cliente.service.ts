import { Injectable } from '@angular/core';

import { CLIENTES } from './clientes.json';
import { Cliente } from'./cliente';
import { of, Observable, throwError } from 'rxjs';
// vinculacion cone el backend
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';

@Injectable()
export class ClienteService {

  private urlEndpoint:string = 'http://localhost:8080/api/clientes';

  // Atributo para las cabeceras http
  public httpHeaders = new HttpHeaders({'content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  // obtener un cliente 
  getClientes(): Observable<Cliente[]> {
    // return of(CLIENTES); 
    return this.http.get<Cliente[]>(this.urlEndpoint);
  }

  // cliente que vamos a crear en el formulario
  create(cliente: Cliente) :Observable<Cliente> {
    return this.http.post(this.urlEndpoint, cliente, { headers: this.httpHeaders } ).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
        // aca no es necesario redigir la pagina ya que queremos que usuario corrija el error
      })
    );
  }

  // cliente que vamos a editar en el formulario
  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje); // para que muestre en la consola del navegador el mensaje
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  //  cliente que vamos actualizar en el formulario
  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
       catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  // eliminar un cliente
  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, { headers: this.httpHeaders}).pipe(
       catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
