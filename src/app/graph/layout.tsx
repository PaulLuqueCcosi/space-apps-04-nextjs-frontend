import EducationNavbar from "@/components/layout/GraphNavbar";
import { FilterProvider } from "@/contexts/FilterContext";
import { GraphProvider } from "@/contexts/GraphContext";

export default function EducationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <FilterProvider>
            <GraphProvider>
                <div className="h-screen w-full overflow-hidden flex flex-col" style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
                    <EducationNavbar />
                    <div className="flex-1 overflow-hidden pt-16">
                        {children}
                    </div>
                </div>
            </GraphProvider>
        </FilterProvider>
    );
}