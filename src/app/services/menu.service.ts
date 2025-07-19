import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from './menu.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  // Base API endpoint for menu items
  private apiUrl = 'https://68433875e1347494c31f7422.mockapi.io/meal';

  constructor(private http: HttpClient) {}

  // Fetch all menu items from the API
  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.apiUrl);
  }
}
