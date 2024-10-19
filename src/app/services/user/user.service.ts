import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login, User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Paginator } from '../../models/paginator.model';
import { HttpParams } from '@angular/common/http';
//import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/user`;
  constructor(private http: HttpClient) { }
  
  

  // Obtenir tots els usuaris
  getUsers(paginator: Paginator ): Observable<User[]> {
    console.log(paginator);
    // Convertimos el objeto paginator a HttpParams
    // const params = new HttpParams()
    //     .set('page', paginator.page.toString())
    //     .set('limit', paginator.limit.toString());
    // console.log(params);
    return this.http.get<User[]>(`${this.apiUrl}/getUsers/${paginator.page}/${paginator.limit}`);
  }

  // Crear un usuari nou
  createUser(user: User): Observable<User> {
    
    return this.http.post<User>(this.apiUrl, user);
  }

  // Actualitzar un usuari pel ID
  updateUser(usuario: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update/${usuario._id}`, usuario);
  }
  // Eliminar un usuari pel ID
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  login(user: login): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/login`, user);
  }

  
  //RUTES NO CREADES ENCARA
  /*// Buscar un usuari pel nom d'usuari
  findUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/username/${username}`); // Si tens aquesta ruta implementada
  }

  // Obtenir un usuari per ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }*/

}
