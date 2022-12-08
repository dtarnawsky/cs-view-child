import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public async getObject(key: string): Promise<string> {
    return '1';
  }
}
