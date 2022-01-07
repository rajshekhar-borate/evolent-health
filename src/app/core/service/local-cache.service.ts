import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageMode } from '../../shared/enum/page-mode.enum';
import { Person } from '../../shared/model/person';

@Injectable({
  providedIn: 'root',
})
export class LocalCacheService {
  private _pageMode: PageMode = null;
  private _pageMode$: BehaviorSubject<PageMode> = new BehaviorSubject<PageMode>(
    null
  );
  public readonly PageMode$: Observable<PageMode> =
    this._pageMode$.asObservable();

  get PageMode() {
    return this._pageMode;
  }

  set pageMode(pageMode: PageMode) {
    this._pageMode = pageMode;
    this._pageMode$.next(pageMode);
  }

  private _personLookupSearchVMState = new BehaviorSubject<Person>(
    new Person()
  );
  public readonly personLookupSearchVMState$ =
    this._personLookupSearchVMState.asObservable();

  set personLookupSearchVMState(state: Person) {
    this._personLookupSearchVMState.next(state);
  }

  private _personLookupGridState = new BehaviorSubject<Person[]>([]);
  public readonly personLookupGridState$ =
    this._personLookupGridState.asObservable();

  set personLookupGridState(state: Person[]) {
    this._personLookupGridState.next(state);
  }

  constructor() {}
}
