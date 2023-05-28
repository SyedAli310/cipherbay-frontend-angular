import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class EventEmiterService {

  event:any = new EventEmitter();

  constructor() { }

  emitEvent(data: any) {
    this.event.emit(data);
  }
}