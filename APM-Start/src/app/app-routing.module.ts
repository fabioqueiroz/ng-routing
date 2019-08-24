import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ProductModule } from './products/product.module';
import { AuthGuard } from './user/auth.guard';


@NgModule({
    declarations: [],
    imports: [ 
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent},
            { path: 'products',
              canActivate: [AuthGuard],
              // loadChildren: () => import('./products/product.module').then(m => m.ProductModule), // not working with "module": "esnext"
              loadChildren: './products/product.module#ProductModule'
            },
            { path: '', redirectTo: 'welcome', pathMatch:'full'},
            { path: '**', component: PageNotFoundComponent}
          ]),
     ],
    exports: [ RouterModule ]

})
export class AppRoutingModule {}