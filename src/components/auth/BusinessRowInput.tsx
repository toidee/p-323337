
import React from "react";

interface BusinessRowInputProps {
  id: string;
  businessName: string;
  dtiNumber: string;
  onUpdate: (id: string, field: "businessName" | "dtiNumber", value: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

const BusinessRowInput: React.FC<BusinessRowInputProps> = ({
  id,
  businessName,
  dtiNumber,
  onUpdate,
  onRemove,
  canRemove,
}) => {
  return (
    <div className="flex gap-4 mb-4 items-start">
      <div className="flex-1">
        <label className="text-base font-medium mb-1 block">
          Business Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={businessName}
          onChange={(e) => onUpdate(id, "businessName", e.target.value)}
          className="w-full h-12 text-base bg-[#e2e2e2] px-3 rounded-[10px] border-none"
          placeholder="Enter business name"
          required
        />
      </div>
      
      <div className="flex-1">
        <label className="text-base font-medium mb-1 block">
          DTI Certificate No. <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={dtiNumber}
          onChange={(e) => onUpdate(id, "dtiNumber", e.target.value)}
          className="w-full h-12 text-base bg-[#e2e2e2] px-3 rounded-[10px] border-none"
          placeholder="Enter DTI number"
          required
        />
      </div>
      
      {canRemove && (
        <button
          type="button"
          onClick={() => onRemove(id)}
          className="mt-8 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center"
          aria-label="Remove business"
        >
          -
        </button>
      )}
    </div>
  );
};

export default BusinessRowInput;
