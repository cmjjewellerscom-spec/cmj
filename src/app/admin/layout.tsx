import AdminAuthCheck from '@/components/admin/AdminAuthCheck';

export const dynamic = 'force-dynamic';

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
