export class ModuleManager {

    private modules = new Map<string, any>();

    register(
        name: string,
        module: any
    ) {

        this.modules.set(
            name,
            module
        );

    }

    get(
        name: string
    ) {

        return this.modules.get(name);

    }

    has(
        name: string
    ) {

        return this.modules.has(name);

    }

    all() {

        return Array.from(
            this.modules.values()
        );

    }

}
