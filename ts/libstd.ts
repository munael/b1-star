export {
    std
}

namespace std {
    export class Vec {
        p: number[]

        constructor(l: number) {
            this.p = new Array<number>(l)
        }

        g = this.get
        get(i: number): number {
            return this.p[i]
        }

        s = this.set
        set(i: number, v: number): number {
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