const { getAllCakes } = require('../services/cakes');
const Cake = require('../db');

jest.mock('../db');

test('vicious mockery', async () => {
  Cake.find.mockResolvedValue([{
    name: 'Jaffa Cake',
  }]);

  const cakes = await getAllCakes();

  expect(cakes).toEqual([{
    name: 'Jaffa Cake',
  }]);
});
