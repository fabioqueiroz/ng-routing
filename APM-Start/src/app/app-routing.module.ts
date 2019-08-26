import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ProductModule } from './products/product.module';
import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategy } from './selective-strategy.service';


@NgModule({
    declarations: [],
    imports: [ 
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent},
            { path: 'products',
              canActivate: [AuthGuard], // loads as soon as the the path is clicked
              // canLoad: [AuthGuard], // only loads if the user logs in; blocks the PreloadAllModules
              data: {preload: true},
              // loadChildren: () => import('./products/product.module').then(m => m.ProductModule), // not working with "module": "esnext"
              loadChildren: './products/product.module#ProductModule' // working
              // loadChildren: () => ProductModule // not lazy loading
            },
            { path: '', redirectTo: 'welcome', pathMatch:'full'},
            { path: '**', component: PageNotFoundComponent}
          ], {preloadingStrategy: SelectiveStrategy}), // before using a custom preloading strategy => {preloadingStrategy: PreloadAllModules}
     ],
    exports: [ RouterModule ]

})
export class AppRoutingModule {}