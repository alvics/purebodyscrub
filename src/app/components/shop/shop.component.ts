import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Product } from './../../product';
import { PRODUCTS } from './../../mocked-products';
import { ActivatedRoute } from '@angular/router';
// import { HomeComponent } from './../home/home.component';

import { Location } from '@angular/common';

declare var paypal;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  // PayPal Intergration
  @ViewChild('paypal') paypalElement: ElementRef;

  scrub = {
    price: 19.99,
    description: `Pure Body Coffee Scrub a 100% natural blend that actively targets dry skin, cellulite, 
    stretch marks, psoriasis, acne and eczema`,
    img: 'assets/img/pck.png'
  };

  paidFor = false;

  /* --======================================================================-- */

  products = PRODUCTS;
  url: String;
  product: Product;

  constructor(private route: ActivatedRoute, private location: Location) {
    const id = this.route.snapshot.paramMap.get('id');
    this.product = this.findProductById(id);
  }
  ngOnInit() {
    // PayPal
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.scrub.description,
                amount: {
                  currency_code: 'AUD',
                  value: this.scrub.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          console.log(order);
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }

  findProductById(productId: string): Product {
    return this.products.find(product => product.id === productId);
  }
}
