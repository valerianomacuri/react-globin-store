import {
  render,
  fireEvent,
  cleanup,
  prettyDOM,
  waitFor,
} from "@testing-library/react";
import { CheckoutForm } from "./CheckoutForm";
import { act } from "react-dom/test-utils";

describe("CheckoutForm", () => {
  afterAll(jest.clearAllMocks);
  it("renders correctly", () => {
    const { container } = render(<CheckoutForm />);
    expect(container.innerHTML).toMatch("Cardholders Name");
    expect(container.innerHTML).toMatch("Card Number");
    expect(container.innerHTML).toMatch("Expiration Date");
    expect(container.innerHTML).toMatch("CVV");
  });

  describe("with invalid inputs", () => {
    it("shows errors ", async () => {
      const { container, getByText } = render(<CheckoutForm />);

      await act(async () => {
        fireEvent.click(getByText("Place order"));
      });

      expect(container.innerHTML).toMatch("Error:");
    });
  });

  describe("with valid inputs", () => {
    describe("on place order button click", () => {
      // it("calls submit function with form data", async () => {
      //   const mockSubmit = jest.fn();
      //   const { getByTestId, getByText, container } = render(
      //     <CheckoutForm submit={mockSubmit} />
      //   );
      //   fireEvent.change(getByTestId("name"), {
      //     target: { value: "Bibo Bobbins" },
      //   });
      //   fireEvent.change(getByTestId("cardNumber"), {
      //     target: { value: "0000 0000 0000 0000" },
      //   });
      //   fireEvent.change(getByTestId("expDate"), {
      //     target: { value: "3030-05" },
      //   });
      //   fireEvent.change(getByTestId("cvv"), {
      //     target: { value: "123" },
      //   });
      //   fireEvent.click(getByText(/Place order/i));
      //   await waitFor(() => expect(mockSubmit).toBeCalled(), { timeout: 3000 });
      // });
    });
  });
});
