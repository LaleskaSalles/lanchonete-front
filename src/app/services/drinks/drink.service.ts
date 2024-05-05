import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IDrink } from '../../pages/Interfaces/IDrink';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private http = inject(HttpClient);
  apiurl = 'http://localhost:8080/drink';

  constructor() { }

  getAllDrinks() {
    return this.http.get<IDrink[]>(`${this.apiurl}`);
  }

  getDrink(id: number) {
    return this.http.get<IDrink>(`${this.apiurl}/${id}`);
  }

  createDrink(drink: any) {
    return this.http.post<IDrink>(`${this.apiurl}`, drink);
  }

  updateDrink(id: number, drink: any) {
    return this.http.put<IDrink>(`${this.apiurl}/${id}`, drink);
  }

  deleteDrink(id: number) {
    return this.http.delete<void>(`${this.apiurl}/${id}`);
  }
}
