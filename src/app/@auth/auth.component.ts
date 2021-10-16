import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {EMPTY} from 'rxjs';
import {Storage} from '@capacitor/storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  public email: string;
  public password: string;
  public showErr = false;
  public anime: string;
  public constructor(
      private authService: AuthService,
      private router: Router
  ) { }

  public async ngOnInit() {
  }

  public ngOnDestroy(): void {
  }

  public signIn() {
    this.authService.login(this.email, this.password).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        this.showErr = true;
        this.password = '';
        return EMPTY;
      })).subscribe(
      async (data) => {
        this.showErr = false;
        await Storage.set({
          key: 'apiToken', value: data.token,
        });
        await Storage.set({
          key: 'name', value: data.name,
        });
        await this.router.navigateByUrl('/pages/dashboard');
      }
    );
  }
}
