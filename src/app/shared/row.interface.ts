import { ISeat } from './seat.interface';

export interface IRow {
  id: string;
  row: string;
  seats: Array<ISeat>;
}
