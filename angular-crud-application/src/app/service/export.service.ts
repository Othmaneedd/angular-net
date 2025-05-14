import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class ExportService {
  private apiUrl = 'api/export'; // URL de l'API

  constructor(private http: HttpClient) { }

  exportData(params: any): Observable<Blob> {
    // Envoie une requête GET avec des paramètres
    // et attend un Blob (fichier binaire) en réponse
    return this.http.get(`${this.apiUrl}/export`, {
      params,
      responseType: 'blob' // Type de réponse attendu
    });
  }
}