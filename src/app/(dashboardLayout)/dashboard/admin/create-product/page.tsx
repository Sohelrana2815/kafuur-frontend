import CreateProductForm from "@/components/modules/admin/create-product-form";

export default function AdminCreateProductPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 bg-neutral-50/50">
      <div className="w-full max-w-2xl p-8 bg-white border border-neutral-200 rounded-xl shadow-sm">
        <div className="mb-6 pb-4 border-b border-neutral-100">
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Add Store Fragrance
          </h1>
          <p className="mt-1 text-sm">
            Catalog a premium new addition to the active store database
            inventory collection.
          </p>
        </div>

        {/* Stateful Client Entry Layout */}
        <CreateProductForm />
      </div>
    </div>
  );
}
