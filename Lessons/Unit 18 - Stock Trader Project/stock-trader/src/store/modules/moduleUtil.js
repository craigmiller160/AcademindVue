export function createNamespaceKeys(keys, namespace) {
    const keysNS = {};
    Object.keys(keys).forEach(key => keysNS[key] = `${namespace}/${keys[key]}`);
    return keysNS;
}
