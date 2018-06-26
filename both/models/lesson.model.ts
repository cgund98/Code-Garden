import { CollectionObject } from './collection-object.model';

export interface Lesson extends CollectionObject {
  title: string;
  lessonNum: number;
  courseID: string;
  course: string;
}
