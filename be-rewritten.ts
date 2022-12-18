import {BeWritten, 
    virtualProps as BWVirtualProps, 
    proxyPropDefaults as BWProxyPropDefaults, 
    actions as BWActions
} from 'be-written/be-written.js';
import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {ActionExt} from 'be-decorated/types';
import {CSSSelectorBeHavingMap} from 'trans-render/lib/types';
import {Actions, PP, PPE, VirtualProps, Proxy, ProxyProps, PPP} from './types';
import { StreamOrator } from '../stream-orator/StreamOrator';
import { PuntEvent } from 'be-based/types';
import { makeItBe } from 'trans-render/lib/makeBe.js';
import { getQuery } from 'trans-render/lib/specialKeys.js';

export class BeRewritten extends BeWritten{

    override async write(pp: PP) {
        const {make} = pp;
        pp.beBased = {
            puntOn: Object.keys(make)
        };
        return super.write(pp);
    }
    override async getSet(pp: PP, so: StreamOrator, target: Element){
        const {make} = pp;
        const controller = (<any>target).beDecorated.based.controller as EventTarget;
        for(const key in make){
            let cssSelector = key;
            if(hasCapitalLetterRegExp.test(key)){
                const qry = getQuery(key);
                cssSelector = qry.query;
            }
            this.#hookupListener(pp, key, cssSelector, make, target, controller);
        }
    }

    #hookupListener(pp: PP, key: string, cssSelector: string, make: CSSSelectorBeHavingMap, target: Element, controller: EventTarget ){
        
        //console.log({cssSelector});
        controller.addEventListener(cssSelector, e => {
            const puntEvent = (e as CustomEvent).detail as PuntEvent;
            const {instance} = puntEvent;
            makeItBe(instance, key, make);
        });
        
    }
}

const hasCapitalLetterRegExp = /[A-Z]/;

const tagName = 'be-rewritten';

const ifWantsToBe = 'rewritten';

const upgrade = '*';

const virtualProps = [...BWVirtualProps];

const proxyPropDefaults = {...BWProxyPropDefaults} as PPP;

const actions = {...BWActions} as Partial<{[key in keyof Actions]: ActionExt<VirtualProps & BeDecoratedProps<VirtualProps, Actions>, Actions>}>

define<VirtualProps & BeDecoratedProps<VirtualProps, Actions>, Actions>({
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

