import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Person } from '../../../model/person';
import { personLookupColumns } from '../../../constant/grid-col-def';
import { Grid } from '../grid';

@Component({
  selector: 'app-person-grid',
  templateUrl: './person-grid.component.html',
  styleUrls: ['./person-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonGridComponent extends Grid<Person> {
  constructor() {
    super(personLookupColumns);
  }
}
