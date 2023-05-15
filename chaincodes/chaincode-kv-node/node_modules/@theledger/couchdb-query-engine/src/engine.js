import * as is from './is';
import same from './same';
import { decoded, kvs, resolve } from './utils';

export default class Engine {

    constructor({ virtuals = [], conditions = [], expansions = [] } = {}) {

        this.registry = { virtuals, conditions, expansions };

    }

    clone() {

        return new Engine({
            virtuals: this.registry.virtuals.slice(),
            conditions: this.registry.conditions.slice(),
            expansions: this.registry.expansions.slice()
        });

    }

    append2(d) {
        for (const t in d) {
            if (t === 'expansions' || t === 'virtuals' || t === 'conditions') {
                for (let k in d[t]) {
                    let f = d[t][k];
                    this.append(t, k, f);

                }
            }
        }

    }

    append(t, k, f) {

        this.registry[t].push([k, f]);

    }

    prepend(t, k, f) {

        this.registry[t].shift([k, f]);

    }

    replace(t, k, f) {

        const [tk] = this.rule(k);
        if (tk) {

            this.registry[tk][k] = f;

        } else {

            this.append(t, k, f);

        }

    }

    // Find rule with k name.
    rule(k) {

        let r = [undefined, undefined];
        for (const [tk, tv] of kvs(this.registry)) {

            for (const [rk, rf] of tv) {

                if (k === rk) {

                    r = [tk, rf];
                    break;

                }

            }

        }
        return r;

    }

    test(d, q = {}) {

        let r = true;

        if (is.leaf(q)) {

            // Implicit equality.
            r = r && same(d, q);

        } else {

            for (const [qk, qv] of kvs(q)) {

                if (qk[0] === '$') {

                    const [t, f] = this.rule(qk);
                    switch (t) {
                        case 'expansions':
                            r = r && this.test(d, f);
                            break;
                        case 'virtuals':
                            r = r && this.test(f.bind(this)(d, qv), qv);
                            break;
                        case 'conditions':
                            r = r && f.bind(this)(d, qv, q);
                            break;
                        default:
                            throw new Error(`Unknown rule ${qk}`);
                    }

                    if (r === false) {

                        break;

                    }

                } else {

                    // Allow " $foo" to reference "$foo" attributes.
                    const tqk = decoded(qk);
                    const [dvp, dk] = resolve(d, tqk) || [];
                    if (dvp !== null && dk.length === 1) {

                        // ...it's resolved.
                        r = r && this.test(dvp[dk[0]], qv);

                    } else {

                        // We can still match `{ $exists: false }`, possibly in nested
                        // `{ $or: [] }`.
                        r = r && this.test(undefined, qv);

                    }

                }

            }

        }

        return r;

    }

}
