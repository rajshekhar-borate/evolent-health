import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { LocalCacheService } from '../../../core/service/local-cache.service';
import { PageMode } from '../../../shared/enum/page-mode.enum';
import { Person } from '../../../shared/model/person';
import { PersonDetailsService } from './person-details.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss'],
})
export class PersonDetailsComponent implements OnInit {
  vm: Person;
  PersonId: number = 0;
  @ViewChild('detailsForm') detailsForm: NgForm;
  unsubscribe$: Subject<void> = new Subject<void>();
  get pageMode() {
    return this.localCacheService.pageMode;
  }

  set pageMode(pageMode: PageMode) {
    this.localCacheService.pageMode = pageMode;
  }

  //fetch data
  vm$ = this.activatedRoute.paramMap.pipe(
    map((param) => {
      return (this.PersonId = +param.get('personId'));
    }),
    switchMap((personId) => {
      if (!personId) {
        this.pageMode = PageMode.new;
        return of(new Person());
      }
      return this.personDetailsService.getById(personId);
    }),
    tap((data) => {
      this.vm = { ...data };
    })
  );

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private personDetailsService: PersonDetailsService,
    private localCacheService: LocalCacheService
  ) {}

  ngOnInit() {}

  save() {}

  cancel() {}
}
