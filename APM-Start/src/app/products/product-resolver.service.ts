import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from './product';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';



@Injectable({
    providedIn: 'root'
})

export class ProductResolver implements Resolve<Product> {

    constructor(private _productService: ProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product | Observable<Product> | Promise<Product> {
        const id =  +route.paramMap.get('id');
        return this._productService.getProduct(id);
    }
    
}
