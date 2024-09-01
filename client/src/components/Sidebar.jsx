// Sidebar.jsx
import { Button } from "./ui/button";
import { Home, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import Login from "./login";
import Logout from "./logout";

function Sidebar({ setUser, setError }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`flex ${isOpen ? "w-64" : "w-20"} h-full bg-gray-800 text-white transition-width duration-300`}>
            <div className="flex flex-col items-center justify-between h-full w-full">
                <div className="flex flex-col items-start w-full">
                    <Button
                        variant="ghost"
                        className="my-4 mx-auto"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? "<" : ">"}
                    </Button>
                    <div className="flex flex-col items-start w-full">
                        <Button variant="ghost" className="w-full text-left px-4 py-2 hover:bg-gray-700">
                            <Home className="inline-block mr-3" />
                            {isOpen && "Home"}
                        </Button>
                        <Button variant="ghost" className="w-full text-left px-4 py-2 hover:bg-gray-700">
                            <Settings className="inline-block mr-3" />
                            {isOpen && "Settings"}
                        </Button>
                        
                    </div>
                </div>
                <div className="w-full">
                    <hr className="border-gray-700" />
                    <div className="flex flex-col items-start w-full">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;

