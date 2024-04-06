export declare const generateUniqueHash: (length?: number) => string;
export declare const uniqueid: (length?: number) => string;
export declare const normalizePath: (path: string) => string;
export declare const matchPath: (path: string | RegExp | (string | RegExp)[], url: string) => {
    exact: boolean;
    search: any;
    params: {
        [key: string]: string;
    };
    query: any;
};
/**
 * @function {@link https://github.com/gre/bezier-easing bezierEasing-Github}
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {Function}
 */
export declare const bezierEasing: (x1: number, y1: number, x2: number, y2: number) => (x: number) => number;
//# sourceMappingURL=utils.d.ts.map