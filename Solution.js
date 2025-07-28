const fs = require('fs');

// BigInt base conversion with better error handling
function convertToDecimal(valueStr, baseStr) {
    try {
        const base = BigInt(baseStr);
        if (base < 2n || base > 36n) throw new Error('Invalid base');
        
        let decimal = 0n;
        for (const c of valueStr.toLowerCase()) {
            let digit;
            if (/[0-9]/.test(c)) {
                digit = BigInt(parseInt(c, 10));
            } else if (/[a-z]/.test(c)) {
                digit = 10n + BigInt(c.charCodeAt(0) - 'a'.charCodeAt(0));
            } else {
                throw new Error('Invalid character');
            }
            if (digit >= base) throw new Error('Digit exceeds base');
            decimal = decimal * base + digit;
        }
        return decimal;
    } catch (err) {
        console.error(`Conversion error for value ${valueStr} base ${baseStr}: ${err.message}`);
        return 0n;
    }
}

// More accurate Lagrange interpolation
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
        
        // Only add term if denominator is not zero
        if (denominator !== 0n) {
            term = term * numerator / denominator;
            secret += term;
        }
    }
    
    return secret;
}

function processTestCases() {
    try {
        const rawData = fs.readFileSync('testcases_clean.json', 'utf8');
        const data = JSON.parse(rawData);
        
        // Process testcase1
        console.log('\nProcessing testcase1...');
        const tc1 = data.testcase1;
        const points1 = [];
        
        for (const [key, value] of Object.entries(tc1)) {
            if (key !== 'keys') {
                try {
                    const x = parseInt(key);
                    const y = convertToDecimal(value.value, value.base);
                    console.log(`Point ${x}: ${value.value} (base ${value.base}) → ${y}`);
                    points1.push({ x, y });
                } catch (err) {
                    console.error(`Error processing point ${key}: ${err.message}`);
                }
            }
        }
        
        points1.sort((a, b) => a.x - b.x);
        const k1 = tc1.keys.k;
        const secret1 = lagrangeInterpolation(points1.slice(0, k1));
        console.log(`\nSecret for testcase1: ${secret1}`);
        
        // Process testcase2
        console.log('\nProcessing testcase2...');
        const tc2 = data.testcase2;
        const points2 = [];
        
        for (const [key, value] of Object.entries(tc2)) {
            if (key !== 'keys') {
                try {
                    const x = parseInt(key);
                    const y = convertToDecimal(value.value, value.base);
                    console.log(`Point ${x}: ${value.value} (base ${value.base}) → ${y}`);
                    points2.push({ x, y });
                } catch (err) {
                    console.error(`Error processing point ${key}: ${err.message}`);
                }
            }
        }
        
        points2.sort((a, b) => a.x - b.x);
        const k2 = tc2.keys.k;
        const secret2 = lagrangeInterpolation(points2.slice(0, k2));
        console.log(`\nSecret for testcase2: ${secret2}`);
        
    } catch (err) {
        console.error('\nFatal error:', err.message);
    }
}

processTestCases();
