import { describe, it, expect } from "vitest";
import { checkCrisisContent, containsCrisisContent } from "./crisisDetection";

describe("checkCrisisContent", () => {
  it("returns none for empty or benign text", () => {
    expect(checkCrisisContent("").severity).toBe("none");
    expect(checkCrisisContent("   ").severity).toBe("none");
    expect(checkCrisisContent("Work has been stressful lately").severity).toBe("none");
    expect(checkCrisisContent("I need to cut myself some slack this week").severity).toBe("none");
  });

  it("flags HIGH for explicit first-person crisis language", () => {
    expect(checkCrisisContent("I want to die").severity).toBe("high");
    expect(checkCrisisContent("thinking about killing myself tonight").severity).toBe("high");
    expect(checkCrisisContent("I want to unalive myself").severity).toBe("high");
    expect(checkCrisisContent("sewerslide").severity).toBe("high");
  });

  it("flags MEDIUM for ambiguous distress language", () => {
    expect(checkCrisisContent("I can't go on anymore").severity).toBe("medium");
    expect(checkCrisisContent("what's the point of anything anymore").severity).toBe("medium");
    expect(checkCrisisContent("I don't want to hurt myself, just venting").severity).toBe("medium");
    expect(checkCrisisContent("been doing sh again").severity).toBe("medium");
  });

  it("downgrades HIGH to MEDIUM when negated or third-person", () => {
    expect(checkCrisisContent("I don't want to be dead, I want things to change").severity).toBe("medium");
    expect(checkCrisisContent("my brother is suicidal and I don't know how to help").severity).toBe("medium");
    expect(checkCrisisContent("I used to feel suicidal but I'm getting help").severity).toBe("medium");
  });

  it("handles curly apostrophes from mobile keyboards", () => {
    expect(checkCrisisContent("I don\u2019t want to live anymore").severity).toBe("high");
  });

  it("containsCrisisContent is true for any match", () => {
    expect(containsCrisisContent("I want to die")).toBe(true);
    expect(containsCrisisContent("I can't go on")).toBe(true);
    expect(containsCrisisContent("Just tired from work")).toBe(false);
  });
});
