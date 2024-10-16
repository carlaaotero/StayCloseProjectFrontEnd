import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de que esto esté aquí
import { FormsModule } from '@angular/forms'; // Asegúrate de que esto esté aquí

interface Post {
  author: string;
  postType: string;
  content: string;
  image?: string;
}

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importar aquí
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  posts: Post[] = [];
  nuevoPost: Post = { author: '', postType: '', content: '' };
  isEditing: boolean = false;
  editIndex: number = -1;

  agregarElemento(postForm: any) {
    if (this.isEditing) {
      this.posts[this.editIndex] = { ...this.nuevoPost }; // Modificar el post existente
    } else {
      this.posts.push({ ...this.nuevoPost }); // Agregar un nuevo post
    }
    this.resetFormulario(postForm);
  }

  prepararEdicion(post: Post, index: number) {
    this.nuevoPost = { ...post };
    this.isEditing = true;
    this.editIndex = index;
  }

  eliminarElemento(index: number) {
    this.posts.splice(index, 1);
  }

  resetEdicion() {
    this.isEditing = false;
    this.resetFormulario();
  }

  resetFormulario(postForm?: any) {
    this.nuevoPost = { author: '', postType: '', content: '' }; // Reiniciar el formulario
    if (postForm) {
      postForm.resetForm(); // Reiniciar el formulario en la interfaz
    }
    this.isEditing = false;
    this.editIndex = -1; // Reiniciar el índice de edición
  }

  actualizarLista() {
    console.log('Lista actualizada:', this.posts);
  }
}
