import { EventEmitter } from '@angular/core';

export class AppService {

  clickedFromHome = new EventEmitter<string>();
  
}
