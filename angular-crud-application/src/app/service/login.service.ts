import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:9080/api/Login'; // Assure-toi que c'est bien l'URL du backend

  constructor(private http: HttpClient) {}

  register(username: string, password: string) {
  return this.http.post(`${this.apiUrl}/register`, { username, password }, {
    observe: 'response',  // Observer toute la réponse (status, headers, body)
    responseType: 'json'  // Assure-toi de spécifier 'json' ici
  });
}


  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/authenticate`, { username, password }, {
      observe: 'response',
      responseType: 'json'  // Réponse attendue en JSON
    });
  }
}
