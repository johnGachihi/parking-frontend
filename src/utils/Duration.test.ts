import Duration from "./Duration"

test("getMinutes() returns correct minutes", () => {
  const duration = new Duration("PT1M")
  expect(duration.asMinutes()).toBe(1)
})

test("when ISO_8086 duration provided is invalid, then throws Error", () => {
  expect(() => new Duration("1")).toThrow(
    "Invalid ISO 8061 duration string provided"
  )
})

test("create duration using ofMinutes", () => {
  expect(Duration.ofMinutes(10).asMinutes()).toBe(10)
})

test("addMinutes() adds minutes", () => {
  const duration = Duration.ofMinutes(10)

  expect(duration.addMinutes(1).asMinutes()).toBe(11)
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
  expect(clonedDuration.asMinutes()).toBe(duration.asMinutes())
})

test("toISOString()", () => {
  const duration = Duration.ofMinutes(10)
  expect(duration.toISOString()).toBe("PT10M")
})

test("hours()", () => {
  const duration = new Duration("PT10H30M")
  expect(duration.hours()).toBe(10)
})

test("minutes()", () => {
  const duration = new Duration("PT10H30M")
  expect(duration.minutes()).toBe(30)
})

test("format()", () => {
  const duration = new Duration("PT10H30M")
  expect(duration.format("H m")).toBe("10 30")
})
