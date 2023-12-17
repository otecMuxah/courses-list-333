import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CourseItemType } from '../../models/course-item.type';
import { CoursesService } from '../../services/courses.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListComponent implements OnInit{
  displayedColumns = ['id', 'image', 'name', 'status'];
  coursesList$: Observable<CourseItemType[]> = of([]);

  constructor(public coursesService: CoursesService) { }

  ngOnInit() {
    this.coursesList$ = this.coursesService.getCoursesList();
  }

  selectCourse(course: CourseItemType) {
    console.log('**', course);
  }
}


