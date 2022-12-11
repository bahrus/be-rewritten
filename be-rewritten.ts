import {BeWritten, virtualProps, proxyPropDefaults, actions} from 'be-written/be-written.js';
import {register} from 'be-hive/register.js';
import {define, BeDecoratedProps, DEMethods} from 'be-decorated/DE.js';
import {Actions, PP, PPE, VirtualProps, Proxy, ProxyProps, PPP} from './types';

export class BeRewritten extends BeWritten{

}

const tagName = 'be-rewritten';

const ifWantsToBe = 'rewritten';

const upgrade = '*';



register(ifWantsToBe, upgrade, tagName);

