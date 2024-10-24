import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/post.model';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{

  posts: Post[] = []; //Llista dels posts
  errorMessage: string = ''; //Varibale per mostrar missatges d'error

  nuevoPost: Post = { 
    author: { username: '', name: '', email: '', password: '', actualUbication: [], inHome: false, admin: true },
    postType: '',
    content: '',
    image: '',
    postDate: new Date() 
  };
  
  isEditing: boolean = false;
  editIndex: number = -1;
  
  constructor(private postService: PostService, private userService: UserService) {}

  ngOnInit() {
    this.getPosts(); // Llama a cargarPosts al inicializar el componente
  }

  getPosts() {
    this.postService.getPosts().subscribe(
      (data: Post[]) => {
        //this.posts = posts; // Asigna los posts recibidos
        this.posts = data.filter(exp => exp._id !== undefined)
        console.log('Posts rebuts:', data);
      },
      (error) => {
        console.error("Error al cargar els posts:", error);
      }
    );
  }

  addPost(postForm: any) {
    //this.userService.findUserByUsername(this.nuevoPost.author.username).subscribe((user: User) => {
        //this.nuevoPost.author = user;
        if (this.isEditing) {
            const postId = this.posts[this.editIndex]._id;
            if (postId) {
                this.postService.updatePost(postId, { ...this.nuevoPost }).subscribe((updatedPost: Post) => {
                    this.posts[this.editIndex] = updatedPost;
                    this.resetFormulario(postForm);
                }, (error: any) => {
                    console.error("Error a l'actualitzar el post:", error);
                });
            } else {
                console.error("El ID del post es undefined.");
            }
        } else {
            this.postService.createPost(this.nuevoPost).subscribe((newPost: Post) => {
                this.posts.push(newPost);
                this.resetFormulario(postForm);
            }, (error: any) => {
                console.error("Error al crear el post:", error);
            });
        }
    //}, (error: any) => {
        //console.error("Usuario no encontrado:", error);
    //});
  }

  prepararEdicion(post: Post, index: number) {
    this.nuevoPost = { ...post };
    this.isEditing = true;
    this.editIndex = index;
  }

  eliminarElemento(index: number) {
    const postId = this.posts[index]._id;
    if (postId) {
        this.postService.deletePost(postId).subscribe(() => {
            this.posts.splice(index, 1);
        }, (error: any) => {
            console.error("Error al eliminar el post:", error);
        });
    } else {
        console.error("El ID del post a eliminar es undefined.");
    }
  }

  resetEdicion() {
    this.isEditing = false;
    this.resetFormulario();
  }

  resetFormulario(postForm?: any) {
    this.nuevoPost = { 
      author: { username: '', name: '', email: '', password: '', actualUbication: [], inHome: false,  admin: true },
      postType: '',
      content: '',
      image: '',
      postDate: new Date() 
    }; 
    if (postForm) {
      postForm.resetForm();
    }
    this.isEditing = false;
    this.editIndex = -1;
  }

  actualizarLista() {
    console.log('Lista actualizada:', this.posts);
  }
}
