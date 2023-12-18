import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CoursesListComponent } from './courses-list.component';
import { CoursesService } from '../../services/courses.service';
import { of } from 'rxjs';
import { CourseItemType } from '../../models/course-item.type';
import { CourseStatusEnums } from '../../enums/course-status.enums';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { fakeAsync, tick } from '@angular/core/testing';
import { ObjectPropertyPipe } from '../../pipes/object-property.pipe';

fdescribe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let coursesServiceSpy: jasmine.SpyObj<CoursesService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('CoursesService', ['getCoursesList']);

    TestBed.configureTestingModule({
      declarations: [CoursesListComponent, ObjectPropertyPipe,],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTableModule,
        MatSelectModule,
        MatInputModule,
        MatChipsModule,
        MatIconModule,
      ],
      providers: [{ provide: CoursesService, useValue: spy }],
    }).compileComponents();

    coursesServiceSpy = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch courses list on initialization', () => {
    const mockCourses: CourseItemType[] = [
      {
        id: 1,
        name: 'Course 1',
        status: CourseStatusEnums.published,
        image: 'https://picsum.photos/100/100',
        instructors: []
      }
    ];

    coursesServiceSpy.getCoursesList.and.returnValue(of(mockCourses));

    fixture.detectChanges();

    expect(component.coursesList).toEqual(mockCourses);
    expect(component.coursesListFiltered).toEqual(mockCourses);
  });

  it('should apply filters when form values change', fakeAsync(() => {
    const mockCourses: CourseItemType[] = [
      { id: 1, name: 'Course 1', status: CourseStatusEnums.published, instructors: [], image: 'https://picsum.photos/100/100', },
      { id: 2, name: 'Course 2', status: CourseStatusEnums.draft, instructors: [], image: 'https://picsum.photos/100/100', },
    ];

    const expectedFilteredCourses: CourseItemType[] = [{
      id: 2,
      name: 'Course 2',
      status: CourseStatusEnums.draft,
      image: 'https://picsum.photos/100/100',
      instructors: []
    }];

    coursesServiceSpy.getCoursesList.and.returnValue(of(mockCourses));

    fixture.detectChanges();

    component.form.patchValue({ selectedProperty: 'status', searchValue: CourseStatusEnums.draft });
    tick(400);
    fixture.detectChanges();
    expect(component.coursesListFiltered).toEqual(expectedFilteredCourses);
  }));

  it('should navigate to course details page on selectCourse', () => {
    const navigateSpy = spyOn((component as any).router, 'navigate');

    const mockCourse =  {
      id: 1,
      name: 'Course 1',
      status: CourseStatusEnums.published,
      image: 'https://picsum.photos/100/100',
      instructors: []
    };

    component.selectCourse(mockCourse);

    expect(navigateSpy).toHaveBeenCalledWith(['courses', mockCourse.id]);
  });

  it('should reset filters on clearFilter', fakeAsync(() => {
    const mockCourses: CourseItemType[] = [
      { id: 1, name: 'Course 1', status: CourseStatusEnums.published, instructors: [], image: 'https://picsum.photos/100/100', },
      { id: 2, name: 'Course 2', status: CourseStatusEnums.draft,
        instructors: [{
          name: 'Roli Jain',
          image: 'https://picsum.photos/300/300'
        },],
        image: 'https://picsum.photos/100/100', },
    ];

    const expectedFilteredCourses: CourseItemType[] = [{
      id: 2,
      name: 'Course 2',
      status: CourseStatusEnums.draft,
      image: 'https://picsum.photos/100/100',
      instructors: [
        {
          name: 'Roli Jain',
          image: 'https://picsum.photos/300/300'
        },
      ]
    }];

    coursesServiceSpy.getCoursesList.and.returnValue(of(mockCourses));

    fixture.detectChanges();

    component.form.patchValue({ selectedProperty: 'instructors', searchValue: 'Roli' });
    tick(400);
    fixture.detectChanges();
    expect(component.coursesListFiltered).toEqual(expectedFilteredCourses);

    component.clearFilter();
    tick(400);
    fixture.detectChanges();

    expect(component.coursesListFiltered).toEqual(mockCourses);
    expect(component.form.value).toEqual({ selectedProperty: null, searchValue: null });
  }));
});
