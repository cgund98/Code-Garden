import { CollectionObject } from './collection-object.model';

export interface LessonSection extends CollectionObject {
  title: string;
  content: any;
  expressions: string;
  outputs: string;
  tasks: string;
  seqNum: number;
  lessonID: string;
}
