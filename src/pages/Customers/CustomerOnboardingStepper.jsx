import React, { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  User,
  CreditCard,
  MapPin,
  Users,
  Check,
  Loader,
} from "lucide-react";
import { createCustomer, updateCustomer } from "./customer-service"; // Adjust path as needed
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CustomerOnboardingStepper = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [error, setError] = useState(null);
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
    setIsLoading(true);
    setError(null);
    // 68787bbfb0a32585183693dd
    try {
      if (currentStep === 0) {
        // Step 1: Create customer with basic details
        const basicData = {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          dob: formData.dob,
          pan: formData.panNumber,
        };

        const response = await createCustomer(basicData);

        console.log("response", response);

        // Handle API response structure
        if (response.status.success) {
          setCustomerId(response.data._id); // Use response.data._id based on your API response
        } else {
          throw new Error(
            response.status.message || "Failed to create customer"
          );
        }
      } else if (currentStep === 1) {
        // Step 2: Update with personal details
        const personalData = {
          gender: formData.gender,
          marital_status: formData.maritalStatus,
          father_name: formData.fatherName,
          mother_name: formData.motherName,
          spouse_name: formData.spouseName,
          occupation_type: formData.occupationType,
          aadhaar_number: formData.aadhaarLast4,
          residential_status: formData.residentialStatus,
          citizenship_countries: formData.citizenshipCountry
            ? [formData.citizenshipCountry]
            : [],
          place_of_birth: formData.placeOfBirth,
          income_slab: formData.incomeSlab,
          pep_details: formData.pepDetails,
          tax_residency_other_than_india: formData.taxResidencyOtherThanIndia,
          nationality_country: formData.nationalityCountry,
        };

        const response = await updateCustomer(customerId, personalData);

        // Handle update response
        if (!response.status.success) {
          throw new Error(
            response.status.message || "Failed to update personal details"
          );
        }
      } else if (currentStep === 2) {
        // Step 3: Update with bank details
        const bankData = {
          bank_details: {
            account_holder_name: formData.accountHolderName,
            account_number: formData.accountNumber,
            ifsc_code: formData.ifscCode,
            account_type: formData.accountType,
          },
        };

        const response = await updateCustomer(customerId, bankData);

        // Handle update response
        if (!response.status.success) {
          throw new Error(
            response.status.message || "Failed to update bank details"
          );
        }
      } else if (currentStep === 3) {
        // Step 4: Update with address
        const addressData = {
          address: {
            line1: formData.addressLine1,
            line2: formData.addressLine2,
            line3: formData.addressLine3,
            city: formData.city,
            state: formData.state,
            pincode: formData.pin,
            country: formData.country,
            nature: formData.nature,
          },
        };

        const response = await updateCustomer(customerId, addressData);

        // Handle update response
        if (!response.status.success) {
          throw new Error(
            response.status.message || "Failed to update address"
          );
        }
      } else if (currentStep === 4) {
        // Step 5: Update with nominee details (if provided)
        if (formData.nomineeName) {
          const nomineeData = {
            nominee: {
              name: formData.nomineeName,
              relationship: formData.nomineeRelationship,
              dob: formData.nomineeDob,
              pan: formData.nomineePan,
              guardian_name: formData.guardianName,
              guardian_pan: formData.guardianPan,
              phone: formData.nomineePhone,
              email: formData.nomineeEmail,
              address: formData.nomineeAddress,
              document_type: formData.nomineeDocumentType,
              document_number: formData.nomineeDocumentNumber,
            },
          };

          const response = await updateCustomer(customerId, nomineeData);

          // Handle update response
          if (!response.status.success) {
            throw new Error(
              response.status.message || "Failed to update nominee details"
            );
          }
        }
      }

      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Final step completed
        toast.success("Customer onboarding completed successfully!");
        navigate("/customers");
      }
    } catch (err) {
      // Handle different types of errors
      let errorMessage = "An error occurred while saving data";

      if (err.response?.data?.status?.message) {
        // API error with structured response
        errorMessage = err.response.data.status.message;
      } else if (err.response?.data?.message) {
        // API error with simple message
        errorMessage = err.response.data.message;
      } else if (err.message) {
        // Custom error or network error
        errorMessage = err.message;
      }

      setError(errorMessage);
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="transgender">Transgender</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Marital Status
          </label>
          <select
            value={formData.maritalStatus}
            onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Occupation Type
        </label>
        <select
          value={formData.occupationType}
          onChange={(e) => handleInputChange("occupationType", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select Occupation Type</option>
          <option value="salaried">Salaried</option>
          <option value="business">Business</option>
          <option value="professional">Professional</option>
          <option value="retired">Retired</option>
          <option value="housewife">Housewife</option>
          <option value="student">Student</option>
          <option value="others">Others</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Last 4 Digits of Aadhaar
        </label>
        <input
          type="text"
          value={formData.aadhaarLast4}
          onChange={(e) => handleInputChange("aadhaarLast4", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          maxLength={4}
          pattern="[0-9]{4}"
          placeholder="1234"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Residential Status
        </label>
        <select
          value={formData.residentialStatus}
          onChange={(e) =>
            handleInputChange("residentialStatus", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select Residential Status</option>
          <option value="resident_individual">Resident Individual</option>
          <option value="non_resident_individual">
            Non Resident Individual
          </option>
          <option value="foreign_national">Foreign National</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Citizenship Country
        </label>
        <select
          value={formData.citizenshipCountry}
          onChange={(e) =>
            handleInputChange("citizenshipCountry", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="Singapore">Singapore</option>
          <option value="UAE">UAE</option>
          <option value="others">Others</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Place of Birth
        </label>
        <input
          type="text"
          value={formData.placeOfBirth}
          onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter place of birth"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Income Slab
        </label>
        <select
          value={formData.incomeSlab}
          onChange={(e) => handleInputChange("incomeSlab", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select Income Slab</option>
          <option value="upto_1lakh">Up to 1 Lakh</option>
          <option value="above_1lakh_upto_5lakh">
            Above 1 Lakh up to 5 Lakh
          </option>
          <option value="above_5lakh_upto_10lakh">
            Above 5 Lakh up to 10 Lakh
          </option>
          <option value="above_10lakh_upto_25lakh">
            Above 10 Lakh up to 25 Lakh
          </option>
          <option value="above_25lakh_upto_1cr">
            Above 25 Lakh up to 1 Crore
          </option>
          <option value="above_1cr">Above 1 Crore</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          PEP Details
        </label>
        <select
          value={formData.pepDetails}
          onChange={(e) => handleInputChange("pepDetails", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select PEP Status</option>
          <option value="pep_exposed">PEP Exposed</option>
          <option value="pep_related">PEP Related</option>
          <option value="not_applicable">Not Applicable</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="taxResidency"
          checked={formData.taxResidencyOtherThanIndia}
          onChange={(e) =>
            handleInputChange("taxResidencyOtherThanIndia", e.target.checked)
          }
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-black"
        />
        <label
          htmlFor="taxResidency"
          className="text-sm font-medium text-gray-700"
        >
          Tax Residency Other Than India
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nationality Country
        </label>
        <select
          value={formData.nationalityCountry}
          onChange={(e) =>
            handleInputChange("nationalityCountry", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select Nationality</option>
          <option value="Indian">Indian</option>
          <option value="American">American</option>
          <option value="British">British</option>
          <option value="Canadian">Canadian</option>
          <option value="Australian">Australian</option>
          <option value="Singaporean">Singaporean</option>
          <option value="Emirati">Emirati</option>
          <option value="others">Others</option>
        </select>
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Account Type
        </label>
        <select
          value={formData.accountType}
          onChange={(e) => handleInputChange("accountType", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select Account Type</option>
          <option value="savings">Savings</option>
          <option value="current">Current</option>
          <option value="nre">NRE</option>
          <option value="nro">NRO</option>
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
    <div className="w-full mx-auto p-6 bg-white">
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
                    className={`w-45 h-0.5 mx-4 ${
                      isCompleted ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

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
              disabled={isLoading}
              className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 mr-1 animate-spin" />
                  Completing...
                </>
              ) : (
                <>
                  Complete
                  <Check className="w-4 h-4 ml-1" />
                </>
              )}
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
                disabled={isLoading}
                className="flex items-center px-6 py-2 bg-black text-white rounded-md  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 mr-1 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerOnboardingStepper;
