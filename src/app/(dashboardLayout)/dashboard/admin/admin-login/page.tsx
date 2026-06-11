import LoginForm from "@/components/modules/admin/login-fom";

export default function AdminLoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] py-12 px-4">
      <div className="w-full max-w-md p-8 bg-white border border-neutral-200 rounded-xl shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Admin Portal Access
          </h1>
          <p className="mt-1.5 text-sm text-neutral-500">
            Provide credentials to manage products, articles, and customer
            orders.
          </p>
        </div>

        {/* Stateful client components are mounted here */}
        <LoginForm />
      </div>
    </div>
  );
}
