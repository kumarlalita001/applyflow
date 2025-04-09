import React, { useState, useMemo } from "react";
import {
  Search,
  Trash2,
  Eye,
  Edit2,
  BriefcaseIcon,
  Menu,
  X,
  Home,
  Settings,
  LogOut,
  Bell,
  ChevronLeft,
  ChevronRight,
  User,
  HomeIcon,
  User2,
} from "lucide-react";
import AnalyticsCard from "../components/dashboard/AnalyticsCard";

import {
    SendHorizonalIcon,
    ThumbsDownIcon,
    MessagesSquareIcon,
    HandshakeIcon,
  } from 'lucide-react';
import LogoutModal from "../components/dashboard/LogoutModal";
import ViewJobModal from "../components/dashboard/job/ViewJobModal";
import EditJobModal from "../components/dashboard/job/EditJobModal";
import FilterJob from "../components/dashboard/job/FilterJob";
  
  const analyticsIssues = {};
const items = [
    {
      name: "Applied",
      numberOfItems: analyticsIssues?.total || 0,
      icon: <SendHorizonalIcon className="text-blue-500 h-10 w-10" />,
    },
    {
      name: "Rejected",
      numberOfItems: analyticsIssues?.inProgress || 0,
      icon: <ThumbsDownIcon className="text-red-500  h-10 w-10" />,
    },
    {
      name: "Interview",
      numberOfItems: analyticsIssues?.resolved || 0,
      icon: <MessagesSquareIcon className="text-yellow-500  h-10 w-10" />,
    },
    {
      name: "Offer",
      numberOfItems: analyticsIssues?.invalidate || 0,
      icon: <HandshakeIcon className="text-green-500  h-10 w-10" />,
    },
];
  

// Dummy Data
const initialApplications = [
  {
    id: "1",
    company: "Google",
    role: "Senior Frontend Developer",
    status: "Interview",
    dateApplied: "2024-03-10",
    link: "https://google.com/careers",
    description: "Leading frontend development initiatives",
    salary: "$150,000 - $180,000",
    location: "Mountain View, CA",
    notes: "Second interview scheduled",
  },
  {
    id: "2",
    company: "Microsoft",
    role: "Full Stack Engineer",
    status: "Applied",
    dateApplied: "2024-03-15",
    link: "https://microsoft.com/careers",
    description: "Full stack development with .NET and React",
    location: "Redmond, WA",
  },
  {
    id: "3",
    company: "Amazon",
    role: "Software Development Engineer",
    status: "Offer",
    dateApplied: "2024-02-28",
    link: "https://amazon.com/jobs",
    salary: "$160,000 - $200,000",
    location: "Seattle, WA",
  },
  {
    id: "4",
    company: "Meta",
    role: "React Developer",
    status: "Rejected",
    dateApplied: "2024-03-01",
    link: "https://meta.com/careers",
    location: "Remote",
  },
  {
    id: "5",
    company: "Apple",
    role: "iOS Developer",
    status: "Interview",
    dateApplied: "2024-03-12",
    link: "https://apple.com/careers",
    location: "Cupertino, CA",
  },
  // Add more dummy data for pagination
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `${i + 6}`,
    company: `Tech Company ${i + 1}`,
    role: `Software Engineer ${i + 1}`,
    status: ["Applied", "Interview", "Offer", "Rejected"][
      Math.floor(Math.random() * 4)
    ],
    dateApplied: new Date(2024, 2, Math.floor(Math.random() * 30) + 1)
      .toISOString()
      .split("T")[0],
    link: "https://example.com/careers",
    location: "Remote",
  })),
];

export const statusColors = {
  Applied: "bg-blue-100 text-blue-800",
  Interview: "bg-yellow-100 text-yellow-800",
  Offer: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

function Dashboard() {
  const [applications, setApplications] = useState(initialApplications);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const ITEMS_PER_PAGE = 5;

  // Filtered applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        app.role.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus = !filters.status || app.status === filters.status;

      const dateInRange =
        (!filters.startDate || app.dateApplied >= filters.startDate) &&
        (!filters.endDate || app.dateApplied <= filters.endDate);

      return matchesSearch && matchesStatus && dateInRange;
    });
  }, [applications, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Update status
  const updateStatus = (id, newStatus) => {
    setApplications((apps) =>
      apps.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  // Delete application
  const deleteApplication = (id) => {
    setApplications((apps) => apps.filter((app) => app.id !== id));
  };

  // View application
  const handleView = (application) => {
    setSelectedApplication(application);
    setShowViewModal(true);
  };

  // Edit application
  const handleEdit = (application) => {
    setSelectedApplication(application);
    setShowEditModal(true);
  };

  // filter function
  const filterJobFn = (e) => {
    console.log("filters",e.target.name,"value",e.target.value);
    setFilters((prevFilters) => ({ ...prevFilters, [e.target.name]: e.target.value }));
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-indigo-700 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-indigo-800">
          <div className="flex items-center">
            <BriefcaseIcon className="h-8 w-8 text-white" />
            <span className="ml-2 text-white font-semibold">Job Tracker</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-white">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-5 px-2">
          <a
            href="#"
            className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-white bg-indigo-800"
          >
            <Home className="mr-4 h-6 w-6" />
            Dashboard
          </a>
          <a
            href="#"
            className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-indigo-100 hover:bg-indigo-600"
          >
            <Settings className="mr-4 h-6 w-6" />
            Settings
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 ${
          sidebarOpen ? "ml-64" : "ml-0"
        } transition-margin duration-300 ease-in-out`}
      >
        {/* Top Bar */}

        <div className="bg-white  px-4 sm:px-4  shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2">
                <User2/>
                <span className="text-gray-700 font-medium">John Doe</span>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <AnalyticsCard items={items} />
        </div>

        <div className="py-8 px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <FilterJob filterJobFn={filterJobFn} filters={filters}/>

          {/* Applications Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Applied
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          <a
                            href={application.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-indigo-600"
                          >
                            {application.company}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        className={`text-sm rounded-full px-3 py-1 font-medium ${
                          statusColors[application.status]
                        }`}
                        value={application.status}
                        onChange={(e) =>
                          updateStatus(application.id, e.target.value)
                        }
                      >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.dateApplied).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleView(application)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(application)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => deleteApplication(application.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        filteredApplications.length
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredApplications.length}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() =>
                        setCurrentPage((page) => Math.max(1, page - 1))
                      }
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === currentPage
                              ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                    <button
                      onClick={() =>
                        setCurrentPage((page) => Math.min(totalPages, page + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <LogoutModal
         cancelLogout={() => setShowLogoutModal(false)} 
         logout={() => setShowLogoutModal(false)}/>
      )}

      {/* View Modal */}
      {showViewModal && selectedApplication && (
       <ViewJobModal
        selectedApplication={selectedApplication} 
        closeViewJobModal={() => setShowViewModal(false)}/>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedApplication && (
        <EditJobModal 
        selectedApplication={selectedApplication} 
        closeEditJobModal={() => setShowEditModal(false)} editJob={() => setShowEditModal(false)}/>
      )}
    </div>
  );
}

export default Dashboard;
