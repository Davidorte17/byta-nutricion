import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Food } from '../models/food';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = `${environment.apiUrl}/foods`;
  private http = inject(HttpClient);

  getFoods(): Observable<Food[]>{
    return this.http.get<Food[]>(this.apiUrl);
  }

  getFoodbyId(id: number): Observable<Food>{
    return this.http.get<Food>(`${this.apiUrl}/${id}`)
  }

  createFoods(food: Partial<Food>): Observable<Food>{
    return this.http.post<Food>(this.apiUrl, food);
  }

  deleteFoods(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateFoods(id: number, food: Partial<Food>): Observable<Food>{
    return this.http.put<Food>(`${this.apiUrl}/${id}`, food)
  }
}
