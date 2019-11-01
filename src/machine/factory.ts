import { States } from '../state/States';
import { Machine } from './Machine';

export function factory({ initial, states }: States): Machine {
    const history: string[] = [];

    return {
        history(): string[] {
            return history;
        },

        initial(): string {
            return initial;
        },

        transition(event: string, current: string = initial): string {
            const next: string | undefined = states[current].on[event];

            if (next === undefined) {
                return current;
            }

            history.push(next);

            return next;
        },
    };
}
