import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Book } from "./index";
import { vi, beforeEach, test, expect, describe } from "vitest";

const mockPut = vi.fn(() => true);
const mockSetRead = vi.fn();

vi.mock("../../hooks/useRemote", () => ({
  useRemote: () => ({ sync: { put: mockPut } }),
}));
vi.mock("../../hooks/useBooks", () => ({
  useBooks: () => ({ setRead: mockSetRead }),
}));

describe("Add component", () => {
  beforeEach(() => {
    mockPut.mockRestore();
    mockSetRead.mockRestore();
  });

  describe("render", () => {
    test("read", async () => {
      mockSetRead.mockResolvedValueOnce({ id: "fake id", rev: "fake rev" });
      render(
        <Book
          title="Valor y al toro"
          author="Francisco Ibañez"
          isRead={true}
          id="fake-id"
        />
      );
      expect(mockPut).toBeCalledTimes(0);
      expect(mockSetRead).toBeCalledTimes(0);
      expect(await screen.findByText("Valor y al toro")).toBeVisible();
      expect(await screen.findByText("Francisco Ibañez")).toBeVisible();
      expect(await screen.findByTestId("open-book-button")).toBeVisible();
      const button = screen.getByTestId("open-book-button");
      button.click();
      expect(mockSetRead).toBeCalledTimes(1);
      await waitFor(() => expect(mockPut).toBeCalledTimes(1));
    });

    test("not read", async () => {
      mockSetRead.mockResolvedValueOnce({ id: "fake id", rev: "fake rev" });
      render(
        <Book
          title="Valor y al toro"
          author="Francisco Ibañez"
          isRead={false}
          id="fake-id"
        />
      );
      expect(mockPut).toBeCalledTimes(0);
      expect(mockSetRead).toBeCalledTimes(0);
      expect(await screen.findByText("Valor y al toro")).toBeVisible();
      expect(await screen.findByText("Francisco Ibañez")).toBeVisible();
      expect(await screen.findByTestId("close-book-button")).toBeVisible();
      const button = screen.getByTestId("close-book-button");
      button.click();
      expect(mockSetRead).toBeCalledTimes(1);
      await waitFor(() => expect(mockPut).toBeCalledTimes(1));
    });
  });
});
