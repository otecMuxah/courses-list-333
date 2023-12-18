import { CourseStatusEnums } from '../enums/course-status.enums';
import { InstructorsType } from './instructors.type';

export type CourseBaseType = {
  id: number,
  name: string,
  status: CourseStatusEnums,
  instructors: InstructorsType[];
}
