export {
    std
}

namespace std {
    export class Vec<T extends number> {
        p: T[]

        constructor(...items: T[]);
        constructor(len: number);

        constructor(...args: any[]) {
            this.p = new Array<T>(...args);
        }

        get(i: number): T {
            return this.p[i]
        }

        set(i: number, v: T): T {
            let r = this.p[i]
            this.p[i] = v
            return r
        }

        get len(): number {
            return this.p.length
        }
    }
}

export namespace ps {
    var reg = $('body');

    export function on(evn: string, f: any) {
        reg.on(evn, f);
    }

    export function trigger(evn: string) {
        reg.trigger(evn);
    }
}