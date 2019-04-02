import {Container} from "./container";

export function Injectable(multiple: boolean = false): (target) => void {
    return ((target, deps) => {
        Container.StaticDepsMap.set(target, {deps, multiple});
    }) as (target) => void;
}

export const Inject: (token) => ParameterDecorator = (injectionToken) => {
    return (target, deps, index) => {
        deps[index] = injectionToken;
    };
}


Object.assign(global['Reflect'], {
    decorate: (decoratorsAndDeps: any[], target, key, desc) => {
        if (key) {
            decoratorsAndDeps[0](target, key, desc);
        } else {
            const deps = decoratorsAndDeps.pop();
            decoratorsAndDeps.reverse().forEach(decorator => decorator(target, deps));
            return target;
        }
    },
    metadata: (kind, deps) => {
        if (kind == "design:paramtypes") {
            return deps;
        }
    }
});
