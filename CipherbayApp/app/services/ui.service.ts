import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  public isLoginPopupOpen = new BehaviorSubject<boolean>(false);
  fromAuthGuard: boolean = false;
  constructor(public router: Router) {}

  // login popup handlers
  openLoginPopup(fromAuthGuard: boolean = false) {
    this.isLoginPopupOpen.next(true);
    this.fromAuthGuard = fromAuthGuard;
  }
  closeLoginPopup() {
    this.isLoginPopupOpen.next(false);
    if(this.fromAuthGuard) {
      this.router.navigate(['/home'])
    }
  }

  // other handlers
}
