import Hashids from 'hashids';

// TODO: store salt in env?
export const hashids = new Hashids('salt');
