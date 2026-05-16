const Button = ({
  text,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-6
        py-3
        rounded-xl
        transition-all
        duration-300
        shadow-md
        hover:shadow-xl
        w-full
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default Button;