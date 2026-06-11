import RegisterForm from "@/components/modules/admin/register-form";

export default function AdminRegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <div className="w-full max-w-md p-6 bg-white border rounded-lg shadow-sm border-neutral-200">
        <h1 className="text-2xl font-bold text-center text-neutral-800">
          Spawn Administrator
        </h1>
        <p className="mt-1 text-sm text-center text-neutral-500">
          Register a secure secondary root level administrative dashboard user.
        </p>
        
        {/* Render your stateful client form component */}
        <RegisterForm />
      </div>
    </div>
  );
}