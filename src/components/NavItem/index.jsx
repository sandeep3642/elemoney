import React from 'react'

const NavItem = ({ icon, text, isCollapsed, onClick,isActive }) => {
    
    return (
        <div className={`flex items-center p-3.5  hover:bg-gray-100 cursor-pointer duration-300 border-l-4 ${
            isActive ? "border-[#1F1F1F] bg-gray-100" : "border-transparent"
        }`}  onClick={onClick}>
            <span className='w-6'>{icon}</span>
           <span className={`whitespace-nowrap ${!isCollapsed ? 'ml-3 delay-100 opacity-100': 'opacity-0'}`}> {!isCollapsed && text}</span>
        </div>
    );
}

export default NavItem