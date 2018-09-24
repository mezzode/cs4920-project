import Button from '@material-ui/core/Button';
import * as React from 'react';

const handleLogout = () => {
    fetch('/logout');
};
export const Logout = () => (
    <Button onClick={handleLogout} color="inherit">
        Log out
    </Button>
);
