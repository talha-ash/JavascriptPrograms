const sentence1 = ["great", "acting", "skills"];
const sentence2 = ["fine", "drama", "talent"];
const similarPairs = [
  ["great", "fine"],
  ["drama", "acting"],
  ["good", "fine"], // for this scenario we use set more than one pair
  ["skills", "talent"],
];

function findSimilarSentence1(sen1, sen2, simp) {
  if (sen1.length !== sen2.length) {
    return false;
  }

  let map = {}; //why use set gainst map value if more than one pair exist for word

  for (let i = 0; i < simp.length; i++) {
    let firstWord = simp[i][0];
    let secondWord = simp[i][1];

    if (map[firstWord]) {
      map[firstWord] = map[firstWord].add(secondWord);
    } else {
      map[firstWord] = new Set([secondWord]);
    }

    if (map[secondWord]) {
      map[secondWord] = map[secondWord].add(firstWord);
    } else {
      map[secondWord] = new Set([firstWord]);
    }
  }

  console.log(map);

  for (let i = 0; i < sen1.length; i++) {
    const fw = sen1[i];
    const sw = sen2[i];
    if (fw !== sw && !map[fw].has(sw)) {
      return false;
    }
  }

  return true;
}

const result = findSimilarSentence1(sentence1, sentence2, similarPairs);
console.log(result);
