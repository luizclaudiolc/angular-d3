import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class GenerateUuidService {

  constructor() { }

  generateUuid(): string {
    return uuidv4().replace(/-/g, '').slice(2, 12);
  }
}
