import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, delay, from, Observable } from 'rxjs';
import { MenuItem } from '../services/menu.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

// Base API URL for all meal operations
private apiUrl = 'https://68433875e1347494c31f7422.mockapi.io/meal';

constructor(private http: HttpClient) {}

// Fetch all menu items from the API
getAllMenus(): Observable<MenuItem[]> {
  return this.http.get<MenuItem[]>(this.apiUrl);
}

// Add a new menu item to the backend
addMenu(menu: MenuItem): Observable<any> {
  return this.http.post(`${this.apiUrl}`, menu);
}

// Update an existing menu item by ID
updateMenu(id: string, menu: MenuItem): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, menu);
}

// Delete a menu item by ID
deleteMenu(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

// Update the image URL of all meals to a static image
updateAllMealImages() {
  this.http.get<any[]>(this.apiUrl).subscribe(meals => {

    // Iterate through each meal one-by-one with delay between requests
    from(meals).pipe(
      concatMap(meal => {
        const { id, ...mealData } = meal;

        // Replace image with a fixed path
        const updatedMeal = { ...mealData, image: 'assets/food.jpg' };

        // Send PUT request to update meal
        return this.http.put(`${this.apiUrl}/${id}`, updatedMeal).pipe(
        delay(300) // 300 ms delay to avoid overloading API
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