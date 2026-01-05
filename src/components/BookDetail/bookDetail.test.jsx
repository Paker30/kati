import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { BookDetail } from "./index";

describe("Book detail", () => {
  describe("render", () => {
    test("read", async () => {
      render(
        <BookDetail
          title="Valor y al toro"
          author="Francisco Ibañez"
          isReaded={true}
        />
      );
      const title = await screen.findByText("Valor y al toro");
      const author = await screen.findByText("Author: Francisco Ibañez");
      const icon = await screen.findByText("📖");
      expect(title).toBeVisible();
      expect(author).toBeVisible();
      expect(icon).toBeVisible();
    });

    test("not read", async () => {
      render(
        <BookDetail
          title="Valor y al toro"
          author="Francisco Ibañez"
          isReaded={false}
          id="fake-id"
        />
      );
      expect(await screen.findByText("Valor y al toro")).toBeVisible();
      expect(await screen.findByText("Author: Francisco Ibañez")).toBeVisible();
      expect(await screen.findByText("📘")).toBeVisible();
    });
  });
});
