import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  // tslint:disable-next-line:variable-name
  private _isLoading = false;
  private loading = new BehaviorSubject(false);

  get isLoading(): boolean {
    return this._isLoading;
  }

  get isLoading$(): Observable<boolean> {
    return this.loading;
  }

  public setLoading(isLoading: boolean): void {
    this.loading.next(isLoading);
    this._isLoading = isLoading;
  }
}
