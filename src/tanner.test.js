const { CalculateAverage } = require('./Components/shared/MathCalculations')

test('CalculateAverage only takes arrays', () => {
  expect(CalculateAverage(1, 2)).toBe('pPossible or pRecieved are not a(n) array(s)');
})

test('CalculateAverage will return 100% when given [50, 100] and [50, 100]', () => {
  expect(CalculateAverage([50, 100], [50, 100])).toStrictEqual(['A', "100.00"]);
})

test('CalculateAverage will return [C-, 72.97] with arguments [100, 100, 100, 70], [70, 80, 50, 70]', () => {
  expect(CalculateAverage([100, 100, 100, 70], [70, 80, 50, 70])).toStrictEqual(['C-', '72.97']);
})

test('CalculateAverage will only take arrays for estimated grade arguments', () => {
  expect(CalculateAverage([100, 100, 100, 70], [70, 80, 50, 70], 1, 2)).toBe('tPossible or tRecieved are not a(n) array(s)');
})

test('CalculateAverage will return [B, 85.00] with arguments ([50, 100], [50, 100], [50], [20])', () => {
  expect(CalculateAverage([50, 100], [50, 100], [50], [20])).toStrictEqual(['B', '85.00']);
})