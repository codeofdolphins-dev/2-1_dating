const numberConversion = (number = 0) => {

    if (number < 1000) return number.toString(); // Optional: include this if <1000 should return raw

    if (number >= 1000 && number < 1_000_000) {
        const short = number / 1000;
        const result = short >= 100 ? `${Math.round(short)}k`        // e.g. 99900 → "100k"
                    : short >= 10 ? `${short.toFixed(1)}k`           // e.g. 15300 → "15.3k"
                    : `${short.toFixed(2).slice(0, 3)}k`;            // e.g. 1200 → "1.2k"

        return result.length > 3 ? result.slice(0, 3) + 'k' : result;
    }

    if (number >= 1_000_000) {
        const short = number / 1_000_000;
        const result = short >= 100 ? `${Math.round(short)}m`
                    : short >= 10 ? `${short.toFixed(1)}m`
                    : `${short.toFixed(2).slice(0, 3)}m`;

        return result.length > 3 ? result.slice(0, 3) + 'm' : result;
    }

    return number.toString(); // fallback
};

export { numberConversion };
