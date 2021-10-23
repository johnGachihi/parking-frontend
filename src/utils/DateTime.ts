import dayjs from "./my-dayjs"
import {Dayjs} from "dayjs";
import Duration from "./Duration";

class DateTime {
  private _dayjs: Dayjs

  constructor(dayjs: Dayjs) {
    this._dayjs = dayjs

    if (!this._dayjs.isValid()) {
      throw Error("Invalid ISO_8601 string provided")
    }
  }

  static fromISOString(ISO_8601: string) {
    return new DateTime(dayjs(ISO_8601))
  }

  fromNow(): Duration {
    return Duration.ofMilliseconds(this._dayjs.diff())
  }

  format(f: string) {
    return this._dayjs.format(f)
  }
}

export default DateTime