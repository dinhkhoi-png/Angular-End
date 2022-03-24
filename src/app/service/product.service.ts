import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: any

  constructor(private afs: AngularFirestore) {
  }



  getAllProduct() {
    return this.afs.collection('product')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  create(data: any) {
    this.afs.collection('product').add(data)
  }



  delete(id: any) {
    this.afs.collection('product').doc(id).delete()
  }


  update(id:any,data:any){
    this.afs.collection('product').doc(id).update(data)
  }

}
