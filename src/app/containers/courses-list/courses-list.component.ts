import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CourseItemType } from '../../models/course-item.type';
import { CoursesService } from '../../services/courses.service';
import { debounceTime, distinctUntilChanged, take } from 'rxjs';
import { ColumnFilterType } from '../../models/column-filter.type';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListComponent implements OnInit{
  displayedColumns = ['id', 'image', 'name', 'status'];
  filterCols: ColumnFilterType[] = [
    {name: 'Course Name', column: 'name'},
    {name: 'Course Status', column: 'status'},
    {name: 'Course Instructor', column: 'instructors'},
  ];
  coursesList: CourseItemType[] = [];
  coursesListFiltered: CourseItemType[] = [];

  form: FormGroup;

  constructor(
    public coursesService: CoursesService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private fb: FormBuilder,
    ) {
    this.form = this.fb.group({
      selectedProperty: [''],
      searchValue: [''],
    });
  }

  ngOnInit() {
    this.coursesService.getCoursesList().pipe(
      take(1)
    ).subscribe( (data: CourseItemType[]) => {
      this.coursesList = data;
      this.coursesListFiltered = data;
      this.changeDetectorRef.markForCheck();
    });

    this.form.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.applyFilters();
    });
  }

  selectCourse(course: CourseItemType) {
    this.router.navigate(['courses', course.id]);
  }

  public trackBy(index: number): number {
    return index;
  }

  applyFilters(): void {
    const { selectedProperty, searchValue } = this.form.value;

    if (selectedProperty && searchValue) {
      this.coursesListFiltered = this.coursesList.filter((course: CourseItemType) =>{
        if (selectedProperty === 'instructors') {
          return course[selectedProperty].map(item => item['name']).join(', ').toLowerCase().includes(searchValue.toLowerCase());
        } else {
          return course[selectedProperty].toLowerCase().includes(searchValue.toLowerCase());
        }
      });
    } else {
      this.coursesListFiltered = this.coursesList;
    }
    this.changeDetectorRef.markForCheck();
  }

  clearFilter(): void {
    this.coursesListFiltered = this.coursesList;
    this.form.reset();
  }
}


