import { EditProductForm } from "@/components/forms/editProductForm";

const EditProductPage = () => {
  return (
    <main className="flex min-h-screen w-full max-w-[1200px] flex-col gap-4 items-center">
      <h1 className="text-3xl font-bold mt-8">Editar Produto</h1>
      <EditProductForm />
    </main>
  );
};

export default EditProductPage;
