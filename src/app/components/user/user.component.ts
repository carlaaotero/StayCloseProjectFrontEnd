import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';  
import { User } from '../../models/user.model'; 
import { UserService } from '../../services/user/user.service';
import { Paginator } from '../../models/paginator.model';
import { Data } from '../../models/data.model';
import { NavbarComponent } from '../navbar/navbar.component';
import { response } from 'express';
import { error } from 'node:console';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  usuarios: User[] = []; // Lista de usuarios con tipado User
  totalUsuarios: number = 0;
  desplegado: boolean[] = []; // Controla si el desplegable de cada usuario está abierto o cerrado
  mostrarPassword: boolean[] = []; // Array para controlar la visibilidad de la contraseña
  paginator: Paginator = {
    page: 1,  // Asigna el número de pàgina 
    limit: 5 // Asigna el limit d'elements per pàgina
  }
  data: Data []= []; 
  id: string = 'any'; //Guardar el id del user per canvi de rol
  // Propiedad para almacenar el mensaje de error
  errorMessage: string | null = null;

  // Lista de opciones para elementos por página
  availableLimits: number[] = [5, 10, 25, 50]; // Opciones para el límite de elementos

  

  nuevoUsuario: User = {
    username: '', 
    name: '',
    email: '',
    password: '',
    actualUbication: [],
    inHome: false,
    admin: false,
    disabled:true
  };

  confirmarPassword: string = ''; // Campo para confirmar la contraseña
  usuarioEdicion: User | null = null; // Usuario en proceso de edición
  indiceEdicion: number | null = null; // Almacena el índice del usuario en edición
  formSubmitted: boolean = false; // Indica si se ha enviado el formulario

  constructor(private userService: UserService) {}
  ngOnInit(): void {
   this.loadUsers();

  }

  loadUsers(page: number = this.paginator.page, limit: number = this.paginator.limit): void {
    // Actualizar los valores de la paginación
    this.paginator.page = page;
    this.paginator.limit = limit;

    // Llamar al servicio para obtener los usuarios
    this.userService.getUsers(this.paginator)
        .subscribe(data => {
            this.usuarios = data.users; // Suponiendo que el servicio retorna un objeto con 'users'
            this.totalUsuarios = data.total; // Suponiendo que el servicio retorna el total de usuarios
            this.desplegado = new Array(this.usuarios.length).fill(false);
        });
}

   // Cambiar el número de elementos por página
  onItemsPerPageChange(event: Event): void {
    const limit = (event.target as HTMLSelectElement).value;
    this.paginator.limit = +limit; // Actualizar el límite
    this.paginator.page = 1; // Reiniciar a la primera página
    this.loadUsers(); // Cargar usuarios con el nuevo límite
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
  
    // Actualizar el usuario en la API
      this.userService.updateUser( this.usuarios[this.indiceEdicion]).subscribe(response => {
        if(response)
        console.log('Usuario actualizado:', response);
      });
  
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
        inHome: this.nuevoUsuario.inHome,
        admin: this.nuevoUsuario.admin,
        disabled: true
      };
  
      // Enviar el usuario a la API a través del UserService
      this.userService.createUser(usuarioJSON).subscribe(response => {
        console.log('Usuario agregado:', response);

        usuarioJSON._id=response._id;
        // Agregar el usuario con el _id generado por la API al array de usuarios en el frontend
        this.usuarios.push({ ...usuarioJSON});
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
      inHome: true,
      admin: false,
      disabled: true
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
    console.log(usuarioAEliminar);
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
  
  //Canvi de rol 
  changeRol(id: string): void {
    this.userService.changeRol(id).subscribe(
      response => {
        console.log('Rol canviat', response)
        this.loadUsers();
      }, 
      error => {
        this.errorMessage = 'Ja ets administrador';
        console.error('Error al canviar de rol', error);

      }
    )
  }

  // Función para alternar la visualización del desplegable
  toggleDesplegable(index: number): void {
    this.desplegado[index] = !this.desplegado[index];
  }

  // Función para alternar la visibilidad de la contraseña
  togglePassword(index: number): void {
    this.mostrarPassword[index] = !this.mostrarPassword[index]; // Cambiamos entre true y false
  }

   // Calcular el número total de páginas
   get totalPages(): number {
    return Math.ceil(this.totalUsuarios / this.paginator.limit);
  }

  // Generar un array para iterar en el template de la paginación
  getPages(): number[] {
    const totalPages = Math.ceil(this.totalUsuarios / this.paginator.limit);

    // Si no hay usuarios, no generar páginas
    if (totalPages <= 1) {
      return [];
    }
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  enableUser(userId: string): void {
    this.userService.enableUser(userId).subscribe({
      next:() => {alert('Usuario habilitado');
        this.loadUsers(); // Refresca la lista de usuarios
      },
      error:(err)=> console.error('Error para habilitar usuario:', err)
    });
  }
  
  disableUser(userId: string): void {
    this.userService.disableUser(userId).subscribe({
      next: () => { alert('Usuario deshabilitado');
      this.loadUsers(); // Refresca la lista de usuarios
      },
      error:(err) => console.error('Error al deshabilitar usuario:', err)
    });

}

}
