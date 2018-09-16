import * as React from 'react';
import { Link } from 'react-router-dom';

export const LinkTo: (to: string) => React.SFC = to => props => (
    <Link to={to} {...props} />
);
