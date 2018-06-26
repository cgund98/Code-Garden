import { CollectionObject } from './collection-object.model';

export interface LessonSection extends CollectionObject {
  title: string;
  content: string;
  expressions: string;
  outputs: string;
  tasks: string;
  sectionNum: number;
  lessonID: string;
}
