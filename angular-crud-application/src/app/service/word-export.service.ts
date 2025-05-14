// word-export.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordExportService {

  private apiUrl = 'http://localhost:9080/api/wordexport/generate-word';  // URL de l'API

  constructor(private http: HttpClient) {}

  generateWord(): Observable<Blob> {
    return this.http.post(this.apiUrl, null, { responseType: 'blob' });
  }
}
