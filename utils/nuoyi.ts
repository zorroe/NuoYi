export function tansParams(params: any) {
    console.log(params)
    const newParams = {} as any
    for (const propName of Object.keys(params)) {
        const value = params[propName];
        if (value !== null && value !== "" && typeof (value) !== "undefined") {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
                        let para = propName + '[' + key + ']';
                        newParams[para] = value[key];
                    }
                }
            } else {
                newParams[propName] = value;
            }
        }
    }
    return newParams
}