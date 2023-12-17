import { InstructorsType } from './instructors.type';
import { CourseStatusEnums } from '../enums/course-status.enums';

export type CourseItemType = {
  id: number,
  name: string,
  image: string,
  status: CourseStatusEnums,
  instructors: InstructorsType[];
}
