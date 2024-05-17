import { Producer } from './producer.model';
import { Studio } from './studio.model';

export class Movie {
  id: number;
  title: string;
  year: number;
  producers: Producer[];
  studios: Studio[];
  winner: boolean;
}