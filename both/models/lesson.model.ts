import { CollectionObject } from './collection-object.model';

export interface Lesson extends CollectionObject {
  title: string;
  seqNum: number;
  courseID: string;
  course: string;
}
