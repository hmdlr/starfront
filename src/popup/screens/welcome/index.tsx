import { Step } from "../../components/Step/Step";
import { StarButton } from "../../components/StarButton/StarButton";
import { StarphishIcon } from "../../components/StarphishIcon/StarphishIcon";
import { useSelector, useStore } from "react-redux";
import { selectPublicHalf } from "../../../redux/selectors/secretSelector";
import { generateSecret } from "../../../redux/actions/secretActions";
import { useEffect } from "react";
import env from "../../../env";
import { Microservice } from "@hmdlr/utils/dist/Microservice";

export const Welcome = () => {
  const store = useStore();
  const publicHalf = useSelector(selectPublicHalf);

  const signIn = () => {
    store.dispatch(generateSecret());
  };

  useEffect(() => {
    if (!publicHalf || publicHalf === '') {
      return;
    }
    console.log(`${env.front[Microservice.Authphish]}/auth?code=${publicHalf}`);
    window.open(`${env.front[Microservice.Authphish]}/auth?code=${publicHalf}`);
  }, [publicHalf])

  return (
      <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '85%',
          }}
      >
        <Step
            step={'Authentication'}
            svg={chrome.runtime.getURL('img/auth_wall.svg')}
            description={`You'll need to login to access all of Starphish's features. Don't worry, we won't send any spam emails.`}
        />
        <StarButton
            text={'Sign in'}
            onClick={() => {
              signIn();
            }}
            img={<StarphishIcon color={'#6766f6'} fontSize={'1.8rem'}/>}
        />
      </div>
  );
};
