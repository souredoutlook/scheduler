import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from '../reducers/application';

test("throws an error with an unsupported type", () => {
  expect(()=> reducer({},{type: null})).toThrowError(
    /tried to reduce with unsupported action type/i
  )
});