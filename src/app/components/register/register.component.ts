import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
/*
  // Definim un nou usuari amb els camps buits (per crear)
  newUser: User = {
    username: '',
    name: '',
    email: '',
    password: '',
    actualUbication: [],
    inHome: true
  }
  
  mostrarPassword: boolean[] = []; // Controla si les contrasenyes es mostren o s'oculten
  confirmarPassword: string = ''; // Variable per emmagatzemar la confirmació de la contrasenya
  formSubmitted: boolean = false; // Controla si el formulari ha estat enviat o no

  constructor(private userService: UserService){}

  register(userForm: NgForm): void {
    this.formSubmitted = true; // // Indica que el formulari ha estat enviat
  
    // Verificar si les contrasenyes coincideixen
    if (this.newUser.password !== this.confirmarPassword) {
      alert('Les contrasenyes no coincideixen. Si us plau, intenta-ho de nou.');
      return;
    }
   
    // creació de l'Usuari
    const userJSON: User = {
      username: this.newUser.username,
      name: this.newUser.name,
      email: this.newUser.email,
      password: this.newUser.password,
      actualUbication: this.newUser.actualUbication,
      inHome: this.newUser.inHome
    };
  
    // Enviar el usuario a la API a través del UserService
    this.userService.addUser(userJSON).subscribe(response => {
      console.log('Usuari agregat correctament', response);
    });
  }

  // Funció per alternar la visibilitat de la contrasenya
  togglePassword(index: number): void {
    this.mostrarPassword[index] = !this.mostrarPassword[index];  // Alterna entre mostrar i amagar la contrasenya
  }*/

}
