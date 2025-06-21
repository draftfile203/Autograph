import { Component,  OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../services/menu.model';
import { AdminService } from '../adminServices/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
 meals: MenuItem[] = [];
  meal: MenuItem = {
    image: '',
    name: '',
    price: 0,
    description: '',
    category: '',
    id: ''
  };

  editMode = false;
  currentEditId: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchMeals();
  }

  fetchMeals(): void {
    this.adminService.getAllMenus().subscribe(data => {
      this.meals = data;
    });
  }

  onSubmit(): void {
    if (this.editMode) {
      this.adminService.updateMenu(this.currentEditId, this.meal).subscribe(() => {
        this.fetchMeals();
        this.resetForm();
      });
    } else {
      this.adminService.addMenu(this.meal).subscribe(() => {
        this.fetchMeals();
        this.resetForm();
      });
    }
  }

  editMeal(item: any): void {
    this.editMode = true;
    this.currentEditId = item.id;
    this.meal = { ...item }; // Clone to avoid reference mutation
  }

  deleteMeal(id: string): void {
    if (confirm('Are you sure you want to delete this meal?')) {
      this.adminService.deleteMenu(id).subscribe(() => {
        this.fetchMeals();
      });
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.meal = {
      image: '',
      name: '',
      price: 0,
      description: '',
      category: '',
      id: ''
    };
    this.editMode = false;
    this.currentEditId = '';
  }
}
