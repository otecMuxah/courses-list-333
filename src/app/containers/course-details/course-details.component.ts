import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { take } from 'rxjs';
import { CourseDetailsType } from '../../models/course-details.type';
import { CourseStatusEnums } from '../../enums/course-status.enums';
import { InstructorsType } from '../../models/instructors.type';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailsComponent implements OnInit {
  courseId: number;
  courseForm: FormGroup; // untyped form = bad
  course: CourseDetailsType;
  instructors: InstructorsType[];
  courseStatus = [CourseStatusEnums.draft, CourseStatusEnums.published];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    public activeRoute: ActivatedRoute,
    public coursesService: CoursesService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.courseId = this.activeRoute.snapshot.params['id']; // in modern angular you dint need activatedRoute to get :id
    if (this.courseId && !isNaN(this.courseId)) {
      this.coursesService.getCourse(this.courseId).subscribe((course) => {
        this.course = course;
        this.instructors = course.instructors;
        this._initForm(this.course);
        this.changeDetectorRef.markForCheck();
      });
    } else {
      this.router.navigate(['page-not-found']);
    }
  }

  private _initForm(course: CourseDetailsType): void {
    this.courseForm = this.fb.group({
      // untyped form = bad
      name: [course.name],
      status: [course.status],
      instructors: [course.instructors],
    });
  }

  public trackBy(index: number): number {
    return index; // it should track against item
  }

  back() {
    this.router.navigate(['courses']);
  }
}
