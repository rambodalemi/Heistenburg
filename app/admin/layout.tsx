import AdminProvider from '@/components/admin/admin-provider'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminProvider>
            {children}
        </AdminProvider>
    )
}
