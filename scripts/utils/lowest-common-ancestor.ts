import path from "node:path";

export function lowestCommonAncestor(path1: string, path2: string) {
    const absolutePath1 = path.resolve(path1),
        absolutePath2 = path.resolve(path2);
    const segments1 = absolutePath1.split(path.sep),
        segments2 = absolutePath2.split(path.sep);
    const length1 = segments1.length,
        length2 = segments2.length;

    const commonPath = [];

    let i = 0,
        j = 0;

    while (i < length1 && j < length2) {
        if (segments1[i] === segments2[j]) {
            commonPath.push(segments1[i]);
        }

        (i++, j++);
    }

    return commonPath.join(path.sep);
}
