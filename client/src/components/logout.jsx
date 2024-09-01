// Logout.js
import { googleLogout } from "@react-oauth/google";
import { Button } from "./ui/button";
import { useContext } from "react";
import { UserContext } from "@/providers/UserProvider";

function Logout() {
    const { setUser, setError } = useContext(UserContext);

    const logout = () => {
        googleLogout();
        setUser(null);  // Clear the user data from context
        setError(null); // Clear any errors
    };

    return (
        <Button onClick={logout}>Logout</Button>
    );
}

export default Logout;
