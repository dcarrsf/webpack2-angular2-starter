import { RouterModule, Routes } from '@angular/router';

// Route components (Pages)
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

// Paths
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent}
];

// Export routes
export const routing = RouterModule.forRoot(routes);
