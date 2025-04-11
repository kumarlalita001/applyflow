import React, { useState, useMemo, useEffect } from "react";
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
  PlusCircle,
} from "lucide-react";
import AnalyticsCard from "../components/dashboard/AnalyticsCard";

import {
  SendHorizonalIcon,
  ThumbsDownIcon,
  MessagesSquareIcon,
  HandshakeIcon,
} from "lucide-react";
import LogoutModal from "../components/dashboard/LogoutModal";
import ViewJobModal from "../components/dashboard/job/ViewJobModal";
import EditJobModal from "../components/dashboard/job/EditJobModal";
import FilterJob from "../components/dashboard/job/FilterJob";
import CreateJobModal from "../components/dashboard/job/CreateJobModal";
import { getData } from "../api/axiosConfig";
import ShimmerTable from "../components/dashboard/job/ShimmerTable";
import DeleteJobModal from "../components/dashboard/job/DeleteJobModal";

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

export const statusColors = {
  Applied: "bg-blue-100 text-blue-800",
  Interview: "bg-yellow-100 text-yellow-800",
  Offer: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

function Dashboard() {
  const [jobs, setJobs] = useState({
    "jobs": [],
    "total": 0
},);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [showDeleteJobModal, setShowDeleteJobModal] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const [analyticsIssues, setAnalyticsIssues] = useState({
    Applied: 0,
    Interview: 0,
    Offer: 0,
    Rejected: 0,
  });
  console.log("analytics",analyticsIssues);
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

  const ITEMS_PER_PAGE = 5;

  const totalPages = Math.ceil(jobs?.total / ITEMS_PER_PAGE);

  // Delete application
  const deleteApplication = (application) => {
    setSelectedApplication(application);
    setShowDeleteJobModal(true);
    console.log("i am called");
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
    setCurrentPage(1);
    console.log("filters", e.target.name, "value", e.target.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams();

      if (filters.search) {
        query.append("search", filters.search);
      }
      if (filters.status) query.append("status", filters.status);
      if (filters.startDate) query.append("startDate", filters.startDate);
      if (filters.endDate) query.append("endDate", filters.endDate);
      // Pagination
      query.append("limit", ITEMS_PER_PAGE);
      query.append("skip", (currentPage - 1) * ITEMS_PER_PAGE);

      const result = await getData(`/api/v0/jobpost/?${query.toString()}`);
      console.log(`/api/v0/jobpost/?${query.toString()}`, "queryURL");
      console.log(result.data, "datatResult");
      setJobs(result.data); // assuming result structure is { data: [...] }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      //  ErrorToast(error.message || "Failed to fetch jobs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("i am called");
    fetchJobs();
  }, [filters, currentPage, refetch]);


  useEffect(() => {
    // Fetch the analytics data when the component mounts
    const fetchAnalytics = async () => {
      try {
        // const response = await getData("/api/v0/jobpost/getanalytics"); // Update API URL accordingly
        // setAnalyticsData(response.data);
        console.log(response.data,"dATA");
        
      } catch (err) {
        console.log(err);
      }
    };

    fetchAnalytics();
  }, []);

  console.log(jobs?.jobs, "jobs");
  return (
    <div className="min-h-screen  font-mono w-full bg-gray-50 flex">
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
        className={`flex-1 w-full ${
          sidebarOpen ? "ml-64" : "ml-0"
        } transition-margin duration-300 ease-in-out`}
      >
        {/* Top Bar */}
        <div className="bg-white  px-4 sm:px-4  shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 cursor-pointer"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 cursor-pointer">
                <Bell className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2">
                <User2 />
                <span className="text-gray-700 font-medium">John Doe</span>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="text-gray-500 cursor-pointer hover:text-gray-700"
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
          <div className="flex justify-end">
            <button
              onClick={() => setShowCreateJobModal(true)}
              className="py-2 px-4  flex gap-2 font-mono cursor-pointer rounded-md text-white bg-blue-600 hover:bg-blue-800"
            >
              <PlusCircle className="text-white" /> Add Job
            </button>
          </div>
          {/* Filters */}
          <FilterJob filterJobFn={filterJobFn} filters={filters} />

          {/* Applications Table */}
          {!isLoading ? (
            <div className="bg-white w-full   rounded-lg shadow  ">
              <div className="overflow-x-auto ">
                <table className=" min-w-full divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left   text-xs  font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left   text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left   text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left   text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Link
                      </th>
                      <th className="px-6 py-3 text-left   text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Applied
                      </th>
                      <th className="px-6 py-3 text-left   text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y  divide-gray-200">
                    {jobs && jobs?.jobs?.length > 0 ? (
                      jobs.jobs.map((application) => (
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
                            <span
                              className={`text-sm rounded-full px-3 py-1 font-medium ${
                                statusColors[application.status]
                              }`}
                            >
                              {application.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <a
                              href={application.link}
                              target="_blank"
                              className="text-blue-500 hover:text-blue-900"
                            >
                              Link
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(
                              application.appliedDate
                            ).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => handleView(application)}
                                className="text-indigo-600 cursor-pointer hover:text-indigo-900"
                              >
                                <Eye className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleEdit(application)}
                                className="text-blue-600 cursor-pointer hover:text-blue-900"
                              >
                                <Edit2 className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => deleteApplication(application)}
                                className="text-red-600 cursor-pointer hover:text-red-900"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className=" px-6  text-center  h-[50vh] w-full"
                        >
                          No JobPosts Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {/* <div className="bg-white w-full px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
                        jobs.length
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {jobs.length}
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
            </div> */}
              <div className="w-full px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 bg-white">
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 cursor-pointer py-2 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="text-sm text-gray-700">
                  Page <span className="font-medium">{currentPage}</span> of{" "}
                  <span className="font-medium">{totalPages}</span>
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 cursor-pointer border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <ShimmerTable />
          )}
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <LogoutModal
          cancelLogout={() => setShowLogoutModal(false)}
          logout={() => setShowLogoutModal(false)}
        />
      )}

      {/* Create Job Modal */}
      {showCreateJobModal && (
        <CreateJobModal
          refetchFn={setRefetch}
          onClose={() => setShowCreateJobModal(false)}
        />
      )}

      {/* View Modal */}
      {showViewModal && selectedApplication && (
        <ViewJobModal
          selectedApplication={selectedApplication}
          closeViewJobModal={() => setShowViewModal(false)}
        />
      )}
      {/* Delete Modal */}
      {showDeleteJobModal && selectedApplication && (
        <DeleteJobModal
          refetchFn={setRefetch}
          selectedApplication={selectedApplication}
          onClose={() => setShowDeleteJobModal(false)}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && selectedApplication && (
        <EditJobModal
          existingData={selectedApplication}
          refetchFn={setRefetch}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
