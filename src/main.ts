import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Preload background image and show app only after it's ready
const bg = new Image();
bg.src = 'assets/background2.jpg';

bg.onload = () => {
  // Remove loader screen
  document.getElementById('preloader')?.remove();

  // Show the Angular app
  const appRoot = document.querySelector('app-root') as HTMLElement;
  if (appRoot) {
    appRoot.style.display = 'block';
  }

  // Bootstrap the Angular app AFTER background is loaded
  bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
};
