import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoAdmService {
  
  private apiUrl = 'http://localhost:8000/produtos';
  constructor(private http: HttpClient) {}

  //método listar
  listar(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }

  listarPorId(id: any): Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/listar/${id}`);
  }

  atualizar(aluno: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/atualizar`, aluno);
  }

  excluir(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/deletar/${id}`)
  }

}
