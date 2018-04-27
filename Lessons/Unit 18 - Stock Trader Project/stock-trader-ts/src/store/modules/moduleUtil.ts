
export function createNamespaceKeys(keys: {[key: string]: string}, namespace: string): {[key: string]: string} {
    const keysNS: {[key: string]: string} = {};
    Object.keys(keys).forEach(key => keysNS[key] = `${namespace}/${keys[key]}`);
    return keysNS;
}