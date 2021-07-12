import AdminLayout from '@/components/AdminLayout';
import EmptyState from '@/elements/EmptyState';

function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="grid flex-1 h-full p-6 -mt-52 lg:mt-0 overflow-y-auto transition duration-200 bg-white dark:bg-base-900 place-items-center">
        <EmptyState>Welcome</EmptyState>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
