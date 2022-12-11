import {BeWritten, 
    virtualProps as BWVirtualProps, 
    proxyPropDefaults as BWProxyPropDefaults, 
    actions as BWActions
} from 'be-written/be-written.js';
import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps, DEMethods} from 'be-decorated/DE.js';
import {ActionExt} from 'be-decorated/types';
import {Actions, PP, PPE, VirtualProps, Proxy, ProxyProps, PPP} from './types';
import { ProxyProps as BWPP } from 'be-written/types';
import { StreamOrator } from '../stream-orator/StreamOrator';

export class BeRewritten extends BeWritten{
    override async getSet(pp: PP, so: StreamOrator, target: Element){
        const {} = pp;
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
    }
});

register(ifWantsToBe, upgrade, tagName);

