import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit2, Trash2 } from "lucide-react";
import { RxDragHandleDots2 } from "react-icons/rx";

const CatSortableItem = ({ cat ,handleEdit,handleDelete}) => {
    const { attributes, listeners, setNodeRef, transform, transition  } = useSortable({ id: cat.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <tr ref={setNodeRef} style={style} className="hover:bg-gray-400 [&:not(:last-child)]:border-b border-[#ddd]">
            <td className="p-3 cursor-grab" {...attributes} {...listeners}>
                <RxDragHandleDots2 className="" />
            </td>
            <td className="p-3">{cat.order}</td>
            <td className="p-3">{cat.name}</td>
            <td className="p-3">{cat.number_of_schemes}</td>
            <td className="p-3 ">
                <div className="flex items-center gap-2 ">
                    <button
                        onClick={() => handleEdit(cat)}
                        className="p-2 text-blue-600 hover:bg-blue-50  rounded transition-colors"
                        title="Edit Category"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(cat.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete Category"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default CatSortableItem;
