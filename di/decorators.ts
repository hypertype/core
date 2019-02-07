export function Injectable({deps, multiple}: {deps?: any[], multiple?} = {deps: [], multiple: false}) {
    return target => {
        target.deps = deps;
        return target;
    };
}

export function Inject() {
    return (target, propery, index) => {

    };
}

