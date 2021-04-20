import * as React from "react";
import { WELCOME_MESSAGE } from "../constants";

export const withWelcomeMessage = (Component: any) => {
  const compName = Component.displayName || Component.name;
  const NewComponent = ({ ...props }) => {
    React.useEffect(() => {
      console.log(`${WELCOME_MESSAGE} ${compName}`);
    }, []);
    return <Component {...props} />;
  };

  return NewComponent;
};
