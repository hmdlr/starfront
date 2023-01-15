import './StarphishIcon.css';

export const StarphishIcon = ({
                                fontSize,
                                color
                              }: {
  fontSize: string
  color: string;
}) => {
  return (
      <img
          src={chrome.runtime.getURL('img/default_logo.svg')}
          alt="logo"
          className={'to-filter__starphish-icon'}
          style={{
            width: fontSize,
            height: fontSize,
          }}
      />
  );
};
