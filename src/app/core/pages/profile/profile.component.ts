import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private readonly usersService: UsersService) {  }

  profileForm = new FormGroup({
    username: new FormControl('', Validators.pattern('[a-zA-Z0-9 ]{0,20}')),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl(null)
  })  

  updateForm(data: User) {
    this.profileForm.setValue({
      username: data.username,
      email: data.email,
      age: data.age
    })
  }

  ngOnInit(): void {
    this.usersService.getCurrentUser()
      .subscribe(res => {
        this.updateForm(res as User)
      })
  }

  editProfile(form: any) {
    this.usersService.updateCurrentUser({
      username: form.value.username,
      email: form.value.email,
      age: form.value.age
    })
  }

}