import { Injectable } from '@angular/core';
import { DbService } from './db.service';

interface IUser {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userState:IUser=null;
  
  constructor(private dbService: DbService) { }

  register(user: IUser){
    return new Promise((resolve, reject) => {
      let store = this.dbService.getStore('users');
      let req = store.add(user);
      req.onerror = (e:any) => reject(e.target.error)
      req.onsuccess = (e:any) => resolve(e.target.result)
    });
  }

  login(user: IUser){
    return new Promise((resolve, reject) => {
      let store = this.dbService.getStore('users');
      let req = store.get(user.username);

      req.onerror = (e:any) => reject(e.target.error)
      req.onsuccess = (e:any) => {
        this.userState = e.target.result;
        let val = e.target.result;
        if(!val) reject({message: 'User Not Found !!'})
        else resolve(val)
      }
    });
  }
}
