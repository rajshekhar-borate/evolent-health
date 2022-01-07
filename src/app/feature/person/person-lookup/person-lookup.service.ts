import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Person } from '../../../shared/model/person';
import { Utils } from '../../../shared/utils/utils';
import { PERSONS } from '../../../_mock-backend';

@Injectable()
export class PersonLookupService {
  constructor() {}

  search(searchCriteria: any) {
    return of<Person[]>(Utils.filterBySearchCriteria(PERSONS, searchCriteria));
  }

  delete(personId: number) {
    return of(true);
  }
}
