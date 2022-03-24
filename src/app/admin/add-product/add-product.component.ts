import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { finalize, map, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { url } from 'inspector';
import { ProductService } from "../../service/product.service";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup | any
  imageSrc: string | any
  // currentFileUpload?: FileUpload;
  percentage = 0;
  fileUploads?: any[];
  fb: any;
  itemsRef: AngularFireList<any> | undefined;
  items: Observable<any[]> | undefined;
  name:any
  price:any
  desc:string=''
  image:string=''


  constructor(
    private storage: AngularFireStorage,
    private productService: ProductService,
    private db: AngularFireDatabase
  ) { 

    
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.productForm = new FormGroup({
      'product_name': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'price': new FormControl(null, [Validators.required, Validators.min(1)]),
      'desc': new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'imageUrl': new FormControl(null, [Validators.required]),
    })
  }


  showImg(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }

  currentFile: any
  fileUpload(event: any) {
    this.currentFile = event.target.files[0];
  }



  onSubmit(productForm: NgForm) {
    if (productForm.status == 'VALID') {
      var n = Date.now();
      const file = this.currentFile;
      const filePath = `RoomsImages/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`RoomsImages/${n}`, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL()
              .subscribe(url => {
                if (url) {
                  this.fb = url
                  delete productForm.value.imageUrl
                  productForm.value.url = url
                  this.clearData()
                  this.add(productForm.value)
                }
              })

          })
        ).subscribe()

      Swal.fire({
        'title': 'Thành công ',
        'icon': 'success'
      })
    } else {
      Swal.fire({
        'title': 'Vui lòng hoàn thành form!!',
        'icon': 'error'
      })
    }

  }
  clearData() {
    this.name=''
    this.price=0
    this.desc=''
    this.image=''
    this.imageSrc=''
  }

  id: number = 0
  add(data: any) {
    this.productService.create(data)
  }


}
