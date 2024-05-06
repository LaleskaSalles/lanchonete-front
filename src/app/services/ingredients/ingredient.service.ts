import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IIngredients } from '../../Interfaces/IIngredients';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private http = inject(HttpClient);
  apiurl = 'http://localhost:8080/ingredient';

  constructor() { }

  getAllIngredients() {
    return this.http.get<IIngredients[]>(`${this.apiurl}`);
}

  getIngredient(id: number) {
    return this.http.get<IIngredients>(`${this.apiurl}/${id}`);
  }

  createIngredient(ingredient: any) {
    return this.http.post<IIngredients>(`${this.apiurl}`, ingredient);
  }

  updateIngredient(id: number, ingredient: any) {
    return this.http.put<IIngredients>(`${this.apiurl}/${id}`, ingredient);
  }

  deleteIngredient(id: number) {
    return this.http.delete<void>(`${this.apiurl}/${id}`);
  }

}
