import { SelectionModel } from '@angular/cdk/collections';
import { Directive, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { noData } from '../../constant/messages';

@Directive()
export class Grid<T> {
  @ViewChild(MatTable) protected matTable: MatTable<T> = null;
  @ViewChild(MatSort) protected matSort: MatSort = null;
  @ViewChild(MatPaginator) protected matPaginator: MatPaginator = null;
  public matTableDataSource: MatTableDataSource<T> =
    new MatTableDataSource<T>();
  public matColumns: string[];
  public selectionModel: SelectionModel<T> = new SelectionModel<T>(true, []);

  private _gridMessage: BehaviorSubject<string> = new BehaviorSubject<string>(
    noData
  );
  public readonly gridMessage$: Observable<string> =
    this._gridMessage.asObservable();
  set gridMessage(message: string) {
    this._gridMessage.next(message);
  }

  @Input()
  public set dataSource(data: T[]) {
    this.matTableDataSource.data = data;
  }

  constructor(matColumns: string[]) {
    this.matColumns = matColumns;
  }

  getSelectedRowByIndex(index: number = 0) {
    return this.selectionModel.selected[index];
  }

  get isAllRowsSelected() {
    const numSelected = this.selectionModel.selected.length;
    const numRows = this.matTableDataSource.data.length;
    return numSelected === numRows;
  }

  get isRowSelected() {
    return !!this.selectionModel.selected.length;
  }

  masterRowsSelectionToggle() {
    if (this.isAllRowsSelected) {
      this.selectionModel.clear();
      return;
    }
    this.selectionModel.select(...this.matTableDataSource.data);
  }

  rowSelectionToggle(row: T) {
    this.selectionModel.toggle(row);
  }

  clearAllRowsSelection() {
    this.selectionModel.clear();
  }

  getData(): T[] {
    return [...this.matTableDataSource.data];
  }

  addRow(row: T): T[] {
    let data = this.matTableDataSource.data;
    data.push(row);
    this.matTableDataSource._updateChangeSubscription();
    return data;
  }

  editRow(row: T, oldRow: T): T[] {
    let data = this.matTableDataSource.data;
    let index = data.indexOf(oldRow);
    data.splice(index, 1, row);
    this.matTableDataSource._updateChangeSubscription();
    return data;
  }

  deleteRow(row: T): T[] {
    let data = this.matTableDataSource.data;
    let index = data.indexOf(row);
    data.splice(index, 1);
    if (!data.length) {
      this.gridMessage = noData;
    }
    this.matTableDataSource._updateChangeSubscription();
    return data;
  }

  reset() {
    this.clearAllRowsSelection();
    this.matTableDataSource.data = [];
  }

  ngAfterViewInit() {
    this.matTableDataSource.sort = this.matSort;
    this.matTableDataSource.paginator = this.matPaginator;
  }
}
