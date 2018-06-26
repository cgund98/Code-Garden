import { CollectionObject } from './collection-object.model';

export interface Course extends CollectionObject {
  title: string;
  fullDesc: string;
  shortDesc: string;
  private: boolean;
  language: string;
  author: string;
  admins: Array<string>;
  date: string;
  createdAt: Date;
}
