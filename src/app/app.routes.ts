import { Routes } from '@angular/router';

export const routes: Routes  & {
  data?: any & {
    title?: string;
    icon?: string;
  };
} = [
  {
    path: '', redirectTo: 'defontana/apiRest', pathMatch: 'full'
  },
  {
    path: 'defontana',
    loadComponent: () => import('./layouts/layouts.component').then(m => m.LayoutsComponent),
    children: [
      {
        path: 'apiRest',
        loadChildren: () => import('./feature/api-rest/routes'),
        data: {
          title: 'API Rest',
           icon: 'solar:user-plus-outline'
        }
      },
      {
        path: 'graphQL',
        loadChildren: () => import('./feature/graphpl/routes'),
        data: {
          title: 'GraphQL',
        icon: 'solar:call-chat-outline'
        }
      }
    ],
  }
]
