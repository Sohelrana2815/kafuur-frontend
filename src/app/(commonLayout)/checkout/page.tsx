import CheckoutForm from "@/components/modules/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="w-full min-h-screen bg-[#09090b] text-white pt-24 pb-24 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-2 mb-10 border-b border-white/10 pb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider uppercase font-heading text-white">
            Secure Checkout
          </h1>
          <p className="text-xs text-neutral-500 tracking-wide font-light">
            Enter your shipping details to complete your fragrance order.
          </p>
        </div>

        {/* Stateful Client Entry Layout */}
        <CheckoutForm />
      </div>
    </div>
  );
}
