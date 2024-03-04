import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/Pages/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path:'user',loadChildren:()=> import('./features/user/user.module').then((m)=>m.UserModule),
    },
    {
        path: "home", loadChildren: () => import('../app/features/home/home.module').then((m) => m.HomeModule),
    },
    {
        path: "item", loadChildren: () => import('../app/features/product/product.module').then((m) => m.ProductModule),
    }
];
