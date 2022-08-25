const { expect } = require('chai');
// test class?
describe('Maths tests', () => {
  // beforeEach(() => console.log('I run b4 the test'));

  // @Test
  test('should equal 2', () => {
    expect(1 + 1).to.equal(2);
  });

  test.skip('should not equal 2', () => {
    expect(1 + 1).to.equal(3);
  });
});
