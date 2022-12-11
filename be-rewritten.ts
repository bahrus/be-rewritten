import {BeWritten, 
    virtualProps as BWVirtualProps, 
    proxyPropDefaults as BWProxyPropDefaults, 
    actions as BWActions
} from 'be-written/be-written.js';
import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps, DEMethods} from 'be-decorated/DE.js';
import {ActionExt} from 'be-decorated/types';
import {Actions, PP, PPE, VirtualProps, Proxy, ProxyProps, PPP, CSSSelectorBeHavingMap} from './types';
import { ProxyProps as BWPP } from 'be-written/types';
import { StreamOrator } from '../stream-orator/StreamOrator';
import { PuntEvent } from 'be-based/types';
import {attach} from 'be-decorated/upgrade.js';

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
        for(const cssSelector in make){
            this.#hookupListener(pp, cssSelector, make, target, controller);
        }
    }

    #hookupListener(pp: PP, cssSelector: string, make: CSSSelectorBeHavingMap, target: Element, controller: EventTarget ){
        
        //console.log({cssSelector});
        controller.addEventListener(cssSelector, e => {
            const puntEvent = (e as CustomEvent).detail as PuntEvent;
            console.log({e, puntEvent});
            const beHavingOrBeHavings = make[cssSelector];
            const beHavings = Array.isArray(beHavingOrBeHavings) ? beHavingOrBeHavings : [beHavingOrBeHavings];
            const {instance} = puntEvent; 
            for(const beHaving of beHavings){
                const {be, having} = beHaving;
                const wcName = 'be-' + be;
                if(customElements.get(wcName)){
                    const dem = document.createElement(wcName) as any as DEMethods;
                    const aInstance = instance as any;
                    if(aInstance.beDecorated === undefined) aInstance.beDecorated = {};
                    aInstance.beDecorated[be] = having;
                    attach(instance, be, dem.attach.bind(instance));
                }else{
                    instance.setAttribute(wcName, JSON.stringify(having));
                }
            }
        });
        
    }
}

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

