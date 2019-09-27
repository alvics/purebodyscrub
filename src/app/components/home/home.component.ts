import { Product } from './../../product';
import { PRODUCTS } from './../../mocked-products';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products = PRODUCTS;
  url: String;
  product: Product;

  constructor(private route: ActivatedRoute, private location: Location) {
    const id = this.route.snapshot.paramMap.get('id');
    this.product = this.findProductById(id);
    // this.url = `https://snipcart-angular-universal.herokuapp.com/${this.location.path()}`;
  }

  ngOnInit() {}

  findProductById(productId: string): Product {
    return this.products.find(product => product.id === productId);
  }
}
