import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RxDragHandleDots2 } from "react-icons/rx";
import { Trash2 } from "lucide-react";

const FundSortableItem = ({ fund, index, onRemove }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: fund.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    };

    return (
        <tr
            ref={setNodeRef}
            style={style}
            className="hover:bg-gray-50 border-b border-[#ddd]"
        >
            <td className="p-3">
                <button
                    className="cursor-grab active:cursor-grabbing"
                    {...attributes}
                    {...listeners}
                >
                    <RxDragHandleDots2 className="w-5 h-5 text-gray-400" />
                </button>
            </td>
            <td className="p-3">{index + 1}</td>
            <td className="p-3 max-w-60">
                <span className="line-clamp-1">{fund.name}</span>
            </td>
            <td className="p-3">{fund.scheme_code}</td>
            <td className="p-3">
                <button
                    onClick={onRemove}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Remove from category"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </td>
        </tr>
    );
};

export default FundSortableItem;