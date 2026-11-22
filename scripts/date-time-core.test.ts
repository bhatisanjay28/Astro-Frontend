/**
 * Unit pins for the pure date/time logic (src/scripts/date-time-core.ts).
 * Lives in scripts/ — tsconfig excludes it from astro check, because the
 * bun:test types aren't wired into the app tsconfig. Run: bun test scripts/
 *
 * Written after the S18 owner find: a complete hh:mm without AM/PM composed
 * as AM — pinned here so it can't regress (S18 story AC-5: never a wrong
 * result).
 */
import { expect, test } from "bun:test";
import { checkTime, timeToParts } from "../src/scripts/date-time-core";

test("hour12 — complete hh:mm WITHOUT a meridiem is invalid (must not assume AM)", () => {
  const c = checkTime({ hh: "10", mm: "30", ampm: "" }, true);
  expect(c.ok).toBe(false);
  expect(c.code).toBe("ampm");
  expect(c.value).toBe("");
  expect(c.message).toContain("AM or PM");
});

test("hour12 — am/pm select the right 24h value", () => {
  expect(checkTime({ hh: "10", mm: "30", ampm: "am" }, true).value).toBe("10:30");
  expect(checkTime({ hh: "10", mm: "30", ampm: "pm" }, true).value).toBe("22:30");
  expect(checkTime({ hh: "12", mm: "05", ampm: "am" }, true).value).toBe("00:05");
  expect(checkTime({ hh: "12", mm: "05", ampm: "pm" }, true).value).toBe("12:05");
});

test("hour24 — no meridiem needed, 00:00–23:59 valid", () => {
  expect(checkTime({ hh: "00", mm: "30", ampm: "" }, false).value).toBe("00:30");
  expect(checkTime({ hh: "23", mm: "59", ampm: "" }, false).value).toBe("23:59");
});

test("range guards still fire before the meridiem check", () => {
  expect(checkTime({ hh: "00", mm: "30", ampm: "" }, true).code).toBe("hour");
  expect(checkTime({ hh: "13", mm: "30", ampm: "" }, true).code).toBe("hour");
  expect(checkTime({ hh: "10", mm: "60", ampm: "" }, true).code).toBe("minute");
  expect(checkTime({ hh: "1", mm: "30", ampm: "" }, true).code).toBe("incomplete");
});

test("timeToParts derives the meridiem only from an existing 24h value", () => {
  expect(timeToParts("22:30", true)).toEqual({ hh: "10", mm: "30", ampm: "pm" });
  expect(timeToParts("10:30", true)).toEqual({ hh: "10", mm: "30", ampm: "am" });
  expect(timeToParts("00:15", true)).toEqual({ hh: "12", mm: "15", ampm: "am" });
  expect(timeToParts("23:59", false)).toEqual({ hh: "23", mm: "59", ampm: "" });
});
