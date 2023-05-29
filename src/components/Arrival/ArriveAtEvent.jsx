import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ArriveAtEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;

  const fetchRole = async () => {
    const response = await axios.get(
      `http://localhost:4000/api/v2/isOrganizer?userId=${user.user_uid}`
    );
    const data = response.data;
    if (data.isOrganizer) navigate("/organizerDashboard", { state: user });
    else navigate("/attendeeCheckin", { state: user });
  };

  useEffect(() => {
    fetchRole();
  }, []);

  return null;
};

export default ArriveAtEvent;
