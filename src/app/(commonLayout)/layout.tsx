import Footer from "@/components/shared/Footer";
import PublicNavbar from "@/components/shared/PublicNavbar";

export default function CommonLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            {/* 1. Navbar: Sticky at the top, max-w-7xl internally */}
            <PublicNavbar />

            {/* 
              2. Main Content Container
                 - `flex-1` pushes the footer down.
                 - `mx-auto max-w-7xl w-full` perfectly aligns the pages with your navbar grid lines.
                 - `px-4 sm:px-6 lg:px-8` matches the padding of the navbar perfectly so content never hits screen edges.
            */}
            <main className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            {/* 3. Footer pushes down to the bottom */}
            <Footer />
        </div>
    );
}