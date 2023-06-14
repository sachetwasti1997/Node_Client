import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Counter = ({ timeLimit }: { timeLimit: number }) => {
  const [counter, setCounter] = useState(timeLimit);
  const navigate = useNavigate()
  useEffect(() => { 
    const count = setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);
    if (counter <= 0) {
      clearInterval(count)
      navigate("/");
    }
  }, [counter])
  return (
    <div className="ps-10">
      You have <b>{counter} seconds</b> left to complete the payment!
    </div>
  );
};

export default Counter;
