import React, { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  User,
  CreditCard,
  MapPin,
  Users,
  Check,
} from "lucide-react";

const CustomerOnboardingStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Details
    name: "",
    mobile: "",
    email: "",
    panNumber: "",
    dob: "",
    // Personal Details
    gender: "",
    maritalStatus: "",
    fatherName: "",
    motherName: "",
    spouseName: "",
    occupationType: "",
    aadhaarLast4: "",
    residentialStatus: "",
    citizenshipCountry: "",
    placeOfBirth: "",
    incomeSlab: "",
    pepDetails: "",
    taxResidencyOtherThanIndia: false,
    nationalityCountry: "",
    // Bank Details
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    accountType: "",
    // Address
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    state: "",
    pin: "",
    country: "",
    nature: "",
    // Nominee
    nomineeName: "",
    nomineeRelationship: "",
    nomineeDob: "",
    nomineePan: "",
    guardianName: "",
    guardianPan: "",
    nomineePhone: "",
    nomineeEmail: "",
    nomineeAddress: "",
    nomineeDocumentType: "",
    nomineeDocumentNumber: "",
  });

  const steps = [
    {
      title: "Basic Details",
      icon: User,
      fields: ["name", "mobile", "email", "panNumber", "dob"],
    },
    {
      title: "Personal Details",
      icon: User,
      fields: [
        "gender",
        "maritalStatus",
        "fatherName",
        "motherName",
        "spouseName",
        "occupationType",
        "aadhaarLast4",
        "residentialStatus",
        "citizenshipCountry",
        "placeOfBirth",
        "incomeSlab",
        "pepDetails",
        "taxResidencyOtherThanIndia",
        "nationalityCountry",
      ],
    },
    {
      title: "Bank Details",
      icon: CreditCard,
      fields: ["accountHolderName", "accountNumber", "ifscCode", "accountType"],
    },
    {
      title: "Address",
      icon: MapPin,
      fields: [
        "addressLine1",
        "addressLine2",
        "addressLine3",
        "city",
        "state",
        "pin",
        "country",
        "nature",
      ],
    },
    {
      title: "Nominee",
      icon: Users,
      fields: [
        "nomineeName",
        "nomineeRelationship",
        "nomineeDob",
        "nomineePan",
        "guardianName",
        "guardianPan",
        "nomineePhone",
        "nomineeEmail",
        "nomineeAddress",
        "nomineeDocumentType",
        "nomineeDocumentNumber",
      ],
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = async () => {
    // Simulate API call
    const currentStepData = {};
    steps[currentStep].fields.forEach((field) => {
      currentStepData[field] = formData[field];
    });

    console.log("Sending data for step:", currentStep + 1, currentStepData);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderBasicDetails = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={30}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mobile Number *
        </label>
        <input
          type="tel"
          value={formData.mobile}
          onChange={(e) => handleInputChange("mobile", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={10}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={30}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          PAN Number *
        </label>
        <input
          type="text"
          value={formData.panNumber}
          onChange={(e) => handleInputChange("panNumber", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth *
        </label>
        <input
          type="date"
          value={formData.dob}
          onChange={(e) => handleInputChange("dob", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    </div>
  );

  const renderPersonalDetails = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Marital Status
          </label>
          <select
            value={formData.maritalStatus}
            onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Status</option>
            <option value="Married">Married</option>
            <option value="Unmarried">Unmarried</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Father Name
        </label>
        <input
          type="text"
          value={formData.fatherName}
          onChange={(e) => handleInputChange("fatherName", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mother Name
        </label>
        <input
          type="text"
          value={formData.motherName}
          onChange={(e) => handleInputChange("motherName", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Spouse Name
        </label>
        <input
          type="text"
          value={formData.spouseName}
          onChange={(e) => handleInputChange("spouseName", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Last 4 Digits of Aadhaar
        </label>
        <input
          type="text"
          value={formData.aadhaarLast4}
          onChange={(e) => handleInputChange("aadhaarLast4", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={4}
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="taxResidency"
          checked={formData.taxResidencyOtherThanIndia}
          onChange={(e) =>
            handleInputChange("taxResidencyOtherThanIndia", e.target.checked)
          }
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label
          htmlFor="taxResidency"
          className="text-sm font-medium text-gray-700"
        >
          Tax Residency Other Than India
        </label>
      </div>
    </div>
  );

  const renderBankDetails = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Account Holder Name
        </label>
        <input
          type="text"
          value={formData.accountHolderName}
          onChange={(e) =>
            handleInputChange("accountHolderName", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Account Number
        </label>
        <input
          type="text"
          value={formData.accountNumber}
          onChange={(e) => handleInputChange("accountNumber", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          IFSC Code
        </label>
        <input
          type="text"
          value={formData.ifscCode}
          onChange={(e) => handleInputChange("ifscCode", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Account Type
        </label>
        <select
          value={formData.accountType}
          onChange={(e) => handleInputChange("accountType", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Account Type</option>
          <option value="Savings">Savings</option>
          <option value="Current">Current</option>
          <option value="Salary">Salary</option>
        </select>
      </div>
    </div>
  );

  const renderAddress = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address Line 1
        </label>
        <input
          type="text"
          value={formData.addressLine1}
          onChange={(e) => handleInputChange("addressLine1", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address Line 2 (Optional)
        </label>
        <input
          type="text"
          value={formData.addressLine2}
          onChange={(e) => handleInputChange("addressLine2", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address Line 3 (Optional)
        </label>
        <input
          type="text"
          value={formData.addressLine3}
          onChange={(e) => handleInputChange("addressLine3", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PIN
          </label>
          <input
            type="text"
            value={formData.pin}
            onChange={(e) => handleInputChange("pin", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderNominee = () => (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        This section can be skipped
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nominee Name
        </label>
        <input
          type="text"
          value={formData.nomineeName}
          onChange={(e) => handleInputChange("nomineeName", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Relationship
        </label>
        <select
          value={formData.nomineeRelationship}
          onChange={(e) =>
            handleInputChange("nomineeRelationship", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Relationship</option>
          <option value="Father">Father</option>
          <option value="Mother">Mother</option>
          <option value="Spouse">Spouse</option>
          <option value="Child">Child</option>
          <option value="Sibling">Sibling</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth
        </label>
        <input
          type="date"
          value={formData.nomineeDob}
          onChange={(e) => handleInputChange("nomineeDob", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          PAN{" "}
        </label>
        <input
          type="text"
          value={formData.nomineePan}
          onChange={(e) => handleInputChange("nomineePan", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Guardian Name{" "}
        </label>
        <input
          type="text"
          value={formData.guardianName}
          onChange={(e) => handleInputChange("guardianName", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Guardian PAN{" "}
        </label>
        <input
          type="text"
          value={formData.guardianPan}
          onChange={(e) => handleInputChange("guardianPan", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          value={formData.nomineePhone}
          onChange={(e) => handleInputChange("nomineePhone", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          value={formData.nomineeEmail}
          onChange={(e) => handleInputChange("nomineeEmail", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderBasicDetails();
      case 1:
        return renderPersonalDetails();
      case 2:
        return renderBankDetails();
      case 3:
        return renderAddress();
      case 4:
        return renderNominee();
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-white w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Customer Onboarding
        </h2>
        <p className="text-gray-600">
          Complete the following steps to add a new customer
        </p>
      </div>

      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={index} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : isActive
                      ? "bg-black text-white"
                      : "bg-gray-100 border-gray-300 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <div className="ml-3">
                  <div
                    className={`text-sm font-medium ${
                      isActive
                        ? "text-black"
                        : isCompleted
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {steps[currentStep].title}
        </h3>
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`flex items-center px-4 py-2 rounded-md ${
            currentStep === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </button>

        <div className="flex space-x-3">
          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Complete
              <Check className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <>
              <button
                onClick={handleSkip}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Skip
              </button>
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-2 bg-black text-white rounded-md"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerOnboardingStepper;
