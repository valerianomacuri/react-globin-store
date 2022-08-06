import { useUpdated, useBeforeUnmount, useMounted } from "../hooks";
import { ProductCard } from "./ProductCard";
import { useProducts } from "./useProducts";

interface HomeProps {
  useProductsHook?: () => Pick<
    ReturnType<typeof useProducts>,
    "categories" | "isLoading" | "error"
  >;
}

export const Home = ({ useProductsHook = useProducts }: HomeProps) => {
  const { categories, isLoading, error } = useProductsHook();

  useMounted(() => {
    console.log("onMounted", { categories, error, isLoading });
  });
  useBeforeUnmount(() => {
    console.log("onBeforeUnmounted", { categories, error, isLoading });
  });
  useUpdated(() => {
    console.log("onUpdated", { categories, error, isLoading });
  }, [isLoading, categories, error]);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error</>;
  }
  return (
    <>
      {categories.map((category) => (
        <section
          className="nes-container with-title showcase"
          key={category.name}
        >
          <h2 className="title">{category.name}</h2>
          <section className="items">
            {category.items.map((item) => (
              <ProductCard key={item.name} datum={item} />
            ))}
          </section>
        </section>
      ))}
    </>
  );
};
