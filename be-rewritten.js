import { BeWritten, virtualProps as BWVirtualProps, proxyPropDefaults as BWProxyPropDefaults, actions as BWActions } from 'be-written/be-written.js';
import { register } from 'be-hive/register.js';
import { define } from 'be-decorated/DE.js';
import { makeItBe } from 'trans-render/lib/makeBe.js';
import { getQuery } from 'trans-render/lib/specialKeys.js';
export class BeRewritten extends BeWritten {
    async write(pp) {
        const { make } = pp;
        pp.beBased = {
            puntOn: Object.keys(make)
        };
        return super.write(pp);
    }
    async getSet(pp, so, target) {
        const { make } = pp;
        const controller = target.beDecorated.based.controller;
        for (const key in make) {
            let cssSelector = key;
            if (hasCapitalLetterRegExp.test(key)) {
                const qry = getQuery(key);
                cssSelector = qry.query;
            }
            this.#hookupListener(pp, key, cssSelector, make, target, controller);
        }
    }
    #hookupListener(pp, key, cssSelector, make, target, controller) {
        //console.log({cssSelector});
        controller.addEventListener(cssSelector, e => {
            const puntEvent = e.detail;
            const { instance } = puntEvent;
            makeItBe(instance, key, make);
        });
    }
}
const hasCapitalLetterRegExp = /[A-Z]/;
const tagName = 'be-rewritten';
const ifWantsToBe = 'rewritten';
const upgrade = '*';
const virtualProps = [...BWVirtualProps];
const proxyPropDefaults = { ...BWProxyPropDefaults };
const actions = { ...BWActions };
define({
    config: {
        tagName,
        propDefaults: {
            ifWantsToBe,
            upgrade,
            virtualProps,
            primaryProp: 'from',
            proxyPropDefaults
        },
        actions,
    },
    complexPropDefaults: {
        controller: BeRewritten
    }
});
register(ifWantsToBe, upgrade, tagName);
