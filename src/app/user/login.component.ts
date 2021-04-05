import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoginPage: boolean;

  constructor(private route: ActivatedRoute) { 
    this.isLoginPage = this.route.snapshot.url.join('') === "login";
  }

  ngOnInit(): void {
  }

  registerUser(form: NgForm) {
    console.log(form.value);
  }

  loginUser(form: NgForm) {
    console.log(form.value);
  }
}
