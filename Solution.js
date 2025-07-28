const fs = require('fs');

// BigInt base conversion
function convertToDecimal(valueStr, baseStr) {
    const base = BigInt(baseStr);
    let decimal = 0n;
    for (const c of valueStr.toLowerCase()) {
        const digit = /[0-9]/.test(c) 
            ? BigInt(parseInt(c, 10)) 
            : BigInt(10 + c.charCodeAt(0) - 'a'.charCodeAt(0));
        decimal = decimal * base + digit;
    }
    return decimal;
}

// Lagrange interpolation
function lagrangeInterpolation(points) {
    let secret = 0n;
    const n = points.length;
    
    for (let i = 0; i < n; i++) {
        let term = points[i].y;
        let numerator = 1n;
        let denominator = 1n;
        
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                numerator *= BigInt(-points[j].x);
                denominator *= BigInt(points[i].x - points[j].x);
            }
        }
        
        term = term * numerator / denominator;
        secret += term;
    }
    
    return secret;
}

function processTestCases() {
    try {
        const rawData = fs.readFileSync('testcases_clean.json', 'utf8');
        const data = JSON.parse(rawData);
        
        // Process testcase1
        const tc1 = data.testcase1;
        const points1 = Object.entries(tc1)
            .filter(([k]) => k !== 'keys')
            .map(([x, val]) => ({
                x: parseInt(x),
                y: convertToDecimal(val.value, val.base)
            }))
            .sort((a, b) => a.x - b.x);
        
        const secret1 = lagrangeInterpolation(points1.slice(0, tc1.keys.k));
        console.log(`Secret for testcase1: ${secret1}`);
        
        // Process testcase2
        const tc2 = data.testcase2;
        const points2 = Object.entries(tc2)
            .filter(([k]) => k !== 'keys')
            .map(([x, val]) => ({
                x: parseInt(x),
                y: convertToDecimal(val.value, val.base)
            }))
            .sort((a, b) => a.x - b.x);
        
        const secret2 = lagrangeInterpolation(points2.slice(0, tc2.keys.k));
        console.log(`Secret for testcase2: ${secret2}`);
        
    } catch (err) {
        console.error('Error:', err.message);
    }
}

processTestCases();
