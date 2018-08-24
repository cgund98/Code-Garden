import { CollectionObject } from './collection-object.model';

export interface Course extends CollectionObject {
  title: string;
  fullDesc: string;
  shortDesc: string;
  private: boolean;
  language: string;
  authorID: string;
  date: string;
  published: boolean;
  createdAt: Date;
}
