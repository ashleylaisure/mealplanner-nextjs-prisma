import { Button } from "@/components/ui/button"
import DashboardLayout from "./_components/DashboardLayout"


const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <DashboardLayout>  
            {children}
        </DashboardLayout>
    )
}

export default Layout