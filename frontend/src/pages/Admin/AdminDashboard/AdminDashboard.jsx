import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";

function AdminDashboard() {
  return (
    <>
      <AdminHeader />
      <AdminSidebar />
      <main className="admin-container">
        <div className="admin-title">
          <h1>Admin Dashboard</h1>
        </div>
      </main>
    </>
  );
}

export default AdminDashboard;
