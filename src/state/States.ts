import { State } from './State';

export interface States {
    initial: string;
    states: {[state: string]: State};
}
