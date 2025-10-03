import DashboardLayout from "../../components/navigation/DashboardLayout"


const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}

export default Layout