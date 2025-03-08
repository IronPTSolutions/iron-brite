import { describe, expect, test } from "vitest";
import { prettyCost } from "./utils";

describe("prettyCost", () => {
  test("happy case", () => {
    // Given
    const qty = 265;

    // When
    const result = prettyCost(qty);

    // Then
    expect(result).toBe("2,65 €");
  });

  test("zero", () => {
    // Given
    const qty = 0;

    // When
    const result = prettyCost(qty);

    // Then
    expect(result).toBe("0,00 €");
  });

  test("big number", () => {
    // Given
    const qty = 12324;

    // When
    const result = prettyCost(qty);

    // Then
    expect(result).toBe("123,24 €");
  });

  test("int number", () => {
    // Given
    const qty = 1200;

    // When
    const result = prettyCost(qty);

    // Then
    expect(result).toBe("12,00 €");
  });

  test("not a number", () => {
    // Given
    const qty = "hola!";

    // When
    const result = prettyCost(qty);

    // Then
    expect(result).toBe("0,00 €");
  });
});
