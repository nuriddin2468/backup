import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Credentials} from './dto/credentials';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public constructor(private http: HttpClient) {
  }

  public login(email: string, password: string): Observable<Credentials> {
    return this.http.post<Credentials>( 'login', {email, password});
  }

  // public async test(){
  //   return await this.http.get<{anime: string}>('https://animechan.vercel.app/api/random').toPromise();
  // }
}
