import { Injectable } from '@angular/core';
import { DbService } from './db.service';

interface IUser {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private dbService: DbService) { }

  register(user: IUser){
    return new Promise((resolve, reject) => {
      let store = this.getStore('users');
      let req = store.add(user);
      req.onerror = (e:any) => reject(e.target.error)
      req.onsuccess = (e:any) => resolve(e.target.result)
    });
  }

  login(user: IUser){
    return new Promise((resolve, reject) => {
      let store = this.getStore('users');
      let req = store.get(user.email);

      req.onerror = (e:any) => reject(e.target.error)
      req.onsuccess = (e:any) => {
        let val = e.target.result;
        if(!val) reject({message: 'User Not Found !!'})
        else resolve(val)
      }
    });
  }

  getStore(storeName: string){
    let dataSource = this.dbService.db.transaction(storeName, 'readwrite');
    return dataSource.objectStore(storeName);
  }
}
