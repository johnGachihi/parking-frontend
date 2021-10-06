import Duration from "./Duration"

test("getMinutes() returns correct minutes", () => {
  const duration = new Duration("PT1M")
  expect(duration.getMinutes()).toBe(1)
})

test("when ISO_8086 duration provided is invalid, then throws Error", () => {
  expect(() => new Duration("1")).toThrow(
    "Invalid ISO 8061 duration string provided"
  )
})

test("create duration using ofMinutes", () => {
  expect(Duration.ofMinutes(10).getMinutes())
    .toBe(10)
})

test("addMinutes() adds minutes", () => {
  const duration = Duration.ofMinutes(10)

  expect(duration.addMinutes(1).getMinutes())
    .toBe(11)
})

test("addMinutes() returns new instance", () => {
  const duration = Duration.ofMinutes(10)
  const newDuration = duration.addMinutes(1)

  expect(newDuration).not.toBe(duration)
})

test("clone() creates new instance with the same duration value", () => {
  const duration = Duration.ofMinutes(10)
  const clonedDuration = duration.clone()

  expect(clonedDuration).not.toBe(duration)
  expect(clonedDuration.getMinutes()).toBe(duration.getMinutes())
})

test("toISOString()", () => {
  const duration = Duration.ofMinutes(10)
  expect(duration.toISOString()).toBe("PT10M")
})