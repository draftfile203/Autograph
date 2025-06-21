import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { MainComponent } from './main/main.component';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';

export const routes: Routes = [
    
    {path: '', component: MainComponent},
    {path: 'adminpanelss', component:AdminComponent},
    {path: 'upload', component:BulkUploadComponent}
];
