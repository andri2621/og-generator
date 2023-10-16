import clsx from "clsx";

type DividerProps = {
  children: React.ReactNode;
  className?: string;
};

const Divider: React.FC<DividerProps> = ({ children, className }) => {
  return (
    <div className={clsx(className, "relative flex items-center")}>
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="flex-shrink mx-4 text-gray-400">{children}</span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  );
};

export default Divider;
