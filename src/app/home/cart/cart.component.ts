import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ChangeDataService } from "../../service/change-data.service";
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  data: any;
  login: boolean = false;
  user: string = '';
  listItemArray: any;

  constructor(private service: ChangeDataService) { }

  ngOnInit(): void {
    let isLogin = localStorage.getItem('user')
    if (isLogin) {
      this.login = true
      this.user = isLogin
    }
    this.service.dataRes$
      .subscribe((res: any) => {
        if (typeof (res) == 'string') {
          this.listItemArray = []
        } else {
          this.listItemArray = res

        }
      })
      this.total()
  }
  remove(index:any){
    this.listItemArray.splice(index,1)
    this.totalPrice =0

  }
  like:any
  likeclick(){
    this.like=!this.like
  }

  tang(index: any) {
    this.listItemArray[index].quantity = this.listItemArray[index].quantity + 1
  }


  giam(index: any) {
    this.listItemArray[index].quantity = this.listItemArray[index].quantity - 1
    if (this.listItemArray[index].quantity < 0) this.listItemArray[index].quantity = 0

  }


   totalPrice:number = 0
  total() {
    let length = this.listItemArray.length
    if (length != 0) this.totalPrice = this.listItemArray.reduce((total:any,item: any) => total+(item.price * item.quantity),0)
    return this.totalPrice
  }


  buyNow(){
    Swal.fire({
      title:"Đặt hàng thành công",
      icon:'success'
    })
    this.listItemArray= null
    this.totalPrice =0
  }
}
