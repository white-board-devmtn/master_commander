export function CalculateAverage(pPossible, pReceived, tPossible = 0, tRecieved = 0,  ) {
  if (Array.isArray(pPossible) && Array.isArray(pReceived)) {
    if (tPossible > 0 && tRecieved > 0) {
      let index = pPossible.findIndex((num, i) => {
        if (num === tPossible && pReceived[i] === tRecieved) return i;
      })
      if (index > 0) {
        pPossible[index] = tPossible;
        pReceived[index] = tRecieved;
      } else {
        pPossible.push(tPossible);
        pReceived.push(tRecieved);
      }
    }
    pReceived = pReceived.reduce((sum, acc) => {
      return sum += acc
    }, 0)
    pPossible = pPossible.reduce((sum, acc) => {
      return sum += acc
    }, 0)
    let average = ((pReceived / pPossible) * 100)
    if (average > 93) return ['A', average];
    if (average > 90) return ['A-', average];
    if (average > 87) return ['B+', average];
    if (average > 83) return ['B', average];
    if (average > 80) return ['B-', average];
    if (average > 77) return ['C+', average];
    if (average > 73) return ['C', average];
    if (average > 70) return ['C-', average];
    if (average > 67) return ['D+', average];
    if (average > 63) return ['D', average];
    if (average > 60) return ['D-', average];
    if (average < 60) return ['F', average];
  } else {
    return 'pPossible or pReceived are not a(n) array(s)';
  }
}