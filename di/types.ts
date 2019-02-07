export type Provider = ValueProvider | ClassProvider | FactoryProvider

export interface ValueProvider {
    provide: any;
    useValue?: any;
}


export interface ClassProvider {
    provide: any;
    useClass?: any;
    deps: Provider[];
    multiple?: boolean;
}

export interface FactoryProvider {
    provide: any;
    useFactory?: any;
    deps: Provider[];
    multiple?: boolean;
}

