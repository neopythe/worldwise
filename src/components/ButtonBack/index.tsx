import { useNavigate } from "react-router-dom";

import Button from "@/components/Button";

function ButtonBack() {
  const navigate = useNavigate();

  return (
    <Button
      onClick={(event) => {
        event.preventDefault();
        navigate(-1);
      }}
      type="back"
    >
      &larr; Back
    </Button>
  );
}

export default ButtonBack;
