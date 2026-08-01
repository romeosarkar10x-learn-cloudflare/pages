// TODO: Check for invalid identifiers

export function interpolate(s: string, params: Record<string, string>) {
    return s.replace(/\$\{(.*)\}/g, (_, key: string) => {
        const trimmedKey = key.trim();
        return params[trimmedKey] !== undefined ? params[trimmedKey] : "";
    });
}
