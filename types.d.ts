import {
    EndUserProps as BeWrittenEndUserProps,
    Actions as BeWrittenActions,
} from 'be-written/types';
import {BeDecoratedProps, MinimalProxy, EventConfigs} from 'be-decorated/types';

export interface EndUserProps extends BeWrittenEndUserProps{
    make: CSSSelectorBeHavingMap
}

export interface BeHaving<TEndUserProps = any> {
    be: string,
    having: TEndUserProps
}

export type CSSSelectorBeHavingMap = {[key: string]: BeHaving | BeHaving[]}

export interface VirtualProps extends EndUserProps, MinimalProxy{

}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps {
    proxy: Proxy;
}

export type PP = ProxyProps;

export type PPP = Partial<ProxyProps>;

export type PPE =  [PPP, EventConfigs<Proxy, Actions>];

export interface Actions extends BeWrittenActions{

}


