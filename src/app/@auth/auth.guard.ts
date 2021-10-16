import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Storage} from '@capacitor/storage';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    public constructor(private router: Router) {
    }

    public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const apiKey = await Storage.get({key: 'apiToken'});
        if (apiKey.value) {
            console.log(true, apiKey.value);
            return true;
        } else {
            console.log(false);
            await this.router.navigateByUrl('/auth/login');
            return false;
        }
    }
}
