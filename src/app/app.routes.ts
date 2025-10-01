import { Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { DefaultLayoutComponent } from './shared/default-layout/default-layout.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: '', component: DefaultLayoutComponent,
        data: {
            title: 'HomePage'
        },
        children: [
            {
                path: 'auth', loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
            },
            {
                path: 'home', loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
            },
            {
                path: 'u', loadChildren: () => import('./features/user/user.module').then((m) => m.UserModule),
            },
            {
                path: "item", loadChildren: () => import('../app/features/product/product.module').then((m) => m.ProductModule),
            }
        ]
    },

    { path: '**', component: ErrorPageComponent }
];
