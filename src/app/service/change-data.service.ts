import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeDataService {
  private data = new BehaviorSubject('default data');
  data$ = this.data.asObservable();

  changeData(data: string) {
    this.data.next(data)
  }




  // Menu
  private dataRes= new BehaviorSubject('cart value');
  dataRes$ = this.dataRes.asObservable();

  cartTotal(data: any) {
    this.dataRes.next(data)
  }
  
  constructor() { }
}
