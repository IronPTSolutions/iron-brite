import { describe, expect, test, vi } from "vitest";
import { login } from "./api-service";
import axios from "axios";

vi.mock("axios", () => {
  return {
    default: {
      create: vi.fn().mockReturnThis(),
      post: vi.fn(),
      interceptors: {
        request: {
          use: vi.fn(),
        },
        response: {
          use: vi.fn(),
        },
      },
    },
  };
});

describe("API service", () => {
  describe("login", () => {
    test("happy case", () => {
      // Given
      const data = {
        email: "john@example.com",
        password: "12345456677898",
      };

      // When
      login(data);

      // Then
      expect(axios.post).toHaveBeenCalledWith("/sessions", data);
    });
  });
});
