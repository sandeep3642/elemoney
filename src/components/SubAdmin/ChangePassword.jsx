import { useState } from "react";

const ChangePassword = ({ isOpen, onClose }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        alert("Password changed successfully!");
        onClose();
    };

    if (!isOpen) return null; // Hide modal when it's closed

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg relative">
                <h2 className="text-lg font-semibold mb-4">Change Password</h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* New Password */}
                    <div className="relative">
                        <label className="block text-sm font-medium">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter new password"
                        />

                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label className="block text-sm font-medium">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Confirm new password"
                        />

                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-xs">{error}</p>}

                    {/* Buttons */}
                    <div className="flex justify-end mt-4 space-x-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
