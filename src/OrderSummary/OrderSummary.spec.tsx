import React from "react";
import { OrderSummary } from "./OrderSummary";
import { Loader } from "../shared/Loader";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

jest.mock("../shared/Loader", () => ({
  Loader: jest.fn(() => null),
}));

describe("OrderSummary", () => {
  afterEach(jest.clearAllMocks);

  describe("while order data being loaded", () => {
    it("renders loader", () => {
      const stubUseOrder = () => ({
        isLoading: true,
        order: undefined,
      });

      render(<OrderSummary useOrderHook={stubUseOrder} />);
      expect(Loader).toHaveBeenCalled();
    });
  });

  describe("when order is loaded", () => {
    const stubUseOrder = () => ({
      isLoading: false,
      order: {
        products: [
          {
            name: "Product foo",
            price: 10,
            image: "image.png",
          },
        ],
      },
    });

    it("renders order info", () => {
      const { container } = render(
        <MemoryRouter>
          <OrderSummary useOrderHook={stubUseOrder} />
        </MemoryRouter>
      );

      expect(container.innerHTML).toMatch("Product foo");
    });
  });

  describe("without order", () => {
    it("renders error message", () => {
      const stubUseOrder = () => ({
        isLoading: false,
        order: undefined,
      });

      const { container } = render(
        <OrderSummary useOrderHook={stubUseOrder} />
      );

      expect(container.innerHTML).toMatch("Couldn't load order info.");
    });
  });
});
