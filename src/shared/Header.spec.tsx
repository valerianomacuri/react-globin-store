import { fireEvent, prettyDOM, render } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import { Header } from "./Header";

// reemplaza al componente Cart Widget
jest.mock("./CartWidget", () => ({
  CartWidget: () => <div>Cart widget</div>,
}));

describe("Header", () => {
  it("renders correctly", () => {
    const { getByText, container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(container.innerHTML).toMatch("Globin Store");
    expect(container.innerHTML).toMatch("Cart widget");
  });
});
