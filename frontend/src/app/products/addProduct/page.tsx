import { CreateProductForm } from "@/components/forms/createProductFrom";

const AddProductPage = () => {
  return (
    <main className="flex min-h-screen w-full max-w-[1200px] flex-col gap-4 items-center">
      <h1 className="text-3xl font-bold mt-8">Cadastrar Produto</h1>
      <CreateProductForm />
    </main>
  );
};

export default AddProductPage;
