import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import CheckBox from "../CheckBox";
import { FaChevronDown } from "react-icons/fa";

const AddSubAdmin = ({ isOpen, onClose, setIsModalOpen }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const [step, setStep] = useState(1);
    const password = watch("password");
    const modalRef = useRef(null);

    // Close modal on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, setIsModalOpen]);

    const handleNext = () => {
        setStep(2);
    };

    const onSubmit = (data) => {
        console.log("Final Form Data:", data);
        alert("Sub Admin Added Successfully!");
        onClose();
        reset();
        setStep(1);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-[730px] shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Add Sub Admin</h2>

                {/* Step 1: User Details */}
                {step === 1 && (
                    <form className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                placeholder="Enter admin name"
                                className="w-full p-2 border rounded"
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Email Address</label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/, message: "Invalid email format" },
                                })}
                                placeholder="Enter Email Address"
                                className="w-full p-2 border rounded"
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Mobile Number</label>
                            <input
                                type="text"
                                {...register("mobile", {
                                    required: "Mobile number is required",
                                    pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" },
                                })}
                                placeholder="Enter Mobile number"
                                className="w-full p-2 border rounded"
                            />
                            {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Minimum 6 characters required" },
                                })}
                                placeholder="Set password"
                                className="w-full p-2 border rounded"
                            />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Confirm Password</label>
                            <input
                                type="password"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) => value === password || "Passwords do not match",
                                })}
                                placeholder="Re-enter Password"
                                className="w-full p-2 border rounded"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <div className="flex justify-end mt-4 space-x-3">
                            <button type="button" onClick={onClose} className="btn btn-secondary">
                                Cancel
                            </button>
                            <button type="button" onClick={handleSubmit(handleNext)} className="btn btn-primary">
                                Next
                            </button>
                        </div>
                    </form>
                )}

                {/* Step 2: Role & Permissions */}
                {step === 2 && (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Role</label>
                            <div className="relative w-full">
                                <select
                                    className="border p-2 rounded text-gray appearance-none w-full cursor-pointer"
                                    {...register("role", { required: "Role is required" })}
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="editor">Editor</option>
                                </select>
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    <FaChevronDown className="w-4 h-4" />
                                </div>
                            </div>
                            {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
                        </div>

                        <div className="bg-white border border-[#ddd] rounded-lg">
                            <h3 className="text-base font-semibold bg-gray-100 p-4">Set Permissions</h3>
                            <div className="border-t border-gray-300">
                                <div className="flex justify-between items-center px-6 py-3 border-b border-gray-300">
                                    <span className="text-sm">Dashboard</span>
                                    <CheckBox name="permissions.dashboard" register={register} />
                                </div>
                                <div className="flex justify-between items-center px-6 py-3 border-b border-gray-300">
                                    <span className="text-sm">Sub - Admin</span>
                                    <CheckBox name="permissions.subAdmin" register={register} />
                                </div>
                                <div className="flex justify-between items-center px-6 py-3 border-b border-gray-300">
                                    <span className="text-sm">Funds</span>
                                    <CheckBox name="permissions.funds" register={register} />
                                </div>
                                <div className="flex justify-between items-center px-6 py-3">
                                    <span className="text-sm">Customer</span>
                                    <CheckBox name="permissions.customer" register={register} />
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-end mt-4 space-x-3">
                            <button type="button" onClick={() => setStep(1)} className="btn btn-secondary">
                                Prev
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Add
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AddSubAdmin;
