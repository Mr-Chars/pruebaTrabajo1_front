import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';


import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

import { LoginGuardGuard, LoginGuardGuard2Guard } from './services/service.index';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginGuardGuard2Guard] },
    {
        path: "",
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
    },
    { path: '**', component: NopagefoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true, relativeLinkResolution: 'legacy' });