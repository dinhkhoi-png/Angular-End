import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm:FormGroup | any

  constructor(private userService:UserService  ) { }
  
  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.userForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }


  
  onSubmit(userForm: NgForm) {
    if (userForm.status == 'VALID') {
        let email = userForm.value.email
        let password = userForm.value.password
       this.userService.login(email,password)
    }

}


}
