import '../../../styles/App.css';
import './StarButton.css';

export const StarButton = (props: {
  text: string;
  onClick: () => void;
  img?: any;
}) => {
  const {
    text,
    img,
    onClick
  } = props;
  return (
      <button
          className="star-button"
          onClick={onClick}
      >
        {
            img && img
        }
        <span>{text}</span>
      </button>
  );
};
