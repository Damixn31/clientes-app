import { Component, OnInit } from '@angular/core';
import { Cliente } from'./cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[]; 

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
   this.clienteService.getClientes().subscribe(
     clientes => this.clientes = clientes
     // (clientes) => { // esto es una funcion anonima usamos parentesis cuando tiene mas de un argumento
       // this.clientes = clientes 
     // }
   );
  }

  // eliminar cliente
  delete(cliente: Cliente): void{
  Swal.fire({
  title: 'Estas seguro?',
  text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'si, eliminar!'
}).then((result) => {
  if (result.isConfirmed) {
    //aca le paso el confimar cuando apretan confimar que si desea eliminar
    this.clienteService.delete(cliente.id).subscribe(
      reponse => {

        // para que se actualize de manera automatica
        this.clientes = this.clientes.filter(cli => cli != cliente)
         Swal.fire(
           'Cliente Eliminado!',
            `Cliente ${cliente.nombre} eliminado con exito.`,
           'success'
        )
      }
    )

    
  }
})
  }
}
