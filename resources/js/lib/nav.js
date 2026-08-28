export function isActivePath(href, currentPath) {
    if (!href) {
        return false;
    }

    const path = currentPath.split('?')[0];

    return href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`);
}
