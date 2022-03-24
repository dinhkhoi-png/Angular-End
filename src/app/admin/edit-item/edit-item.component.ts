import { Component, OnInit } from '@angular/core';
import { ChangeDataService } from "../../service/change-data.service";
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { finalize, map, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ProductService } from "../../service/product.service";
import { AngularFireDatabase, AngularFireList, } from '@angular/fire/compat/database';



@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  productForm: FormGroup | any
  imageSrc: string | any
  // currentFileUpload?: FileUpload;
  percentage = 0;

  fileUploads?: any[];
  fb: any;
  data: any;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  name: any
  price: any;
  desc: any;
  url: any;
  urlInput: any;


  constructor(
    private service: ChangeDataService,
    private storage: AngularFireStorage,
    private productService: ProductService,
    private db: AngularFireDatabase
  ) {
    this.itemsRef = db.list('product');
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  ngOnInit(): void {
    this.service.data$.subscribe((res: any) => {
      this.data = res
      console.log(this.data);
    })
    this.onLoadData()
    this.initForm()
  }

  onLoadData() {
    this.name = this.data.product_name
    this.price = this.data.price
    this.desc = this.data.desc
    this.imageSrc = this.data.url
    this.urlInput = this.data.url
  }

  initForm() {
    this.productForm = new FormGroup({
      'product_name': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'price': new FormControl(null, [Validators.required, Validators.min(1)]),
      'desc': new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'imageUrl': new FormControl(this.urlInput, []),
    })
  }

  currentFile: any
  fileUpload(event: any) {
    this.currentFile = event.target.files[0];
  }

  key: string = 'id'
  onSubmit(productForm: NgForm) {
    if (productForm.status == 'VALID') {
      if (this.currentFile?.name) {
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
                    // this.clearData()
                    this.productService.update(this.data.id, productForm.value)
                  }
                })

            })
          ).subscribe()
      }else{
        this.productService.update(this.data.id, productForm.value)
      }

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



  showImg(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }




}
