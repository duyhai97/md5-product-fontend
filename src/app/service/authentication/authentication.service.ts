import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
// import {UserToken} from "../../models/user-token";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import { UserToken } from 'src/app/models/user-token';
import { User } from 'src/app/models/user';
// import {User} from "../../models/user";

const URL= 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>


  constructor(private http: HttpClient,
              private router: Router) {

    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(<string>localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  create(data: User): Observable<User> {
    return this.http.post(URL + '/signup', data);
  }

  getById(id: any): Observable<User> {
    return this.http.get(`${URL}/${id}`);
  }

  update(id: any, data: User): Observable<User> {
    return this.http.put(`${URL}/${id}`, data);
  }


  login(username: string, password: string) {
    return this.http.post<any>(URL + '/login', {username, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  get currentUserValue(){
    return this.currentUserSubject.value;
    console.log(this.currentUserSubject.value)
  }



  logout() {
    localStorage.removeItem('user')

    // this.currentUserSubject.next(null)
    this.router.navigate(['/login'])
  }

}
