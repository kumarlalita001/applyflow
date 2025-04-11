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
import TopHeader from "../components/dashboard/TopHeader";
import DashSidebar from "../components/dashboard/DashSidebar";
import Pagination from "../components/dashboard/job/Pagination";
import ShowJobTable from "../components/dashboard/job/ShowJobTable";
import AddJobButton from "../components/dashboard/job/AddJobButton";

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
    jobs: [],
    total: 0,
  });
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
  console.log("analytics", analyticsIssues);
  const items = [
    {
      name: "Applied",
      numberOfItems: analyticsIssues?.Applied || 0,
      icon: <SendHorizonalIcon className="text-blue-500 h-10 w-10" />,
    },
    {
      name: "Rejected",
      numberOfItems: analyticsIssues?.Rejected || 0,
      icon: <ThumbsDownIcon className="text-red-500  h-10 w-10" />,
    },
    {
      name: "Interview",
      numberOfItems: analyticsIssues?.Interview || 0,
      icon: <MessagesSquareIcon className="text-yellow-500  h-10 w-10" />,
    },
    {
      name: "Offer",
      numberOfItems: analyticsIssues?.Offer || 0,
      icon: <HandshakeIcon className="text-green-500  h-10 w-10" />,
    },
  ];

  const ITEMS_PER_PAGE = 5;

  const totalPages = Math.ceil(jobs?.total / ITEMS_PER_PAGE);

  // Delete application
  const handleDelete = (application) => {
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
        //   console.log(response.data,"dATA");
      } catch (err) {
        console.log(err);
      }
    };

    fetchAnalytics();
  }, []);

  const prevPageFn = () => setCurrentPage((page) => Math.max(1, page - 1));
  const nextPageFn = () =>
    setCurrentPage((page) => Math.min(totalPages, page + 1));

  return (
    <div className="min-h-screen  font-mono w-full bg-gray-50 flex">
      {/* Sidebar */}
      <DashSidebar
        sidebarOpen={sidebarOpen}
        sidebarCloseFn={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div
        className={`flex-1 w-full ${
          sidebarOpen ? "ml-64" : "ml-0"
        } transition-margin duration-300 ease-in-out`}
      >
        {/* Top Bar */}
        <TopHeader
          sidebarOpenCloseFn={() => setSidebarOpen(!sidebarOpen)}
          logoutModalOpenFn={() => setShowLogoutModal(true)}
        />

        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <AnalyticsCard items={items} />
        </div>

        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end">
            <AddJobButton
              showCreateJobModalFn={() => setShowCreateJobModal(true)}
            />
          </div>
          {/* Filters */}
          <FilterJob filterJobFn={filterJobFn} filters={filters} />

          {/* Applications Table */}
          {!isLoading ? (
            <div className="bg-white w-full  rounded-lg shadow  ">
              <ShowJobTable
                jobs={jobs}
                handleView={handleView}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                nextPageFn={nextPageFn}
                prevPageFn={prevPageFn}
              />
            </div>
          ) : (
            <ShimmerTable />
          )}
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <LogoutModal
          onClose={() => setShowLogoutModal(false)}
         
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
