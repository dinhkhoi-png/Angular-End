import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';
import { ChangeDataService } from "../../service/change-data.service";

@Component({
  selector: 'app-contentadmin',
  templateUrl: './contentadmin.component.html',
  styleUrls: ['./contentadmin.component.css']
})
export class ContentadminComponent implements OnInit {

  Products: [] | any

  constructor(private productService: ProductService, private service: ChangeDataService) {
    this.getListProduct()
  }


  ngOnInit(): void {
  }


  getListProduct() {
    this.productService.getAllProduct().subscribe((data: any) => {
      this.Products = data.map((item: any) => {
        return item
      })
    })
  }


  deleteProduct(id: any) {
    console.log(id);
    Swal.fire({
      title: 'Bạn Chắc Chắn muốn Xoá?',
      text: 'Hành động không thể phục hồi!!!!',
      showDenyButton: true,
      confirmButtonText: 'Không Xoá',
      denyButtonText: `Xoá`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Đã huỷ', '', 'info')
      } else if (result.isDenied) {
        // Xoá collection khỏi firebase
        this.productService.delete(id)
        
        Swal.fire('Xoá thành công!', '', 'success')
      }
    })
  }


  editItem(item:any){
    this.service.changeData(item);
  }

}
