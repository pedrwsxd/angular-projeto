import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  // Método listar com headers de autorização
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
    return this.http.put(`${this.apiUrl}/atualizar`, usuario, { headers });
  }

  excluir(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/deletar/${id}`, { headers });
  }

  // Método privado para obter os headers de autorização
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); // Adapte para o nome da sua chave no Local Storage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}