import EducationNavbar from "@/components/layout/GraphNavbar";
import { FilterProvider } from "@/contexts/FilterContext";

export default function EducationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <FilterProvider>
            <div className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
                <EducationNavbar />
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </FilterProvider>
    );
}