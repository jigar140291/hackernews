import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoginPage: boolean;

  constructor(
    private activeRoute: ActivatedRoute, 
    private userService: UserService, 
    private router: Router) {
    this.isLoginPage = this.activeRoute.snapshot.url.join('') === "login";
  }

  ngOnInit(): void {
  }

  registerUser(form: NgForm) {
    this.userService.register(form.value)
      .then(() => {
        if (window.confirm("Registered successfully, Proceed to Login..")) this.router.navigateByUrl('/login');
      })
      .catch((err) => alert(`${err.message}, Please Retry`))
  }

  loginUser(form: NgForm) {
    this.userService.login(form.value)
      .then((res) => {
        if (window.confirm("Loggedin successfully, Proceed to Stories..")) this.router.navigateByUrl('/new-stories');
      })
      .catch((err) => alert(`${err.message}, Please Retry`))
  }
}
