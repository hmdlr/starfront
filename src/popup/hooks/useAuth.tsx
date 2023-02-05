import { createContext, useContext, useEffect, useState } from "react";
import { generateSecret } from "../../redux/actions/secretActions";
import { useSelector, useStore } from "react-redux";
import { selectPublicHalf } from "../../redux/selectors/secretSelector";
import env from "../../env";
import { Microservice } from "@hmdlr/utils/dist/Microservice";
import { selectUsername } from "../../redux/selectors/authSelector";
import { clearJwt } from "../../redux/actions/authActions";

const authContext = createContext<{
  username: string | undefined,
  completingSignIn: boolean,
  signIn: () => void,
  signOut: () => void,
}>(undefined!);

export const ProvideAuth = ({ children }: { children: any }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const store = useStore();
  const publicHalf = useSelector(selectPublicHalf);
  const username = useSelector(selectUsername);
  const [completingSignIn, setCompletingSignIn] = useState<boolean>(false);

  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    // if we have a public half stored, but no username, we're waiting for the user to sign in
    if (publicHalf && !username) {
      setCompletingSignIn(true);
    }
  }, [username, publicHalf]);

  const signIn = () => {
    setClicked(true);
    /* Telling service worker to generate a secret & save it in state */
    store.dispatch(generateSecret());
  };

  useEffect(() => {
    if (!publicHalf || publicHalf === '' || !clicked) {
      return;
    }
    window.open(`${env.front[Microservice.Authphish]}/auth?ident=${publicHalf}`);
  }, [publicHalf, clicked]);

  const signOut = () => {
    store.dispatch(clearJwt());
  };

  return {
    username,
    completingSignIn,
    signIn,
    signOut,
  };
}
