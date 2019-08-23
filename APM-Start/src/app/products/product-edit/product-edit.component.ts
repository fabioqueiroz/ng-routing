import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../messages/message.service';

import { Product, ProductResolved } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  pageTitle = 'Product Edit';
  errorMessage: string;
  // product: Product;

  private _dataIsValid: { [key: string]: boolean } = {};
  private _currentProduct: Product;
  private _originalProduct: Product;

  get product(): Product {
    return this._currentProduct;
  }

  set product(value: Product) {
    this._currentProduct = value;

    // Clone the object to retain a copy
    this._originalProduct = {...value};
  }

  get isDirty() : boolean {
    return JSON.stringify(this._originalProduct) !== JSON.stringify(this._currentProduct);
  }

  constructor(private _productService: ProductService,
              private _messageService: MessageService,
              private _route:ActivatedRoute,
              private _router: Router) { }

  ngOnInit(): void {
    // using the resolver and subscribing to changes
    this._route.data.subscribe(data => {
      const resolvedData: ProductResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onProductRetrieved(resolvedData.product);
    });
    
    // const id = +this._route.snapshot.paramMap.get('id');
    // this.getProduct(id);

    // this._route.paramMap.subscribe(params => {
    //   const id = +params.get('id');
    //   this.getProduct(id);
    // });
  }

  getProduct(id: number): void {
    this._productService.getProduct(id)
      .subscribe(
        (product: Product) => this.onProductRetrieved(product),
        (error: any) => this.errorMessage = <any>error
      );
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this._productService.deleteProduct(this.product.id)
          .subscribe(
            () => this.onSaveComplete(`${this.product.productName} was deleted`),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  isValid(path?: string): boolean {

    this.validate();

    if (path) {
      return this._dataIsValid['path'];
    }

    return (this._dataIsValid && Object.keys(this._dataIsValid).every(d => this._dataIsValid[d] === true));
  }

  reset() {
    this._dataIsValid = null;
    this._currentProduct = null;
    this._originalProduct = null;
  }

  saveProduct(): void {
    if (this.isValid()) {
      if (this.product.id === 0) {
        this._productService.createProduct(this.product)
          .subscribe(
            () => this.onSaveComplete(`The new ${this.product.productName} was saved`),
            (error: any) => this.errorMessage = <any>error
          );
      } else {
        this._productService.updateProduct(this.product)
          .subscribe(
            () => this.onSaveComplete(`The updated ${this.product.productName} was saved`),
            (error: any) => this.errorMessage = <any>error
          );
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this._messageService.addMessage(message);
    }

    this.reset();
    
    // Navigate back to the product list
    this._router.navigate(['/products']);
  }

  validate(): void {
    // Clear the validation object
    this._dataIsValid = {};

    // 'info' tab
    if (this.product.productName && this.product.productName.length >= 3 && this.product.productCode) {
      this._dataIsValid['info'] = true;

    } else {
      this._dataIsValid['info'] = false;
    }

    // 'tags' tab
    if (this.product.category && this.product.category.length >= 3) {
      this._dataIsValid['tags'] = true;

    } else {
      this._dataIsValid['tags'] = false;
    }
  } 
}
