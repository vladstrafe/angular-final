import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Token } from '../../models/token';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  authForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      // Validators.pattern('[a-zA-Z0-9]')
    ])
  })

  onSubmit(form: any) {
    this.authService.regUser(form.value)
      .subscribe()
  }

  login(form: any) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    })    
      .subscribe(res => {
        if (res.hasOwnProperty('jwt_token')) {
          const response = res as Token
          document.cookie = `user=${response.jwt_token}`
          this.router.navigate(['../games'])
        }
      })
  }

}
