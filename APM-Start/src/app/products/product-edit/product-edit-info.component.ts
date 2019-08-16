import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Product } from '../product';

@Component({
  templateUrl: './product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit {
  @ViewChild(NgForm) productForm: NgForm;

  errorMessage: string;
  product = { id: 1, productName: 'test', productCode: 'test' };
  // product: Product;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    // this._route.parent.data.subscribe(data => {
    //   this.product = data['resolvedData'].parent;
    // });
  }
}
