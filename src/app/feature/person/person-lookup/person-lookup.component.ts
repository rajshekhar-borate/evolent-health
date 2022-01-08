import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { mergeMap, takeUntil, tap } from 'rxjs/operators';
import { LocalCacheService } from '../../../core/service/local-cache.service';
import { PersonGridComponent } from '../../../shared/component/grid/person-grid/person-grid.component';
import { noDataMatchingSearchCriteria } from '../../../shared/constant/messages';
import { PageMode } from '../../../shared/enum/page-mode.enum';
import { Person } from '../../../shared/model/person';
import { Utils } from '../../../shared/utils/utils';
import { PERSONS } from '../../../_mock-backend';
import { PersonLookupService } from './person-lookup.service';

@Component({
  selector: 'app-person-lookup',
  templateUrl: './person-lookup.component.html',
  styleUrls: ['./person-lookup.component.scss'],
})
export class PersonLookupComponent implements OnInit {
  @ViewChild('searchForm') searchForm: NgForm;
  @ViewChild('appPersonGrid') public personGridComponent: PersonGridComponent;
  vm$ = this.localCacheService.personLookupSearchVMState$;
  personGridData$: Observable<Person[]>;
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private localCacheService: LocalCacheService,
    private personLookupService: PersonLookupService
  ) {}

  ngOnInit() {
    this.loadGridData();
  }

  loadGridData() {
    if (this.localCacheService.pageMode !== PageMode.update) {
      this.personGridData$ = this.localCacheService.personLookupGridState$.pipe(
        tap(console.log)
      );
      return;
    }

    this.personGridData$ =
      this.localCacheService.personLookupSearchVMState$.pipe(
        mergeMap((vm) => {
          console.log(vm);
          let searchCriteria = Utils.removeEmptyProperties(vm);
          return this.personLookupService.search(searchCriteria);
        })
      );
  }

  search() {
    let searchCriteria = Utils.removeEmptyProperties(this.searchForm.value);
    this.personGridData$ = this.personLookupService.search(searchCriteria).pipe(
      tap((data: Person[]) => {
        if (!data.length) {
          this.personGridComponent.gridMessage = noDataMatchingSearchCriteria;
        }
      })
    );
  }

  reset() {
    this.searchForm.reset();
    this.personGridComponent.reset();
  }

  open() {
    this.localCacheService.pageMode = PageMode.read;
    this.router.navigate([
      `/person-details/${
        this.personGridComponent.getSelectedRowByIndex(0).personId
      }`,
    ]);
  }

  create() {
    this.localCacheService.pageMode = PageMode.new;
    this.router.navigate([`/person-details/0`]);
  }

  delete() {
    this.personLookupService
      .delete(this.personGridComponent.getSelectedRowByIndex(0).personId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        let selectedRow = this.personGridComponent.getSelectedRowByIndex(0);
        this.personGridComponent.deleteRow(selectedRow);
        this.personGridComponent.clearAllRowsSelection();
        PERSONS.splice(PERSONS.indexOf(selectedRow), 1);
      });
  }

  ngOnDestroy() {
    this.localCacheService.personLookupSearchVMState = this.searchForm.value;
    this.localCacheService.personLookupGridState =
      this.personGridComponent.getData();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
