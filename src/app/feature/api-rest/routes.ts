
import { Route } from '@angular/router';
import { ApiRestComponent } from './api-rest.component';


export default [
  {
    path: '',
    component: ApiRestComponent,
  }, { path: '**', redirectTo: '', pathMatch: 'full' },
] satisfies Route[];
