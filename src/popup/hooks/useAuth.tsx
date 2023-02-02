import { createContext, useContext, useEffect, useState } from "react";
import { generateSecret } from "../../redux/actions/secretActions";
import { useSelector, useStore } from "react-redux";
import { selectPublicHalf } from "../../redux/selectors/secretSelector";
import env from "../../env";
import { Microservice } from "@hmdlr/utils/dist/Microservice";

const authContext = createContext<{
  email: string | undefined,
  signIn: () => void,
  signOut: () => void,
}>(undefined!);

export const ProvideAuth = ({ children }: { children: any }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
}

function useProvideAuth() {
  const store = useStore();
  const publicHalf = useSelector(selectPublicHalf);
  const [email, setEmail] = useState<string>();

  const signIn = () => {
    /* Telling service worker to generate a secret & save it in state */
    store.dispatch(generateSecret());
  };

  useEffect(() => {
    if (!publicHalf || publicHalf === '') {
      return;
    }
    window.open(`${env.front[Microservice.Authphish]}/auth?ident=${publicHalf}`);
  }, [publicHalf])

  const signOut = () => {
    setEmail(undefined);
  };

  return {
    email,
    signIn,
    signOut,
  };
}
