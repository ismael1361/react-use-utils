export const generateUniqueHash = (length: number = 16) => {
    length = Math.max(4, Math.min(32, length));
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const timestamp = Date.now().toString(36); // Converta o timestamp para base36
    let hash = "";

    // Adicione parte do timestamp à hash
    hash += timestamp.slice(-4); // Use os últimos 4 caracteres do timestamp

    // Complete a hash com caracteres aleatórios
    for (let i = 0; i < length - 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        hash += characters.charAt(randomIndex);
    }

    return hash;
};

export const uniqueid = (length?: number) => {
    length = typeof length !== "number" ? 32 : Math.min(Math.max(5, length ?? 32), 32);
    let idstr = String.fromCharCode(Math.floor(Math.random() * 25 + 65));
    do {
        let ascicode = Math.floor(Math.random() * 42 + 48);
        if (ascicode < 58 || ascicode > 64) {
            idstr += String.fromCharCode(ascicode);
        }
    } while (idstr.length < length);
    return String(idstr).slice(0, length);
};

export const normalizePath = (path: string) => {
    path = typeof path === "string" ? path.replace(/\/+/g, "/").replace(/\/+$/g, "") : path;
    const partes = path.split("/");
    const pilha: string[] = [];
    for (const parte of partes) {
        if (parte === "..") {
            pilha.pop();
        } else if (parte !== ".") {
            pilha.push(parte);
        }
    }
    return pilha.join("/");
};

export const matchPath = (
    path: string | string[] | RegExp | RegExp[],
    url: string
): {
    exact: boolean;
    search: any;
    params: {
        [key: string]: string;
    };
    query: any;
} => {
    path = typeof path === "string" ? normalizePath(path) : Array.isArray(path) ? path.map((p) => (typeof path === "string" ? normalizePath(path) : p)) : path;
    url = normalizePath(url);

    const getLocation = (href: string) => {
        const match = href.match(/^((https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?))?([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
        return (
            match && {
                href: href,
                protocol: match[2],
                host: match[3],
                hostname: match[4],
                port: match[5],
                pathname: match[6],
                search: match[7],
                hash: match[8],
            }
        );
    };

    const pathToRegExp = (path: string) =>
        new RegExp(
            path
                .replace(/\./g, "\\.")
                .replace(/\//g, "/")
                .replace(/\?/g, "\\?")
                .replace(/\/+$/, "")
                .replace(/\*+/g, ".*")
                .replace(/:([^\d|^\/][a-zA-Z0-9_]*(?=(?:\/|\\.)|$))/g, (_, paramName) => `(?<${paramName}>[^\/]+?)`)
                .concat("(\\/|$)"),
            "gi"
        );

    const getQuery = (url: string) =>
        typeof url === "string" && url.search(/\?/) >= 0 ? JSON.parse('{"' + decodeURI((url.split("?").pop() ?? "").replace(/&/g, '","').replace(/=/g, '":"')) + '"}') : {};

    const urlParsed = getLocation(url);

    const findPath = (path: string | string[] | RegExp | RegExp[], url: string) => {
        const list: Array<string | RegExp> = Array.isArray(path) ? path : [path];
        for (const p of list) {
            const expression = p instanceof RegExp ? p : pathToRegExp(p);
            const match = expression.exec(urlParsed?.pathname ?? "") || false;
            const matches = p instanceof RegExp ? !!match : !!match && match[0] === match.input;
            if (matches) {
                return p;
            }
        }
        return undefined;
    };

    const pathValid = findPath(path, url);
    const expression = pathValid instanceof RegExp ? pathValid : pathToRegExp(pathValid ?? "");
    const match = expression.exec(urlParsed?.pathname ?? "") || false;
    const matches = pathValid instanceof RegExp ? !!match : !!match && match[0] === match.input;
    const params = match ? match.groups || {} : {};
    const search = getQuery(urlParsed?.search ?? "");
    return { exact: matches, search, params, query: Object.assign({}, params, search) };
};

/**
 * @function {@link https://github.com/gre/bezier-easing bezierEasing-Github}
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {Function}
 */
export const bezierEasing = function (x1: number, y1: number, x2: number, y2: number) {
    if (!(0 <= x1 && x1 <= 1 && 0 <= x2 && x2 <= 1)) {
        throw new Error("bezier x values must be in [0, 1] range");
    }
    let kSplineTableSize = 11,
        kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
    const A = (a: number, b: number) => {
        return 1.0 - 3.0 * b + 3.0 * a;
    };
    const B = (a: number, b: number) => {
        return 3.0 * b - 6.0 * a;
    };
    const C = (a: number) => {
        return 3.0 * a;
    };
    const calcBezier = (a: number, b: number, c: number) => {
        return ((A(b, c) * a + B(b, c)) * a + C(b)) * a;
    };
    const getSlope = (a: number, b: number, c: number) => {
        return 3.0 * A(b, c) * a * a + 2.0 * B(b, c) * a + C(b);
    };
    const binarySubdivide = (a: number, b: number, c: number, d: number, e: number) => {
        let f,
            g,
            i = 0;
        do {
            g = b + (c - b) / 2.0;
            f = calcBezier(g, d, e) - a;
            if (f > 0.0) {
                c = g;
            } else {
                b = g;
            }
        } while (Math.abs(f) > 0.0000001 && ++i < 10);
        return g;
    };
    const newtonRaphsonIterate = (a: number, b: number, c: number, d: number) => {
        for (let i = 0; i < 4; ++i) {
            let currentSlope = getSlope(b, c, d);
            if (currentSlope === 0.0) {
                return b;
            }
            let currentX = calcBezier(b, c, d) - a;
            b -= currentX / currentSlope;
        }
        return b;
    };
    if (x1 === y1 && x2 === y2) {
        return (x: number) => {
            return x;
        };
    }
    let sampleValues = typeof Float32Array === "function" ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
    for (let i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, x1, x2);
    }
    const getTForX = (a: number) => {
        let b = 0.0,
            c = 1,
            d = kSplineTableSize - 1;
        for (; c !== d && sampleValues[c] <= a; ++c) {
            b += kSampleStepSize;
        }
        --c;
        let e = (a - sampleValues[c]) / (sampleValues[c + 1] - sampleValues[c]),
            f = b + e * kSampleStepSize,
            g = getSlope(f, x1, x2);
        if (g >= 0.001) {
            return newtonRaphsonIterate(a, f, x1, x2);
        } else if (g === 0.0) {
            return f;
        } else {
            return binarySubdivide(a, b, b + kSampleStepSize, x1, x2);
        }
    };
    return (x: number) => {
        return x === 0 ? 0 : x === 1 ? 1 : calcBezier(getTForX(x), y1, y2);
    };
};
