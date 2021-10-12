import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/services/alert/alert.service';
import { Subject } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userColumns: {label: string, value: string, length: string}[] = [
    {label: 'Name', value: 'name', length: '40%'},
    {label: 'Password', value: 'password', length: '20%'},
    {label: 'Roles', value: 'roles', length: '30%'}
  ];
  users: {id: string | undefined, name: string | undefined, password: string | undefined, roles: string | undefined}[] = [];

  viewUser: Subject<any> = new Subject<any>();
  editUser: Subject<any> = new Subject<any>();
  removeUser: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
    private alertService: AlertService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.listUsers();

    this.viewUser.subscribe(user => {
      this.router.navigate([`/user/view/${user.name}`]);
    });
    this.editUser.subscribe(user => {
      this.router.navigate([`/user/edit/${user.name}`]);
    });
    this.removeUser.subscribe(user => {
      this.userService.delete(user.id).subscribe(() => {
        this.alertService.triggerSuccess('User successfully delete');
        this.listUsers();
      });
    });
  }

  listUsers(): void {
    this.userService.listAll().subscribe(users => {
      this.users = users.map(u => {
        return {id: u.id, name: u.name, password: u.password ? '****' : '', roles: u.roles.map(r => r.name).join(',')};
      });
    });
  }

  orderUsersByName(): void {
    this.users = this.users.sort((u1, u2) => {
      if ((u1.name && u2.name) && u1.name.toUpperCase() > u2.name.toUpperCase()) {
        return 1;
      }
      else if ((u1.name && u2.name) && u1.name.toUpperCase() < u2.name.toUpperCase()) {
        return -1;
      }
      return 0;
    });
  }

  addUser(): void {
    this.router.navigate(['/user/add']);
  }
}
