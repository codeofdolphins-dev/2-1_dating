const numberConversion = ( number = 0 ) => {

    const numStr = number.toString();

    if(numStr.length == 4) return `${numStr.slice()[0]}.${numStr.slice()[1]} k`;

    if(numStr.length == 5) return `${numStr.slice()[0]}${numStr.slice()[1]} k`; 
    
    if(numStr.length == 6) return `.${numStr.slice()[0]} m`;

    if(numStr.length >= 7) return `${numStr.slice()[0]} m`;

    return numStr;
}

export { numberConversion };
