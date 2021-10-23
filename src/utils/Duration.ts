import dayjs from "./my-dayjs"
import { Duration as dayjsDurationType } from "dayjs/plugin/duration"

class Duration {
  private dayjsDuration: dayjsDurationType

  private constructor(dayjsDuration: dayjsDurationType) {
    this.dayjsDuration = dayjsDuration

    if (!this.isISO8061DurationStringValid()) {
      throw Error("Invalid ISO 8061 duration string provided")
    }
  }

  private isISO8061DurationStringValid() {
    /*
    When ISO 8061 duration is invalid, the as* methods
    on the dayjs.Duration return NaN.
    For this method to work, it must be called after the
    dayjsDuration has been created.
     */
    return !Number.isNaN(this.dayjsDuration.asMilliseconds())
  }

  static fromISO_8601String(ISO_8601: string) {
    return new Duration(dayjs.duration(ISO_8601))
  }

  static ofMilliseconds(milliseconds: number) {
    return new Duration(dayjs.duration(milliseconds, "ms"))
  }

  static ofMinutes(minutes: number) {
    return new Duration(dayjs.duration(minutes, "m"))
  }

  asSeconds() {
    return this.dayjsDuration.asSeconds()
  }

  asMinutes() {
    return this.dayjsDuration.asMinutes()
  }

  addMinutes(minutes: number) {
    return new Duration(this.dayjsDuration.add(minutes, "minutes"))
  }

  clone() {
    return new Duration(this.dayjsDuration.clone())
  }

  toISOString() {
    return this.dayjsDuration.toISOString()
  }

  hours() {
    return this.dayjsDuration.hours()
  }

  minutes() {
    return this.dayjsDuration.minutes()
  }

  format(f: string) {
    return this.dayjsDuration.format(f)
  }
}

export default Duration
