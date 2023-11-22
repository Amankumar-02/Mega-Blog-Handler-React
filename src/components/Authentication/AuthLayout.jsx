import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout ({ children, authentication = true }){
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && authStatus !== authStatus){
        navigate("/login");
    }else if(!authentication && authStatus !== authentication){
        navigate("/");
    }
    setLoading(false)
  }, [authentication , navigate , authStatus]);
  
  return loading ? <h1>loading....</h1> : <>{children}</>
};

export default AuthLayout;
