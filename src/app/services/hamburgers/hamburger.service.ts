import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IHamburger } from '../../Interfaces/IHamburger';

@Injectable({
  providedIn: 'root'
})
export class HamburgerService {
  private http = inject(HttpClient);
  apiUrl = 'http://localhost:8080/hamburger';

  constructor() { }

  getAllHamburgers() {
    return this.http.get<IHamburger[]>(`${this.apiUrl}`);
  }

  getHamburger(id: number) {
    return this.http.get<IHamburger>(`${this.apiUrl}/${id}`);
  }

  createHamburger(hamburger: any) {
    return this.http.post<IHamburger>(`${this.apiUrl}`, hamburger);
  }

  updateHamburger(id: number, hamburger: any) {
    return this.http.put<IHamburger>(`${this.apiUrl}/${id}`, hamburger);
  }

  deleteHamburger(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
