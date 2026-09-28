import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Meal } from '../models/meal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = `${environment.apiUrl}/meals`;
  private http = inject(HttpClient);

  getMealsbyUser(userId: number): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.apiUrl}?userId=${userId}`);
  }

  createMeal(meal: Partial<Meal>): Observable<Meal>{
    return this.http.post<Meal>(this.apiUrl, meal);
  }

  deleteMeal(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }



}
