import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {SignupRequestPayload} from "./singup-request.payload";
import {AuthService} from "../../../shared/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm = this.fb.group({
   username: ['', Validators.required],
   email: ['', [Validators.required, Validators.email]],
   password: ['', Validators.required],
 });

  signupPayload: SignupRequestPayload;

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router, private toastr: ToastrService) {
    this.signupPayload = {
      username: '',
      email: '',
      password: '',
    }
  }

  ngOnInit() {}

  signup() {
    // this.signupPayload.username = this.signupForm.controls['username'].value;
    this.signupPayload= this.signupForm.value;
    this.authService.signup(this.signupPayload)
      .subscribe(data => {
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      },(error)=>{
        this.toastr.error('Registration Failed! Please try again');
    });
  }
}
