import { useState, useEffect, useRef } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { RxDragHandleDots2 } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { Edit2, Trash2 } from "lucide-react";
import CatSortableItem from "./CatSortableItem";
import FundSortableItem from "./FundSortableItem";
import CheckBox from "../CheckBox";
import {
    addCategory,
    assignFundsToCategory,
    getAllCategories,
    getFundsList,
    reorderCategories,
    updateCategory,
    deleteCategory
} from "../../pages/Funds/funds-service";
import { toast } from "react-toastify";

const CategoryList = ({ isModalOpen, setIsModalOpen }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [items, setItems] = useState([]);
    const [displayItems, setDisplayItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredFunds, setFilteredFunds] = useState([]);
    const [loadingFunds, setLoadingFunds] = useState(true);
    const [modalSearchQuery, setModalSearchQuery] = useState("");
    const [selectedFunds, setSelectedFunds] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingCategoryFunds, setEditingCategoryFunds] = useState([]);
    const [showFundsTable, setShowFundsTable] = useState(false);
    const modalRef = useRef(null);

    const handleCheckboxChange = (fund) => {
        console.log('Fund being toggled:', fund);
        setSelectedFunds(prev => {
            const isSelected = prev.some(f => f.id === fund.id);
            if (isSelected) {
                const newSelection = prev.filter(f => f.id !== fund.id);
                console.log('Removing fund from selected:', newSelection);

                // Also remove from editing category funds if in edit mode
                if (isEditMode) {
                    setEditingCategoryFunds(prevFunds => prevFunds.filter(f => f.id !== fund.id));
                }

                return newSelection;
            } else {
                const newSelection = [...prev, fund];
                console.log('Adding fund to selected:', newSelection);

                // Also add to editing category funds if in edit mode and not already there
                if (isEditMode && !editingCategoryFunds.some(f => f.id === fund.id)) {
                    setEditingCategoryFunds(prevFunds => [...prevFunds, fund]);
                }

                return newSelection;
            }
        });
    };

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await getAllCategories({})
            const { details, status } = res
            if (status.success && details.categories) {
                const filteredData = details.categories.map((category) => ({
                    id: category._id,
                    order: category.order,
                    name: category.name,
                    number_of_schemes: category.number_of_schemes,
                    funds: category.funds_ids || []
                }));
                console.log("My API Response:", filteredData);
                setItems(filteredData);
                setDisplayItems(filteredData);
            } else {
                setItems([]);
                setError("Invalid API response format");
            }
        } catch (err) {
            console.error("🚨 Error fetching categories:", err);
            setError("Failed to load categories");
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        let filteredData = items.filter((fund) =>
            fund.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (sortOption) {
            filteredData = [...filteredData].sort((a, b) => {
                if (sortOption === "asc") return a.name.localeCompare(b.name);
                if (sortOption === "desc") return b.name.localeCompare(a.name);
                return 0;
            });
        }

        setDisplayItems(filteredData);
    }, [searchQuery, sortOption, items]);

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = [...items];
        const [movedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, movedItem);

        const reorderedItems = newItems.map((item, index) => ({
            ...item,
            order: index + 1
        }));

        setItems(reorderedItems);

        try {
            const payload = {
                categories: reorderedItems.map(item => ({
                    id: item.id,
                    order: item.order
                }))
            };
            const reorderResponse = await reorderCategories(payload);
            console.log("📝 Reorder API response:", reorderResponse);
            toast.success("Categories reordered successfully!");
        } catch (err) {
            console.error("🚨 Error sending reorder data:", err);
            toast.error("Failed to reorder categories");
            // Revert changes on error
            await fetchCategories();
        }
    };

    // Handle funds drag and drop - Fixed collision detection issue
    const handleFundsDragEnd = async (event) => {
        const { active, over } = event;
        console.log("Drag event", { active: active.id, over: over?.id });
        if (!over || active.id === over.id) return;

        const oldIndex = editingCategoryFunds.findIndex((item) => item.id === active.id);
        const newIndex = editingCategoryFunds.findIndex((item) => item.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return;

        const newItems = [...editingCategoryFunds];
        const [movedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, movedItem);

        const reorderedItems = newItems.map((item, index) => ({
            ...item,
            order: index + 1
        }));

        setEditingCategoryFunds(reorderedItems);
        toast.success("Funds reordered successfully!");
    };


    const handleEdit = async (category) => {
        setIsEditMode(true);
        setEditingCategoryId(category.id);
        setCategoryName(category.name);
        setShowFundsTable(true);
        setIsModalOpen(true);
        setEditingCategoryFunds((category.funds || []).map(f => ({
            ...f,
            id: String(f.id || f._id)
        })));
        await getFunds();  // Pehle funds le ao
    };


    const handleDelete = async (categoryId) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                const payload = {
                    category_id: categoryId
                };

                await deleteCategory(payload);
                toast.success("Category deleted successfully!");
                await fetchCategories();
            } catch (error) {
                console.error("🚨 Error deleting category:", error);
                toast.error("Failed to delete category");
            }
        }
    };

    const resetModalState = () => {
        setIsModalOpen(false);
        setCategoryName("");
        setSelectedFunds([]);
        setIsEditMode(false);
        setEditingCategoryId(null);
        setEditingCategoryFunds([]);
        setModalSearchQuery("");
        setShowFundsTable(false);
        setLoadingFunds(true);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                resetModalState();
            }
        };

        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen]);

    const handleAddCategoryAndAssignFunds = async () => {
        if (!categoryName.trim()) {
            toast.error("Please enter a category name");
            return;
        }

        if (selectedFunds.length === 0) {
            toast.error("Please select at least one fund");
            return;
        }

        try {
            if (isEditMode) {
                const updatePayload = {
                    category_id: editingCategoryId,
                    name: categoryName,
                };

                await updateCategory(updatePayload);

                const selectedIds = selectedFunds.map((fund) => fund.id);
                const assignFundPayload = {
                    category_id: editingCategoryId,
                    funds_ids: selectedIds
                };

                await assignFundsToCategory(assignFundPayload);
                toast.success("Category updated successfully!");
            } else {
                const payload = {
                    name: categoryName
                };

                const addCategoryRes = await addCategory(payload);

                if (addCategoryRes) {
                    const newCategoryId =
                        addCategoryRes?.details?.category?._id ||
                        addCategoryRes?.details?.category?.id ||
                        addCategoryRes?.category_id;

                    const selectedIds = selectedFunds.map((fund) => fund.id);
                    const assignFundPayload = {
                        category_id: newCategoryId,
                        funds_ids: selectedIds
                    };

                    await assignFundsToCategory(assignFundPayload);
                    toast.success("Category and funds assigned successfully!");
                }
            }

            resetModalState();
            await fetchCategories();
        } catch (error) {
            console.error("🚨 Error in add/update + assign:", error);
            toast.error("Something went wrong: " + error.message);
        }
    };

    async function getFunds() {
        try {
            setLoadingFunds(true);
            const res = await getFundsList({})
            const { status, details } = res
            if (status.success && details.fund_schemes) {
                const filteredData = details.fund_schemes.map((fund) => ({
                    id: fund._id,
                    name: fund.name,
                    scheme_code: fund.scheme_code
                }));
                setFilteredFunds(filteredData);

                // FIXED: Pre-select funds properly in edit mode
                if (isEditMode && editingCategoryFunds.length > 0) {
                    const categoryFundIds = editingCategoryFunds.map(fund => fund.id);
                    const preSelectedFunds = filteredData.filter(fund => categoryFundIds.includes(fund.id));
                    setSelectedFunds(preSelectedFunds);
                    console.log('Pre-selected funds from category:', preSelectedFunds);
                }
            }
        } catch (err) {
            toast.error("Failed to fetch funds list");
        } finally {
            setLoadingFunds(false);
        }
    }

    useEffect(() => {
        if (isModalOpen) {
            getFunds();
        }
    }, [isModalOpen]);

    // FIXED: Separate useEffect for edit mode pre-selection
    useEffect(() => {
        if (isEditMode && editingCategoryFunds.length > 0 && filteredFunds.length > 0) {
            const categoryFundIds = editingCategoryFunds.map(fund => fund.id);
            const preSelectedFunds = filteredFunds.filter(fund => categoryFundIds.includes(fund.id));
            setSelectedFunds(preSelectedFunds);
            console.log('Updated pre-selected funds:', preSelectedFunds);
        }
    }, [isEditMode, editingCategoryFunds, filteredFunds]);

    return (
        <div className="bg-white border border-[#ddd] rounded-lg py-4">
            <div className="flex justify-between items-center mb-4 px-4">
                <h2 className="text-lg font-semibold">Category</h2>
                <div className="flex items-center gap-4">
                    <div className="relative w-52">
                        <select
                            className="border p-2 rounded text-gray appearance-none w-full cursor-pointer"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="">Sort</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <FaChevronDown className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border p-2 rounded pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                            <BsSearch />
                        </span>
                    </div>
                </div>
            </div>

            {/* FIXED: Table scroll issue */}
            <div className="overflow-x-auto" style={{ maxHeight: '60vh' }}>
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
                        <table className="min-w-full border-collapse">
                            <thead className="sticky top-0 bg-white">
                                <tr className="bg-gray-100 text-left text-gray border-b border-[#ddd]">
                                    <th className="p-3"></th>
                                    <th className="p-3">SRNo.</th>
                                    <th className="p-3">Category Name</th>
                                    <th className="p-3">No. of Funds</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="text-center p-4">Loading...</td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="6" className="text-center p-4 text-red-500">{error}</td>
                                    </tr>
                                ) : items.length > 0 ? (
                                    items.map((cat) => (
                                        <CatSortableItem key={cat.id} cat={cat} handleEdit={handleEdit} handleDelete={handleDelete} />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center p-4">No categories found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </SortableContext>
                </DndContext>
            </div>

            {/* FIXED: Modal with proper scrolling */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
                    <div
                        className="bg-white rounded-lg w-full max-w-[730px] max-h-[90vh] flex flex-col"
                        ref={modalRef}
                        style={{ minHeight: '400px' }}
                    >

                        {/* Fixed Header */}
                        <div className="p-6 border-b border-[#ddd] flex-shrink-0">
                            <h2 className="text-lg font-semibold mb-3">
                                {isEditMode ? "Edit Category" : "Add Category"}
                            </h2>
                            <input
                                type="text"
                                placeholder="Enter Category Name"
                                className="w-full p-2 border border-[#ddd] rounded"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6" data-lenis-prevent>
                            <div className="p-6">
                                {/* FIXED: Funds Table with proper drag and drop */}
                                {isEditMode && showFundsTable && editingCategoryFunds.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold mb-3">Category Funds</h3>
                                        <div className="border border-[#ddd] rounded-lg">
                                            <div className="overflow-y-auto">
                                                <DndContext
                                                    collisionDetection={closestCenter}
                                                    onDragEnd={handleFundsDragEnd}
                                                >
                                                    <SortableContext
                                                        items={editingCategoryFunds.map(f => f.id)}
                                                        strategy={verticalListSortingStrategy}
                                                    >
                                                        <table className="min-w-full border-collapse">
                                                            <thead className="sticky top-0 bg-gray-100">
                                                                <tr className="bg-gray-100 text-left text-gray border-b border-[#ddd]">
                                                                    <th className="p-3 w-12"></th>
                                                                    <th className="p-3 w-20">SRNo.</th>
                                                                    <th className="p-3">Fund Name</th>
                                                                    <th className="p-3 w-32">Scheme Code</th>
                                                                    <th className="p-3 w-20">Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {editingCategoryFunds.map((fund, index) => (
                                                                    <FundSortableItem
                                                                        key={fund.id}
                                                                        fund={fund}
                                                                        index={index}
                                                                        onRemove={() => {
                                                                            setEditingCategoryFunds(prev => prev.filter(f => f.id !== fund.id));
                                                                            setSelectedFunds(prev => prev.filter(f => f.id !== fund.id));
                                                                        }}
                                                                    />
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </SortableContext>
                                                </DndContext>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* FIXED: Funds selection with proper checkbox state */}
                                <div className="w-full">
                                    <div className="bg-[#f3f3f3] p-3 rounded-t-lg flex justify-between items-center border border-[#ddd]">
                                        <h3 className="text-lg font-semibold">
                                            {isEditMode ? "Update Funds" : "Add Funds"}
                                        </h3>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                className="w-60 p-2 pl-8 border border-[#ddd] rounded-md"
                                                value={modalSearchQuery}
                                                onChange={(e) => setModalSearchQuery(e.target.value)}
                                            />
                                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                                                <BsSearch />
                                            </span>
                                        </div>
                                    </div>

                                    {/* FIXED: Scrollable funds list */}
                                    <div className="max-h-60 overflow-y-auto border border-t-0 border-[#ddd] bg-white">
                                        {loadingFunds ? (
                                            <p className="text-center p-4">Loading funds...</p>
                                        ) : filteredFunds.filter(fund =>
                                            fund.name.toLowerCase().includes(modalSearchQuery.toLowerCase())
                                        ).length > 0 ? (
                                            filteredFunds.filter(fund =>
                                                fund.name.toLowerCase().includes(modalSearchQuery.toLowerCase())
                                            ).map((fund) => {
                                                const isChecked = selectedFunds.some(f => f.id === fund.id);
                                                return (
                                                    <div key={fund.id} className="flex justify-between items-center px-6 py-3 border-b border-[#ddd] hover:bg-gray-50">
                                                        <span className="text-sm flex-1 mr-4">{fund.name}</span>
                                                        <div className="relative flex-shrink-0">
                                                            <input
                                                                type="checkbox"
                                                                checked={isChecked}
                                                                onChange={() => handleCheckboxChange(fund)}
                                                                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-sm border-2 border-[#606060] checked:bg-black checked:border-black"
                                                            />
                                                            <span className="absolute opacity-0 peer-checked:opacity-100 text-white top-1/2 left-[3px] transform -translate-y-1/2 pointer-events-none">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <p className="text-center p-4">No funds found</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fixed Footer */}
                        <div className="p-6 border-t border-[#ddd] flex justify-end gap-2 flex-shrink-0">
                            <button
                                onClick={resetModalState}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                onClick={handleAddCategoryAndAssignFunds}
                            >
                                {isEditMode ? "Update" : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryList;