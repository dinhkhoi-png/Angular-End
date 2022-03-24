import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from "../../service/user.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    userForm: FormGroup | any
    isDisable: boolean = true

    constructor(private userService:UserService) {
        //  
    }

    ngOnInit(): void {
        this.initForm()
    }

    initForm() {
        this.userForm = new FormGroup({
            'user_name': new FormControl(null, [Validators.required, Validators.minLength(6)]),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        })
    }

    isAgree() {
        this.isDisable = !this.isDisable
    }

    onSubmit(userForm: NgForm) {
        if (userForm.status == 'VALID') {
            let email = userForm.value.email
            let password = userForm.value.password
           this.userService.register(email,password)
        }

    }



}
