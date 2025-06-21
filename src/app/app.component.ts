import { Component } from '@angular/core';
import { MainComponent } from "./main/main.component";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [ MainComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'autograph';
}
