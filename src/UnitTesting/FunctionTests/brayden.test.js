
const functions = require('../Functions/braydenFunctions')




test('Tests logout function', () => {
      expect(typeof functions.logout).toBe('function')
    });

test("divide() should return an average percent based on two number parameters.", () => {
    expect( functions.divide( 85, 100 ) ).toEqual( 85 );
    expect( functions.divide( 25, 50 ) ).toEqual( 50);
    });

test("divide() should be a function", () => {
    expect(typeof functions.divide).toBe('function')
})

test("divide() should not returrn a string.", () => {
    expect( functions.divide( '85', '100' ) ).not.toBe('string');
    });

test("divide()should not return an object",()=> {
    expect( functions.divide( 10, 20 )).not.toBe(Object)
})

test('Tests deleteEvent function',()=>{
        expect(typeof functions.deleteEvent).toBe('function')
    })






