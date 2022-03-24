import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  Auth
} from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router:Router) {

  }

  register(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);

        Swal.fire({
          title: 'Đăng kí thành  công',
          icon: 'success'
        })
        .then((res)=>{
          if (res.isConfirmed == true) {
            // window.location.reload()
            this.router.navigate(['/admin/login']);
          }
          
        })
        
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: 'Email đã tồn tại',
          icon: 'error'
        })
      })

  }


  login(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        let user = res.user.email
        localStorage.setItem('user',user||'')
        Swal.fire({
          title: 'Đăng nhập thành  công',
          icon: 'success',
          allowEnterKey:true
        })
        .then((res)=>{
          if (res.isConfirmed == true) {
            // window.location.reload()
            this.router.navigate(['/home']);
          }
          
        })
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: 'Tài khoản chưa đăng kí!!',
          icon: 'error'
        })
        this.router.navigate(['/admin/register']);
      })
  }

  logOut(){
    const auth = getAuth();
    signOut(auth)
    .then(res=>{
      localStorage.removeItem('user')
      Swal.fire({
        title: 'Đăng xuất thành công',
        icon: 'success',
        allowEnterKey:true
      })
      .then((res)=>{
        if (res.isConfirmed == true) {
          window.location.reload()
        }
        
      })
    })
    .catch(err=>console.log(err))
  }


}
