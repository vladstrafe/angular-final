import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    profileForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl(null)
    })  
  }

}
//test
