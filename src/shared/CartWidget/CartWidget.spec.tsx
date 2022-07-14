import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartWidget } from "./CartWidget";

describe("CartWidget", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CartWidget />
      </MemoryRouter>
    );
    const cart = getByTestId("cart");
    expect(cart).toBeInTheDocument();
  });
  it("shows the amount of products in the cart", () => {
    const stubCartHook = () => ({
      products: [
        {
          name: "Product foo",
          price: 0,
          image: "image.png",
        },
      ],
    });

    const { container } = render(
      <MemoryRouter>
        <CartWidget useCartHook={stubCartHook} />
      </MemoryRouter>
    );

    expect(container.innerHTML).toMatch("1");
  });
});
