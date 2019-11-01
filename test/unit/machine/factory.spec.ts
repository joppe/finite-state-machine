import { factory } from '@apestaartje/finite-state-machine/machine/factory';
import { Machine } from '@apestaartje/finite-state-machine/machine/Machine';
import { States } from '@apestaartje/finite-state-machine/state/States';

describe('factory', (): void => {
    const states: States = {
        initial: 'home',
        states: {
            ['home']: {
                on: {
                    ['onHelp']: 'info',
                    ['onStart']: 'game',
                },
            },
            ['info']: {
                on: {
                    ['onHome']: 'home',
                    ['onStart']: 'game',
                },
            },
            ['game']: {
                on: {
                    ['onGameOver']: 'score',
                    ['onRestart']: 'game',
                    ['onStop']: 'home',
                },
            },
            ['score']: {
                on: {
                    ['onHome']: 'home',
                    ['onStart']: 'game',
                },
            },
        },
    };

    let machine: Machine;

    beforeEach((): void => {
        machine = factory(states);
    });

    describe('initial', (): void => {
        it('will always return the initial state', (): void => {
            expect(machine.initial()).toBe('home');
        });
    });

    describe('transition', (): void => {
        it('it will return the new state for the given state and event', (): void => {
            expect(machine.transition('onHelp', 'home')).toBe('info');
        });

        it('it will return the current state when the event does not exist', (): void => {
            expect(machine.transition('onStop', 'home')).toBe('home');
        });
    });

    describe('history', (): void => {
        it('will keep track of the successful state changes', (): void => {
            machine.transition('onHelp', 'home');
            machine.transition('onStart', 'info');
            machine.transition('onHelp', 'info');
            machine.transition('onGameOver', 'game');

            expect(machine.history()).toEqual(['info', 'game', 'score']);
        });
    });
});
