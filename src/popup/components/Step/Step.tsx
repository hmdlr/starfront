import './Step.css';

export const Step = ({
                       step,
                       svg,
                       description
                     }: {
  step: string;
  svg: string;
  description: string;
}) => {

  return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '100%',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <img
              src={svg}
              alt="Authentication"
              className={'step__illustration'}
              style={{
                marginBottom: '30px'
              }}
          />
          <span className={'step__title'}>
            {step}
          </span>
        </div>
        <p className={'step__description'}>
          {description}
        </p>
      </div>
  );
};

