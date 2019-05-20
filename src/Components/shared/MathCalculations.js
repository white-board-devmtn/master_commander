export function CalculateAverage(pPossible, pRecieved, tPossible = [0], tRecieved = [0]) {
  if (Array.isArray(pPossible) && Array.isArray(pRecieved)) {
    if (!Array.isArray(tPossible) || !Array.isArray(tRecieved)) {
      return 'tPossible or tRecieved are not a(n) array(s)'
    }
    tPossible.forEach(num => pPossible.push(num));
    tRecieved.forEach(num => pRecieved.push(num));

    pRecieved = pRecieved.reduce((sum, acc) => {
      return sum += +acc
    }, 0)
    pPossible = pPossible.reduce((sum, acc) => {
      return sum += +acc
    }, 0)
    let average = ((pRecieved / pPossible) * 100).toFixed(2)
    if (+average > 93) return ['A', average];
    if (+average > 90) return ['A-', average];
    if (+average > 87) return ['B+', average];
    if (+average > 83) return ['B', average];
    if (+average > 80) return ['B-', average];
    if (+average > 77) return ['C+', average];
    if (+average > 73) return ['C', average];
    if (+average > 70) return ['C-', average];
    if (+average > 67) return ['D+', average];
    if (+average > 63) return ['D', average];
    if (+average >= 60.00) return ['D-', average];
    if (+average < 60) return ['F', average];
  } else {
    return 'pPossible or pRecieved are not a(n) array(s)';
  }
}