import ManagementTabs from "@/components/navigation/ManagementTabs";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <ManagementTabs />
            {children}
        </div>
    );
}
