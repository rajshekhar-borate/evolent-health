import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'person-lookup',
    loadChildren: () =>
      import('./feature/person/person-lookup/person-lookup.module').then(
        (m) => m.PersonLookupModule
      ),
  },
  {
    path: 'person-details/:personId',
    loadChildren: () =>
      import('./feature/person/person-details/person-details.module').then(
        (m) => m.PersonDetailsModule
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: 'person-lookup' },
  {
    path: '**',
    loadChildren: () =>
      import('./core/component/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
