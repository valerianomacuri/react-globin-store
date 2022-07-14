import { useEffect, useState } from "react";
import { Category } from "../shared/types";
import { getProducts } from "../utils/api";

export const useProducts = (apiGetProducts = getProducts) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiGetProducts();
        setCategories(data.categories || []);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { categories, isLoading, error };
};
