import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CoursesListComponent } from './containers/courses-list/courses-list.component';
import { CourseDetailsComponent } from './containers/course-details/course-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full',
  },
  {
    path: 'courses',
    component: CoursesListComponent,
  },
  {
    path: 'courses/:id',
    component: CourseDetailsComponent, // no lazy loading
    pathMatch: 'full',
  },

  {
    path: 'page-not-found',
    component: PageNotFoundComponent, // no lazy loading
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
