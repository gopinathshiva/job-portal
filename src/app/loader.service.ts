import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  // tslint:disable-next-line:variable-name
  private _isLoading = false;

  get isLoading(): boolean {
    return this._isLoading;
  }

  public setLoading(isLoading: boolean): void {
    this._isLoading = isLoading;
  }
}
