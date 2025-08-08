import classes from "./TodoItem.module.css";

const TodoItem: React.FC<{ text: string; onRemove: () => void }> = ({
  text,
  onRemove,
}) => {
  return (
    <li className={classes.item} onClick={() => onRemove()}>
      {text}
    </li>
  );
};

export default TodoItem;
