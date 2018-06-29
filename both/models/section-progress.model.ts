import { CollectionObject } from './collection-object.model';

export interface SectionProgress extends CollectionObject {
  // title: string;
  lessonID: string;
  sectionID: string;
  sectionProgress: number;
  seqNum: number;
  // locked: boolean;
}
