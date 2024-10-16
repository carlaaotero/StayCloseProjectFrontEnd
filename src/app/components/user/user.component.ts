import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';  
import { User } from '../../models/user.model'; 
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  usuarios: User[] = []; // Lista de usuarios con tipado User
  desplegado: boolean[] = []; // Controla si el desplegable de cada usuario está abierto o cerrado
  mostrarPassword: boolean[] = []; // Array para controlar la visibilidad de la contraseña

  nuevoUsuario: User = {
    username: '', 
    name: '',
    email: '',
    password: '',
    actualUbication: [],
    inHome: false
  };

  confirmarPassword: string = ''; // Campo para confirmar la contraseña
  usuarioEdicion: User | null = null; // Usuario en proceso de edición
  indiceEdicion: number | null = null; // Almacena el índice del usuario en edición
  formSubmitted: boolean = false; // Indica si se ha enviado el formulario

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    // Cargar usuarios desde el UserService
    this.userService.getUsers()
      .subscribe(data => {
        this.usuarios = data;
        this.desplegado = new Array(data.length).fill(false);
      });
  }

  // Función para agregar o modificar un usuario
  agregarElemento(userForm: NgForm): void {
    this.formSubmitted = true;
  
    // Verificar si las contraseñas coinciden
    if (this.nuevoUsuario.password !== this.confirmarPassword) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }
  
    if (this.indiceEdicion !== null) {
      // Estamos en modo edición, modificar el usuario existente
      this.usuarios[this.indiceEdicion] = { ...this.nuevoUsuario, _id: this.usuarios[this.indiceEdicion]._id };
  
      // // Actualizar el usuario en la API
      // this.userService.updateUser(this.usuarios[this.indiceEdicion]).subscribe(response => {
      //   console.log('Usuario actualizado:', response);
      // });
  
      // Limpiar el estado de edición
      this.indiceEdicion = null;
    } else {
      // Modo agregar nuevo usuario
      const usuarioJSON: User = {
        username: this.nuevoUsuario.username,
        name: this.nuevoUsuario.name,
        email: this.nuevoUsuario.email,
        password: this.nuevoUsuario.password,
        actualUbication: this.nuevoUsuario.actualUbication,
        inHome: this.nuevoUsuario.inHome
      };
  
      // Enviar el usuario a la API a través del UserService
      this.userService.createUser(usuarioJSON).subscribe(response => {
        console.log('Usuario agregado:', response);
        
        // Agregar el usuario con el _id generado por la API al array de usuarios en el frontend
        this.usuarios.push({ ...usuarioJSON, _id: response._id });
        this.desplegado.push(false); // Añadir un nuevo estado de desplegado
      });
    }
  
    // Limpiar los campos del formulario y restablecer su estado
    this.resetForm(userForm);
  }
  

  // Función para limpiar el formulario
  resetForm(userForm: NgForm): void { // Aceptar userForm como parámetro
    this.nuevoUsuario = {
      username: '', 
      name: '',
      email: '',
      password: '',
      actualUbication: [],
      inHome: true
    };
    this.confirmarPassword = ''; // Reiniciar el campo de confirmar contraseña
    this.formSubmitted = false; // Restablecer el estado del formulario para no mostrar errores
    userForm.resetForm(); // Reiniciar el formulario en la vista
  }

  // Función para preparar la edición de un usuario
  prepararEdicion(usuario: User, index: number): void {
    this.usuarioEdicion = { ...usuario }; // Clonar el usuario para la edición
    this.nuevoUsuario = { ...usuario }; // Cargar los datos del usuario en el formulario
    this.indiceEdicion = index; // Almacenar el índice del usuario en edición
    this.desplegado[index] = true; // Abrir el desplegable del usuario que se está editando
  }

  // Función para eliminar un usuario usando el _id
  eliminarElemento(index: number): void {
    const usuarioAEliminar = this.usuarios[index];
  
    if (!usuarioAEliminar._id) {
      console.error('El usuario no tiene un _id válido. No se puede eliminar.');
      alert('El usuario no se puede eliminar porque no está registrado en la base de datos.');
      return;
    }
  
    if (confirm(`¿Estás seguro de que deseas eliminar a ${usuarioAEliminar.name}?`)) {
      // Eliminar a través del UserService usando el _id como identificador
      this.userService.deleteUser(usuarioAEliminar._id).subscribe(
        response => {
          console.log('Usuario eliminado:', response);
          this.usuarios.splice(index, 1);
          this.desplegado.splice(index, 1);
        },
        error => {
          console.error('Error al eliminar el usuario:', error);
          alert('Error al eliminar el usuario. Por favor, inténtalo de nuevo.');
        }
      );
    }
  }
  

  // Función para alternar la visualización del desplegable
  toggleDesplegable(index: number): void {
    this.desplegado[index] = !this.desplegado[index];
  }

  // Función para alternar la visibilidad de la contraseña
  togglePassword(index: number): void {
    this.mostrarPassword[index] = !this.mostrarPassword[index]; // Cambiamos entre true y false
  }



}
