import dayjs from "dayjs"
import dayjsDuration, {
  Duration as dayjsDurationType,
} from "dayjs/plugin/duration"

dayjs.extend(dayjsDuration)

class Duration {
  private dayjsDuration: dayjsDurationType

  constructor(ISO_8061: string) {
    this.dayjsDuration = dayjs.duration(ISO_8061)

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

  static ofMinutes(minutes: number) {
    return new Duration(`PT${minutes}M`)
  }

  // TODO: Rename to asMinutes
  asMinutes() {
    return this.dayjsDuration.asMinutes()
  }

  addMinutes(minutes: number) {
    return new Duration(
      this.dayjsDuration.add(minutes, "minutes").toISOString()
    )
  }

  clone() {
    return new Duration(this.dayjsDuration.toISOString())
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
}

export default Duration
