import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  getUsers(paginator: Paginator ): Observable<{ users: User[]; total: number }> {
    console.log(paginator);
    let headers;
    if (typeof sessionStorage !== 'undefined') {
      const token = sessionStorage.getItem('auth-token');
      console.log("token", token)
      headers = new HttpHeaders({
        'auth-token': token ? token : ''
      })
      }
    return this.http.get<{ users: User[]; total: number }>(`${this.apiUrl}/getUsers/${paginator.page}/${paginator.limit}`, {headers});
  }


  // Crear un usuari nou
  createUser(user: User): Observable<User> {
    let headers;
    if (typeof sessionStorage !== 'undefined') {
      const token = sessionStorage.getItem('auth-token');
      console.log("token", token)
       headers = new HttpHeaders({
        'auth-token': token ? token : ''
      })
      }
    return this.http.post<User>(this.apiUrl, user, {headers});
  }

  // Actualitzar un usuari pel ID
  updateUser(usuario: User): Observable<User> {
    let headers
    if (typeof sessionStorage !== 'undefined') {
      console.log("len", sessionStorage.length)
      const token = sessionStorage.getItem('auth-token');
      console.log("token", token)
      headers = new HttpHeaders({
        'auth-token': token ? token : ''
      })
        }
    return this.http.put<User>(`${this.apiUrl}/update/${usuario._id}`, usuario, {headers});
  }
  // Eliminar un usuari pel ID
  deleteUser(id: string): Observable<any> {
    let headers;
    if (typeof sessionStorage !== 'undefined') {
      const token = sessionStorage.getItem('auth-token');
      console.log("token", token)
      headers = new HttpHeaders({
        'auth-token': token ? token : ''
      })
    }
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {headers});
  }
  login(user: login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user, {observe: 'response'});
  }
  
  //Buscar un usuari pel nom d'usuari
  findUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/username/${username}`); // Si tens aquesta ruta implementada
  }

  //Canvi de Rol 
  changeRol(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/changeRol/${id}`, {observe: 'response'});
  }

   //Habilitar un usuario
  
   enableUser (userId: string): Observable<User> {
    let headers;
    if (typeof sessionStorage !== 'undefined') {
      const token = sessionStorage.getItem('auth-token');
      headers = new HttpHeaders({
        'auth-token': token ? token : ''
      });
  
    }
    return this.http.patch<User>(`${this.apiUrl}/enable/${userId}`, {}, { headers });

  }

  //Deshabilitae un usuario 
  

  disableUser (userId: string): Observable<User> {
    let headers;
    if (typeof sessionStorage !== 'undefined') {
      const token = sessionStorage.getItem('auth-token');
       headers = new HttpHeaders({
        'auth-token': token ? token : ''
      });
      }
    return this.http.patch<User>(`${this.apiUrl}/disable/${userId}`, {}, { headers });

  }
}