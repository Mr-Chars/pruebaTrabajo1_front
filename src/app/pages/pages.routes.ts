import { RouterModule, Routes } from '@angular/router';

import { VerificaTokenGuard } from '../services/service.index';
import { GuardAdminGuard } from '../services/guards/guard-admin.guard';
import { EmpleadosComponent } from './empleados/empleados.component';


const pagesRoutes: Routes = [
    {
        path: 'empleados',
        component: EmpleadosComponent,
        canActivate: [VerificaTokenGuard, GuardAdminGuard]
    },
    {
        path: '',
        redirectTo: '/empleados',
        pathMatch: 'full'
    }

];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);