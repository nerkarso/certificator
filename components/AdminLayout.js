import AdminSideBar from '@/components/AdminSideBar';

function AdminLayout({ children }) {
  return (
    <div className="h-full lg:flex">
      <AdminSideBar />
      {children}
    </div>
  );
}

export default AdminLayout;
