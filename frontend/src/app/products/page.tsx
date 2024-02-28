import { ListProducts } from "@/components/products/listProducts";

const ProductsPage = () => {
  return (
    <section className="w-full max-w-[1200px] flex min-h-screen flex-col">
      <ListProducts />
    </section>
  );
};

export default ProductsPage;
