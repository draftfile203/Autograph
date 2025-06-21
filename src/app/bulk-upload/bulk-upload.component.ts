import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../adminServices/admin.service';  // your service for API calls
import { MenuItem } from '../services/menu.model';
import { from } from 'rxjs';
import { concatMap, delay, tap } from 'rxjs/operators';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  imports: [NgIf],
  styleUrls: ['./bulk-upload.component.css']
})
export class BulkUploadComponent implements OnInit {

  menuItems: MenuItem[] = [];
  loading = false;
  message = '';

  constructor(private http: HttpClient, private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData() {
    this.http.get<MenuItem[]>('assets/initialMenuData.json').subscribe(
      data => {
        this.menuItems = data;
      },
      error => {
        console.error('Failed to load JSON', error);
      }
    );
  }

  bulkUpload() {
    if (!this.menuItems.length) {
      this.message = 'No items to upload!';
      return;
    }

    this.loading = true;
    this.message = '';

    from(this.menuItems).pipe(
      concatMap((item, index) =>
        this.adminService.addMenu(item).pipe(
          delay(index === 0 ? 0 : 500),  // delay 500ms between requests except before the first
          tap(() => {
            this.message = `Uploaded ${index + 1} of ${this.menuItems.length} items...`;
          })
        )
      )
    ).subscribe({
      next: () => {},
      error: (err) => {
        this.loading = false;
        this.message = 'Error during bulk upload.';
        console.error(err);
      },
      complete: () => {
        this.loading = false;
        this.message = 'Bulk upload successful!';
      }
    });

    

  }
  updateImages() {
  this.adminService.updateAllMealImages();
}
}
