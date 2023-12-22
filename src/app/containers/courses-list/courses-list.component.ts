import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CourseItemType } from '../../models/course-item.type';
import { CoursesService } from '../../services/courses.service';
import { debounceTime, distinctUntilChanged, take } from 'rxjs';
import { ColumnFilterType, ColumnType } from '../../models/column-filter.type';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormType } from 'src/app/models/form.type';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent implements OnInit {
  displayedColumns = ['id', 'image', 'name', 'status'];
  filterCols: ColumnFilterType[] = [
    { name: 'Course Name', column: 'name' },
    { name: 'Course Status', column: 'status' },
    { name: 'Course Instructor', column: 'instructors' },
  ];
  coursesList: CourseItemType[] = [];
  coursesListFiltered: CourseItemType[] = [];

  form: FormGroup<FormType> = this.fb.group({
    selectedProperty: this.fb.control<ColumnType>(''),
    searchValue: this.fb.control<string>(''),
  });

  constructor(
    public coursesService: CoursesService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.coursesService
      .getCoursesList() // cold observable no need to unsubscribe
      .subscribe((data: CourseItemType[]) => {
        this.coursesList = data;
        this.coursesListFiltered = data;
        this.changeDetectorRef.markForCheck();
      });

    this.form.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged()) // and this is a hot observable and you need to unsubscribe
      .subscribe((value) => {
        this.applyFilters(value);
      });
  }

  selectCourse(course: CourseItemType): void {
    this.router.navigate(['courses', course.id]);
  }

  public trackBy(index: number): number {
    return index; // it is fail in real life, you should track by item.id or whatever field you need inside item
  }

  applyFilters(
    value: Partial<{
      selectedProperty: ColumnType;
      searchValue: string;
    }>
  ): void {
    const { selectedProperty, searchValue } = value;

    if (selectedProperty && searchValue) {
      this.coursesListFiltered = this.coursesList.filter(
        (course: CourseItemType) => {
          // with proper form type if you put instructors123, you will have error in IDE
          return selectedProperty === 'instructors'
            ? course[selectedProperty]
                .map((item) => item.name)
                .join(', ')
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            : course[selectedProperty]
                .toLowerCase()
                .includes(searchValue.toLowerCase());
        }
      );
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
