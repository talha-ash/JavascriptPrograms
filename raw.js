function func(str) {
  let hash = {}
  for (let index = 0; index < str.length; index++) {
    const element = str[index].toLowerCase();
    const code = element.charCodeAt(0)
    if (code >= 97 && code <= 122) {
      hash[element] = hash[element] ? hash[element] + 1 : 1

      if (hash[element] >= 2) {
        return false
      }
    }

  }
  return true
}


const result = func("TheQuickBrownFoxJumpsOverTheLazyDog")
console.log(result)