import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './features/home/home';
import { NewsComponent } from './features/news/news';
import { MetaComponent } from './features/meta/meta';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'noticias', component: NewsComponent },
      { path: 'meta', component: MetaComponent }
    ]
  }
];
