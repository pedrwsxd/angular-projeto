import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://api-foodtruck.pedrohenrick.com.br:8080/usuarios';

  constructor(private http: HttpClient) {}


  listar(): Observable<any[]> {
    const headers = this.getAuthHeaders(); 
    return this.http.get<any[]>(`${this.apiUrl}/listar`, { headers });
  }

  listarPorId(id: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/listar/${id}`, { headers });
  }

  atualizar(usuario: any): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}/atualizar/${usuario.id}`; 
    return this.http.put(url, usuario, { headers });
  }

  excluir(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/deletar/${id}`, { headers });
  }

  
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}