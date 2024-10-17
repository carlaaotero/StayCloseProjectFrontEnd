import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // Asegúrate de importar Router
import { RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';
import { login } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  }

  // Declara 'router' como propiedad de la clase
  private router: Router;

  // Asegúrate de que el Router se inyecta correctamente en el constructor
  constructor(private userService: UserService, router: Router) {
    this.router = router; // Asigna 'router' a la propiedad de la clase
  }

  logUser(userForm: NgForm): void {
    const userLogin: login = {
      username: this.loginData.username,
      password: this.loginData.password
    }
    this.userService.login(this.loginData).subscribe(response => {
      console.log('Usuario loggejat correctament: ', response);
      // Redirigeix a la pàgina d'inici si la resposta és correcta
      this.router.navigate(['/home']); // Redirigeix a /home
    }, error => {
      alert('Error al loggejar, intentau de nou :)');
      console.error('Error al loggejar: ', error); // Gestiona errors si cal
    });
  }
}