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
  
// Array to hold all menu items
meals: MenuItem[] = [];

// Form model for creating/editing a menu item
meal: MenuItem = {
  image: '',
  name: '',
  price: 0,
  description: '',
  category: '',
  id: ''
};

// Edit mode flag
editMode = false;

// Holds the ID of the item currently being edited
currentEditId: string = '';

constructor(private adminService: AdminService) {}

  // On component initialization, fetch all meals
ngOnInit(): void {
  this.fetchMeals();
}

// Retrieve all menu items from backend
fetchMeals(): void {
  this.adminService.getAllMenus().subscribe(data => {
    this.meals = data;
  });
}

// Handle form submission for adding or updating a menu item
onSubmit(): void {
  if (this.editMode) {
    // Update existing menu item
    this.adminService.updateMenu(this.currentEditId, this.meal).subscribe(() => {
      this.fetchMeals();  // Refresh list
      this.resetForm();   // Reset form
    });
  } else {
    // Add new menu item
    this.adminService.addMenu(this.meal).subscribe(() => {
      this.fetchMeals();  // Refresh list
      this.resetForm();   // Reset form
    });
  }
}

// Load selected item into the form for editing
editMeal(item: any): void {
  this.editMode = true;
  this.currentEditId = item.id;
  this.meal = { ...item }; // Clone the item to avoid binding issues
}

// Delete a menu item after confirmation
deleteMeal(id: string): void {
  if (confirm('Are you sure you want to delete this meal?')) {
    this.adminService.deleteMenu(id).subscribe(() => {
      this.fetchMeals();  // Refresh list
    });
  }
}

// Cancel edit mode and reset the form
cancelEdit(): void {
  this.resetForm();
}

// Clear the form and reset edit state
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
