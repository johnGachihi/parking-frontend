import DateTime from "./DateTime"
import MockDate from "mockdate"

test("when ISO_8601  provided is invalid, then throws Error", () => {
  expect(() => DateTime.fromISOString("abc")).toThrow(
    "Invalid ISO_8601 string provided"
  )
})

test("create DateTime using fromISOString & format()", () => {
  const dateTime = DateTime.fromISOString("2021-10-22T16:00:00+03:00")
  expect(dateTime.format("YYYY MM DD HH mm ss")).toBe("2021 10 22 16 00 00")
})

test("fromNow()", () => {
  MockDate.set(new Date())
  const tenMinutesAhead = DateTime.fromISOString(minutesAhead(10).toISOString())
  expect(tenMinutesAhead.fromNow().asMinutes()).toBe(10)
  MockDate.reset()
})

function minutesAhead(minutes: number) {
  return new Date(new Date().getTime() + minutes * 60 * 1000)
}
