import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule], // Agregar HttpClientModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corregir 'styleUrl' a 'styleUrls'
})
export class AppComponent {
  title = 'StayCloseFrontEnd';
}
