import { PlusCircle } from "lucide-react";
import React from "react";

const AddJobButton = ({ showCreateJobModalFn }) => {
  return (
    <button
      onClick={showCreateJobModalFn}
      className="py-2 px-4  flex gap-2 font-mono cursor-pointer rounded-md text-white bg-blue-600 hover:bg-blue-800"
    >
      <PlusCircle className="text-white" /> Add Job
    </button>
  );
};

export default AddJobButton;
