import { Injectable } from '@angular/core';

import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  public isLoginPopupOpen = new BehaviorSubject<boolean>(false);

  constructor() {}

  // login popup handlers
  openLoginPopup() {
    this.isLoginPopupOpen.next(true);
  }
  closeLoginPopup() {
    console.log('closeLoginPopup');

    this.isLoginPopupOpen.next(false);
  }

  // other handlers
}
