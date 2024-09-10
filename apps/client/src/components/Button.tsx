interface buttonPropsInteface {
  buttonLabel: string;
  onClickHandler: () => void;
}

const Button = ({ buttonProps }: { buttonProps: buttonPropsInteface }) => {
  return (
    <button
      onClick={buttonProps.onClickHandler}
      className="btn btn-success my-1 mx-4 text-white bg-green-800 text-xl "
    >
      {buttonProps.buttonLabel}
    </button>
  );
};

export default Button;
