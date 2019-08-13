import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductResolved } from './product';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { map, catchError } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})

export class ProductResolver implements Resolve<ProductResolved> {

    constructor(private _productService: ProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ProductResolved | Observable<ProductResolved> | Promise<ProductResolved> {
        const id =  route.paramMap.get('id');
        if (isNaN(+id)) {
            const message = `Not a number: ${id}`;          
            console.error(message);
            return of({product: null, error: message});
        }
        return this._productService.getProduct(+id).pipe(
            map(product => ({product: product})),
            catchError(error => {
                const message = `Retrieval error: ${error}`;
                console.error(message);
                return of({product: null, error: message});
            })
        )
    }
    
}
