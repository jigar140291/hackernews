import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private IndexDb: IDBFactory;
  public db: IDBDatabase;
  private dbName: string = "news";

  constructor() { 
    this.IndexDb = window.indexedDB;
    this.initConnection();
  }

  private initConnection(){
    let request:IDBOpenDBRequest = this.IndexDb.open(this.dbName);
    request.onerror = (err) => {
      console.log('onerror!');
      console.dir(err);
    };
    request.onupgradeneeded = this.addTables;
    request.onsuccess = (e: any) => {
      this.db = e.target.result;
    };
  }

  private addTables(e){
    this.db = e.target.result;
    console.log('Initializing DB update..');
    /**TODO: Added only users table for now and this can be configured */
    if(!this.db.objectStoreNames.contains('users')) {
      this.db.createObjectStore('users', {keyPath: 'username'});
    }
    if(!this.db.objectStoreNames.contains('stories')) {
      this.db.createObjectStore('stories', {keyPath: 'id'});
    }
  }

  public getStore(storeName: string){
    let dataSource = this.db.transaction(storeName, 'readwrite');
    return dataSource.objectStore(storeName);
  }
}
