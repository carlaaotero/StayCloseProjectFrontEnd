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
  // Propiedad para almacenar el mensaje de error
  errorMessage: string | null = null;

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
    console.log('Loggejant user...')
    this.userService.login(this.loginData).subscribe(response => {
      console.log('Usuario loggejat correctament: ', response);
      //Recollim token del header 'auth-token'
      const token = response.body.token;
      //Guardem el token a sessionStorage
      if(token){
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem('auth-token', token);
         console.log('Token almacenado', token);
        }
        // Redirigeix a la pàgina d'inici si la resposta és correcta
        this.router.navigate(['/home']); // Redirigeix a /home
      }else{
        this.errorMessage = 'no hi ha token :)'; // Asigna el mensaje de error
        console.error('No he rebbut token '); // Gestiona errors si cal
      }
      
    }, error => {
      this.errorMessage = 'Error al loggejar, intentau de nou :)'; // Asigna el mensaje de error
      console.error('Error al loggejar: ', error); // Gestiona errors si cal
    });
  }
}