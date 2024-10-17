import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) { }


  // Obtenir tots els usuaris
  getUsers(page: number = 1, limit: number = 10): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  // Crear un usuari nou
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Actualitzar un usuari pel ID
  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  // Eliminar un usuari pel ID
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Buscar un usuari pel nom d'usuari
  findUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/username/${username}`); // Si tens aquesta ruta implementada
  }

  // Obtenir un usuari per ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Obtener un usuario por su nombre de usuario
  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}?username=${username}`);
  }

}
