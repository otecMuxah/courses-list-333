import { Injectable } from '@angular/core';
import { CourseItemType } from '../models/course-item.type';
import { Observable} from 'rxjs';
import { CourseDetailsType } from '../models/course-details.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private _apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCoursesList(): Observable<CourseItemType[]> {
    return this.http.get<CourseItemType[]>(`${this._apiUrl}/courses`);
  }

  getCourse(id: number): Observable<CourseDetailsType> {
    return this.http.get<CourseDetailsType>(`${this._apiUrl}/courses/${id}`);
  }
}
