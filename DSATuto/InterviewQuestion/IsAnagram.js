
const isAnagram = (s, t) => {
    const hash = {};
    const hash1 = {};
    let result = true;

    s.split("").map(cha => {
        if (hash[cha]) {
            const val = hash[cha] + 1;
            hash[cha] = val;
            hash[cha + val] = val;
        } else {
            hash[cha] = 1
        }
    })

    console.log(hash)

    t.split("").map(cha => {
        if (hash1[cha]) {
            const val = hash1[cha] + 1;
            hash1[cha] = val;
            hash1[cha + val] = val;
            if (!hash[cha + val]) {
                result = false
            }
        } else {
            hash1[cha] = 1
            if (!hash[cha]) {
                result = false
            }
        }
    })
    console.log(hash1)
    return result;
}

const sol2 = (str1, str2) => {
    if (str1.length !== str2.length) return false;

    // Convert to lowercase
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

    // Create counter array for 26 lowercase letters
    const counter = new Array(200).fill(0);

    // Count frequencies using ASCII values
    for (let i = 0; i < str1.length; i++) {
        counter[str1.charCodeAt(i) - 97]++;
        counter[str2.charCodeAt(i) - 97]--;
    }

    // Check if all counters are zero
    return counter.every(count => count === 0);
}


const result = isAnagram("rat", "car");
console.log(result)