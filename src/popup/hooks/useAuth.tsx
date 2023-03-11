import { createContext, useContext, useEffect, useState } from "react";
import { generateSecret } from "../../redux/actions/secretActions";
import { useSelector, useStore } from "react-redux";
import { selectPublicHalf } from "../../redux/selectors/secretSelector";
import env from "../../env";
import { Microservice } from "@hmdlr/utils/dist/Microservice";
import { selectUsername } from "../../redux/selectors/authSelector";
import { clearJwt, pingForJwt } from "../../redux/actions/authActions";

const authContext = createContext<{
  username: string | undefined,
  awaitingSignIn: boolean,
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
  const [awaitingSignIn, setAwaitingSignIn] = useState<boolean>(false);
  const [userClicked, setUserClicked] = useState<boolean>(false);
  const [previousToken, setPreviousToken] = useState<string | undefined>(undefined);

  // open auth page
  useEffect(() => {
    if (!publicHalf || !userClicked || previousToken === publicHalf) {
      return;
    }
    window.open(`${env.front[Microservice.Authphish]}/auth?ext-token=${publicHalf}`);
  }, [publicHalf, userClicked, previousToken]);

  // check if we're waiting for the user to sign in
  useEffect(() => {
    // if we have a public half stored, but no username, we're waiting for the user to sign in
    if (publicHalf && !username) {
      setAwaitingSignIn(true);
    } else {
      setAwaitingSignIn(false);
    }
  }, [username, publicHalf]);

  // ping the server to see if the user has signed in yet, whenever user opens popup
  useEffect(() => {
    if (!awaitingSignIn) {
      return;
    }
    store.dispatch(pingForJwt());
  }, [awaitingSignIn])

  const signIn = () => {
    setUserClicked(true);
    setPreviousToken(publicHalf);
    /* Telling service worker to generate a secret & save it in state */
    store.dispatch(generateSecret());
  };

  const signOut = () => {
    store.dispatch(clearJwt());
  };

  return {
    username,
    awaitingSignIn,
    signIn,
    signOut,
  };
}
