// Login.jsx
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "./ui/button";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "@/providers/UserProvider";

function Login() {
    const { setUser, setError } = useContext(UserContext);

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                if (response.access_token) {
                    const res = await axios.get(
                        "https://www.googleapis.com/oauth2/v3/userinfo",
                        {
                            headers: {
                                Authorization: `Bearer ${response.access_token}`,
                            },
                        }
                    );
                    setUser(res.data);  // Set the user data in context
                    setError(null);     // Clear any previous errors
                } else {
                    setError("No access token found in response.");
                }
            } catch (err) {
                setError("Failed to fetch user info.");
                console.error(err);
            }
        },
        onError: (error) => {
            setError(`Login failed: ${error.error}`);
        }
    });

    return (
        <Button onClick={() => login()}>Login with Google</Button>
    );
}

export default Login;
