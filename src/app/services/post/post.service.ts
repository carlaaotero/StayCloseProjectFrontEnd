// post.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model'; // Asegúrate de tener este modelo creado
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root' // Asegúrate de que el servicio esté disponible a nivel raíz
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/posts`; // URL de la API para los posts

  constructor(private http: HttpClient) {}

  // Obtener todos los posts con paginación
  getPosts(page: number = 1, limit: number = 10): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  // Crear un nuevo post
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  // Actualizar un post por ID
  updatePost(id: string, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

  // Eliminar un post por ID
  deletePost(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Obtener un post por ID
  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  // Obtener todos los posts de un autor específico
  getPostsByAuthorId(authorId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/${authorId}/authorPosts`);
  }
}
