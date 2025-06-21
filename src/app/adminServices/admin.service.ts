import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { concatMap, delay, from, Observable } from 'rxjs';
import { MenuItem } from '../services/menu.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'https://68433875e1347494c31f7422.mockapi.io/meal'

  constructor(private http:HttpClient) { }

  getAllMenus(): Observable<MenuItem[]> {
  return this.http.get<MenuItem[]>(this.apiUrl);
}


  addMenu(menu:MenuItem): Observable<any> {
    return this.http.post(`${this.apiUrl}`, menu)
  }

  updateMenu(id: string, menu: MenuItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`,menu)
  }

  deleteMenu(id:string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }


updateAllMealImages() {
  this.http.get<any[]>(this.apiUrl).subscribe(meals => {
    from(meals).pipe(
      concatMap(meal => {
        const { id, ...mealData } = meal;
        const updatedMeal = { ...mealData, image: 'assets/food.jpg' };

        return this.http.put(`${this.apiUrl}/${id}`, updatedMeal).pipe(
          delay(300) // 300 ms delay between each request
        );
      })
    ).subscribe(
      () => console.log('✅ Meal updated'),
      error => console.error('❌ Failed to update a meal', error),
      () => console.log('🎉 All meals updated!')
    );
  });
}
}
