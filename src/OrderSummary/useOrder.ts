import { useState, useEffect } from "react";
import { Product } from "../shared/types";
import { getOrder } from "../utils/api";

export interface Order {
  products: Product[];
}

const getOrderId = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("orderId");
};

export const useOrder = (orderId = getOrderId(), apiGetOrder = getOrder) => {
  const [order, setOrder] = useState<Order>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!orderId) {
          return;
        }
        const order = await apiGetOrder(orderId);
        if (order.success) {
          setOrder(order);
        }
        setIsLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return { order, isLoading };
};
