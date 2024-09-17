interface buttonPropsInteface {
  buttonLabel: string;
  onClickHandler: () => void;
}
interface ButtonWithChildrenProps extends buttonPropsInteface {
  children: string;
}

const Button: React.FC<ButtonWithChildrenProps> = ({
  children,
  buttonLabel,
  onClickHandler,
}) => {
  return (
    <button
      onClick={onClickHandler}
      className="btn btn-success my-1 mx-4 text-white bg-green-800 text-xl w-full"
    >
      {buttonLabel}
      {children}
    </button>
  );
};

export default Button;
