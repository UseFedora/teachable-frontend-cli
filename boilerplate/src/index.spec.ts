import { sayHello } from './index'

test("Should say hello.", () => {
  expect.assertions(2)

  expect(sayHello()).toBe('Hello, World!')
  expect(sayHello('Larry')).toBe('Hello, Larry!')
})
