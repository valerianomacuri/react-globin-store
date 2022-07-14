import { act, renderHook } from "@testing-library/react-hooks";
import { useOrder } from "./useOrder";

describe("useOrder", () => {
  const mockOrderId = "1";

  it("fetches products on mount", async () => {
    const mockApiGetOrder = jest.fn(async () => ({
      products: [],
      success: true,
    }));

    await act(async () => {
      renderHook(() => useOrder(mockOrderId, mockApiGetOrder));
    });

    expect(mockApiGetOrder).toHaveBeenCalled();
  });

  describe("while waiting API response", () => {
    it("returns correct loading state data", () => {
      const mockApiGetOrder = jest.fn();

      const { result } = renderHook(() =>
        useOrder(mockOrderId, mockApiGetOrder)
      );

      expect(result.current.isLoading).toBe(true);
      expect(result.current.order).toEqual(undefined);
    });
  });
  describe("with error response", () => {
    it("returns error state data", async () => {
      const mockApiGetOrder = jest.fn(async () => ({
        success: false,
      }));

      const { result, waitForNextUpdate } = renderHook(() =>
        useOrder(mockOrderId, mockApiGetOrder)
      );

      await act(() => waitForNextUpdate());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.order).toEqual(undefined);
    });
  });
  describe("with successful response", () => {
    it("returns successful state data", async () => {
      const mockApiGetOrder = jest.fn(async () => ({
        products: [
          {
            name: "Product foo",
            price: 100,
            image: "./test.jpg",
          },
        ],
        success: true,
      }));

      const { result, waitForNextUpdate } = renderHook(() =>
        useOrder(mockOrderId, mockApiGetOrder)
      );

      await act(() => waitForNextUpdate());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.order).toEqual({
        products: [
          {
            name: "Product foo",
            price: 100,
            image: "./test.jpg",
          },
        ],
        success: true,
      });
    });
  });
});
