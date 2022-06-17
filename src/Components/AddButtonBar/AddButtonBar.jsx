import { FiPlusCircle } from "react-icons/fi";

const AddButtonBar = (props) => {
  const { isHorizontal = true, onClick = () => {} } = props;

  const containerClass = `flex ${
    isHorizontal ? "flex-row w-full" : "flex-col h-full"
  } items-center justify-start`;

  const lineClass = `flex flex-1 ${
    isHorizontal ? "h-0.5 w-full" : "w-0.5 h-full"
  } bg-blue-500 rounded-sm`;

  const iconContainer = `${isHorizontal ? "mx-1" : "my-1"}`;

  return (
    <div className={containerClass} onClick={onClick}>
      <div className={lineClass} />
      <div className={iconContainer}>
        <FiPlusCircle className="text-sm font-bold text-blue-500" />
      </div>
      <div className={lineClass} />
    </div>
  );
};

export default AddButtonBar;
