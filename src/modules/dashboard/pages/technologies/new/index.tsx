import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TechnologyList } from "../../../components/technology-list";

export default function NewTechnologyPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to technologies page - the form will be opened from there
    navigate("/dashboard/technologies", { replace: true });
  }, [navigate]);

  return <TechnologyList />;
}
