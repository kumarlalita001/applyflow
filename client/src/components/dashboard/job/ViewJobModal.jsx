import React from 'react'
import { statusColors } from '../../../pages/Dashboard'


const ViewJobModal = ({selectedApplication,closeViewJobModal}) => {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Application Details
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Company
                        </h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedApplication.company}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Role
                        </h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedApplication.role}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Status
                        </h4>
                        <p
                          className={`mt-1 text-sm inline-block px-2 py-1 rounded-full ${
                            statusColors[selectedApplication.status]
                          }`}
                        >
                          {selectedApplication.status}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Location
                        </h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedApplication.location}
                        </p>
                      </div>
                      {selectedApplication.salary && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Salary Range
                          </h4>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedApplication.salary}
                          </p>
                        </div>
                      )}
                      {selectedApplication.description && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Description
                          </h4>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedApplication.description}
                          </p>
                        </div>
                      )}
                      {selectedApplication.notes && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Notes
                          </h4>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedApplication.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={closeViewJobModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ViewJobModal
