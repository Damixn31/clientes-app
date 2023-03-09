import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Biendenido a Angular';

  curso: string = 'Curso Spring 5 con Angular';
  profesor: string = 'Andres Guzman';
}
