import { Injectable } from '@angular/core';
import { CourseItemType } from '../models/course-item.type';
import { CourseStatusEnums } from '../enums/course-status.enums';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private _coursesList: CourseItemType[] = [
    {
      id: 1,
      name: 'Fundamentals of Credit',
      image: 'https://picsum.photos/100/100',
      status: CourseStatusEnums.draft,
      instructors: [
        {
          name: 'Roli Jain',
          image: 'https://picsum.photos/300/300'
        },
      ]
    },
    {
      id: 2,
      name: 'Accounting Fundamentals',
      image: 'https://picsum.photos/100/100',
      status: CourseStatusEnums.published,
      instructors: [
        {
          name: 'Roli Jain',
          image: 'https://picsum.photos/300/300'
        },
        {
          name: 'Sebastian Taylor',
          image: 'https://picsum.photos/300/300'
        }
      ]
    },
    {
      id: 3,
      name: 'Lithium',
      image:'https://picsum.photos/100/100',
      status: CourseStatusEnums.published,
      instructors: [
        {
          name: 'Sebastian Taylor',
          image: 'https://picsum.photos/300/300'
        }
      ]
    },
  ];

  constructor() { }

  getCoursesList(): Observable<CourseItemType[]> {
    return of(this._coursesList);
  }
}
