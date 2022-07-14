import React from "react";
import { Cart } from "./Cart";
import { fireEvent, render } from "@testing-library/react";
import { CartItemProps } from "./CartItem";
import { MemoryRouter } from "react-router-dom";

jest.mock("./CartItem", () => ({
  CartItem: ({ product }: CartItemProps) => {
    const { name, price, image } = product;
    return (
      <div>
        {name} {price} {image}
      </div>
    );
  },
}));

describe("Cart", () => {
  describe("without products", () => {
    const stubCartHook = () => ({
      products: [],
      removeFromCart: () => {},
      totalPrice: () => 0,
    });

    it("renders empty cart message", () => {
      const { container } = render(
        <MemoryRouter>
          <Cart useCartHook={stubCartHook} />
        </MemoryRouter>
      );
      expect(container.innerHTML).toMatch("Your cart is empty.");
    });
  });

  describe("with products", () => {
    const products = [
      {
        name: "Product foo",
        price: 100,
        image: "/image/foo_source.png",
      },
      {
        name: "Product bar",
        price: 100,
        image: "/image/bar_source.png",
      },
    ];

    const stubCartHook = () => ({
      products,
      removeFromCart: () => {},
      totalPrice: () => 55,
    });

    it("renders cart products list with total price", () => {
      const { container } = render(
        <MemoryRouter>
          <Cart useCartHook={stubCartHook} />
        </MemoryRouter>
      );

      expect(container.innerHTML).toMatch(
        "Product foo 100 /image/foo_source.png"
      );
      expect(container.innerHTML).toMatch(
        "Product bar 100 /image/bar_source.png"
      );
      expect(container.innerHTML).toMatch("Total: 55 Zm");
    });
  });
});
