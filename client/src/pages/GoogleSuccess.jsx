import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const GoogleSuccess = () => {
  const [params] = useSearchParams();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const data = JSON.parse(decodeURIComponent(params.get("data")));
      if (data && data.token) {
        login(data);
        navigate(data.isAdmin ? "/admin" : "/", { replace: true });
      } else {
        navigate("/login");
      }
    } catch {
      navigate("/login");
    }
  }, []);

  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f1f5f9" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:"2rem", marginBottom:12 }}>⏳</div>
        <p style={{ color:"#64748b", fontFamily:"'DM Sans',sans-serif" }}>Signing you in with Google...</p>
      </div>
    </div>
  );
};
export default GoogleSuccess;
