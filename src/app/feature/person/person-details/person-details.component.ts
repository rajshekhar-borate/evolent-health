import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, Subject, takeUntil } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { LocalCacheService } from '../../../core/service/local-cache.service';
import { PageMode } from '../../../shared/enum/page-mode.enum';
import { Person } from '../../../shared/model/person';
import { PersonDetailsService } from './person-details.service';
import { PERSONS } from '../../../_mock-backend';
import { CanComponentDeactivate } from '../../../core/guard/can-deactivate.guard';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss'],
})
export class PersonDetailsComponent implements CanComponentDeactivate {
  canDeactivate = () => {
    if (this.detailsForm.pristine) {
      return true;
    }
    return confirm(`Your changes will be lost. Are you sure to cancel?`);
  };

  vm: Person;
  personId: number = 0;
  @ViewChild('detailsForm') detailsForm: NgForm;
  unsubscribe$: Subject<void> = new Subject<void>();
  phoneNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  get pageMode() {
    return this.localCacheService.pageMode;
  }

  set pageMode(pageMode: PageMode) {
    this.localCacheService.pageMode = pageMode;
  }

  //fetch data
  vm$ = this.activatedRoute.paramMap.pipe(
    map((param) => {
      return (this.personId = +param.get('personId'));
    }),
    switchMap((personId) => {
      if (!personId) {
        console.log(personId);
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
    private location: Location,
    private personDetailsService: PersonDetailsService,
    private localCacheService: LocalCacheService
  ) {}

  save() {
    console.log(this.pageMode);
    if (this.pageMode === PageMode.new) {
      console.log(this.detailsForm.value);
      this.detailsForm.valid &&
        this.personDetailsService
          .create({ personId: this.personId, ...this.detailsForm.value })
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((data: Person) => {
            this.location.replaceState(`/person-details/${data.personId}`);
            this.vm = data;
            this.personId = data.personId;
            this.pageMode = PageMode.update;
            this.detailsForm.control.updateValueAndValidity({
              onlySelf: false,
              emitEvent: true,
            });
            PERSONS.push(data);
          });
    } else {
      this.detailsForm.valid &&
        this.personDetailsService
          .update(this.detailsForm.value)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((data: Person) => {
            this.vm = data;
            this.pageMode = PageMode.update;
            this.detailsForm.control.updateValueAndValidity({
              onlySelf: false,
              emitEvent: true,
            });
            let index = PERSONS.findIndex(
              (element) => element.personId === this.personId
            );
            PERSONS.splice(index, 1, { personId: this.personId, ...data });
          });
    }
  }

  cancel() {
    this.router.navigate([`/person-lookup`]);
  }

  ngAfterViewInit() {
    this.detailsForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((changes) => {
        for (let prop in changes) {
          if (changes[prop] === this.vm[prop]) {
            this.detailsForm.control.get(prop).markAsPristine();
          }
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
