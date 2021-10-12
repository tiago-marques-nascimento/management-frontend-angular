import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { UserService } from '../../services/user.service';
import { Role, User } from '../../models/user.model';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManageComponent implements OnInit {

  edit = false;
  view = false;

  roles: Role[] = [];
  user: User = new User();

  roleCheckboxLabels: { label: string | undefined }[] = [];
  roleCheckboxes: boolean[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private userService: UserService,
    private roleService: RoleService) {
  }

  ngOnInit(): void {

    this.roleService.listAll().subscribe(roles => {

      this.roles = roles;
      this.roleCheckboxLabels = roles.map(r => {
        return { label: r.name };
      });
      this.roleCheckboxes = [];
      this.view = this.router.url.startsWith('/user/view');

      let name: string | undefined;
      this.route.params.forEach((params: Params) => {
        if (params.name) {
          name = params.name;
        }
      });

      if (name) {
        this.userService.find(name).subscribe(user => {
          this.user = user;

          this.roles.forEach(role => {
            this.roleCheckboxes.push(user.roles.filter(r => r.name === role.name).length > 0);
          });
        });
      } else {
        this.roleCheckboxes = roles.map(r => false);
      }
    });
  }

  confirm(): void {
    this.user.roles = [];
    this.roleCheckboxes.forEach((roleCheckbox, i) => {
      if (roleCheckbox) {
        this.user.roles.push(this.roles[i]);
      }
    });
    if (this.validate()) {
      this.userService.save(this.user).subscribe(() => {
        this.alertService.triggerSuccess('User successfully saved');
        this.router.navigate(['/user']);
      });
    }
  }

  validate(): boolean {
    if (!this.user.name || this.user.name.length === 0) {
      this.alertService.triggerError('Please provide a name');
      return false;
    } else if (!this.user.password || this.user.password.length === 0) {
      this.alertService.triggerError('Please provide a password');
      return false;
    } else if (this.user.roles.length === 0) {
      this.alertService.triggerError('Please select at least one role');
      return false;
    }
    return true;
  }

  cancel(): void {
    this.router.navigate(['/user']);
  }
}
