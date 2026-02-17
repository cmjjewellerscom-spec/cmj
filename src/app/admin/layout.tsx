import AdminAuthCheck from '@/components/admin/AdminAuthCheck';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminAuthCheck>
            {children}
        </AdminAuthCheck>
    );
}
