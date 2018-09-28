export const setupRoutes = async () => {
    await import('./healthcheck');
    await import('./login');
    await import('./profile');
    await import('./signup');
};
