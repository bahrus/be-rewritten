import { BeWritten, virtualProps as BWVirtualProps, proxyPropDefaults as BWProxyPropDefaults, actions as BWActions } from 'be-written/be-written.js';
import { register } from 'be-hive/register.js';
import { define } from 'be-decorated/DE.js';
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
        for (const cssSelector in make) {
            this.#hookupListener(pp, cssSelector, make, target, controller);
        }
    }
    #hookupListener(pp, cssSelector, make, target, controller) {
        const beHaving = make[cssSelector];
        const {} = beHaving;
        //console.log({cssSelector});
        controller.addEventListener(cssSelector, e => {
            const detail = e.detail;
            console.log({ e, detail });
        });
    }
}
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
