import {
    async,
    debounceTime,
    first,
    last,
    of,
    ReplaySubject,
    shareReplay,
    startWith,
    switchMap,
    take,
    throttleTime
} from "./operators";

export function switchThrottle(time: number) {
    return (target, key, decorator) => {
        const requestSymbol = Symbol('request');
        const responseSymbol = Symbol('response');
        const fn = target[key];
        Object.defineProperty(target, key, {
            value(...args) {
                const requests$: ReplaySubject<Function> = this[requestSymbol] = this[requestSymbol]
                    || new ReplaySubject<Function>(0);
                const response$ = this[responseSymbol] = this[responseSymbol] || requests$.pipe(
                    startWith((() => of(null)) as Function),
                    throttleTime(time, async, {leading: true, trailing: true}),
                    switchMap(fn => fn()),
                    shareReplay(1)
                );
                requests$.next(() => fn.apply(this, args));
                return response$.pipe(take(2), last()).toPromise();
            }
        })
    }
}

export function switchDebounce(time: number) {
    return (target, key, decorator) => {
        const requestSymbol = Symbol('request');
        const responseSymbol = Symbol('response');
        const fn = target[key];
        Object.defineProperty(target, key, {
            value(...args) {
                const requests$: ReplaySubject<Function> = this[requestSymbol] = this[requestSymbol]
                    || new ReplaySubject<Function>(0);
                const response$ = this[responseSymbol] = this[responseSymbol] || requests$.pipe(
                    debounceTime(time, async),
                    switchMap(fn => fn()),
                    shareReplay(1)
                );
                requests$.next(() => fn.apply(this, args));
                return response$.pipe(first()).toPromise();
            }
        })
    }
}

/*
export function serializeAndDebounce() {
    return (target, key, decorator) => {
        const requestSymbol = Symbol('request');
        const responseSymbol = Symbol('response');
        const fn = target[key];
        Object.defineProperty(target, key, {
            value(...args) {
                const requests$: ReplaySubject<Function> = this[requestSymbol] = this[requestSymbol]
                    || new ReplaySubject<Function>(0);
                const response$ = this[responseSymbol] = this[responseSymbol] || requests$.pipe(
                    debounceTime(time, async),
                    switchMap(fn => fn()),
                    shareReplay(1)
                );
                requests$.next(() => fn.apply(this, args));
                return response$.pipe(first()).toPromise();
            }
        })
    }
}*/
