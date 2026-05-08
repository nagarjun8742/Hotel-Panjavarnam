import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingTransition from "./LoadingTransition";

interface ExploreButtonProps {
  to: string;
  label: string;
}

const ExploreButton = ({ to, label }: ExploreButtonProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(to);
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <LoadingTransition isLoading={loading} />
      <button
        onClick={handleClick}
        className="inline-block border border-gold/60 text-gold px-10 py-3.5 text-[13px] tracking-[0.2em] uppercase hover:bg-gold hover:text-primary-foreground transition-all duration-500 rounded-sm"
      >
        {label}
      </button>
    </>
  );
};

export default ExploreButton;
