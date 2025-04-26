
import { Route } from '@angular/router';
import { GraphplComponent } from './graphpl.component';

export default [
  {
    path: '',
    component: GraphplComponent,
  }, { path: '**', redirectTo: '', pathMatch: 'full' },
] satisfies Route[];
