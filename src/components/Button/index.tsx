import styles from "./Button.module.css";

interface Props {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "primary" | "back" | "position";
}

function Button({ children, onClick, type = "primary" }: Props) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
