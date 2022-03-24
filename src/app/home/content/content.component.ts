import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from "../../model/Product.model";
import { ChangeDataService } from 'src/app/service/change-data.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  Products: any


  constructor(private productService: ProductService, private service: ChangeDataService) {
    this.getListProduct()
  }

  getListProduct() {
    this.productService.getAllProduct()
      .subscribe((data: any) => {
        this.productItems = data.map((item: any) => {
          return item
        })

        this.Products = this.productItems
      })

  }

  ngOnInit(): void {

  }



  //============ Cách Thêm và xoá item
  listItem: [] | any = []
  counter: number = 0
  add(item: any) {
    item.quantity = 0
    item.quantity = item.quantity+ 1
    this.listItem.push(item)
    this.counter++
    this.service.cartTotal(this.listItem)
  }


  productItems: any = []
  assignItem() {
    this.productItems = Object.assign([], this.Products)
  }

  searchString: String = ''
  search(value: any): any {
    let result = Object.assign([], this.Products)
    this.searchString = value.toLowerCase()

    // search Result 
    result = result.filter((item: any) => item.product_name.toLowerCase().indexOf(this.searchString) != -1)

    if (result.length != 0) {
      console.log(result);

      return this.productItems = result
    }

    if (this.searchString.trim() == '') {
      return this.assignItem()
    }
    return this.assignItem()
  }

}
