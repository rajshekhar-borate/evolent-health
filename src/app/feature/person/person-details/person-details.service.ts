import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Person } from '../../../shared/model/person';
import { PERSONS } from '../../../_mock-backend';

@Injectable()
export class PersonDetailsService {
  constructor() {}

  getById(personId: number) {
    return of({ ...PERSONS.find((person) => person.personId === personId) });
  }

  create(data: Person) {
    data.personId = PERSONS.length + 1;
    return of(data);
  }

  update(data: Person) {
    return of(data);
  }
}
