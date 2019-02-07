import {ClassProvider, FactoryProvider, Provider, ValueProvider} from "./types";
import {Store} from "./store";

export type CommonProvider = ValueProvider & ClassProvider & FactoryProvider;


export class Container {
    constructor() {
    }

    private store = new Store();

    public get<T>(target): T {
        if (target === Container)
            return this as unknown as T;
        let existing = this.store.find(target);
        if (!existing) {
            throw new Error(`unknown dependency, ${target.name || target}`);
            // console.warn('should register', target);
            // existing = this.store.register({provide: target, useClass: target, deps: []});
        }
        return this.resolve(existing as CommonProvider);
    }

    public provide(providers: Provider[] | Container) {
        if (providers instanceof Container) {
            this.store.register(providers.store);
        } else {
            providers.forEach(p => this.store.register(p));
        }
    }

    private resolve(provider: CommonProvider) {
        if (provider.useValue)
            return provider.useValue;
        if (!provider.useClass) {
            provider.useClass = provider.provide;
        }
        if (provider.useClass) {
            if (!provider.deps) {
// console.warn('no deps in provider', provider.provide, provider.useClass);
                provider.deps = (provider.useClass && provider.useClass.deps) || provider.provide.deps || [];
            }
            const deps = provider.deps.map(dep => {
                try {
                    return this.get(dep);
                } catch (e) {
                    e.message = `
                        couldn't resolve ${provider.provide.name}
                           ${e.message}`;
                    throw e;
                }
            });
            const instance = new provider.useClass(...deps);
            if (!provider.multiple) {
                provider.useValue = instance;
            }
            return instance;
        }
        throw new Error('need useClass or useValue')
    }
}