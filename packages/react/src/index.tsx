import { createContext, FC, useContext, type ReactNode } from 'react';
import Shepherd from 'shepherd.js';

interface ShepherdContextType {
  Shepherd: typeof Shepherd;
}

const ShepherdJourneyContext = createContext<ShepherdContextType | undefined>(
  undefined
);
const ShepherdJourneyContextConsumer = ShepherdJourneyContext.Consumer;

export const useShepherd = () => {
  const context = useContext(ShepherdJourneyContext);
  if (!context) {
    throw new Error(
      'useShepherd must be used within a ShepherdJourneyProvider'
    );
  }

  const { Shepherd: ShepherdInsance } = context;

  return ShepherdInsance;
};

export const ShepherdJourneyProvider = ({
  children
}: {
  children?: ReactNode;
}) => {
  return (
    <ShepherdJourneyContext.Provider value={{ Shepherd }}>
      {children}
    </ShepherdJourneyContext.Provider>
  );
};

// For backwards compatibility, we're also exporting consumer and context
export {
  ShepherdJourneyContextConsumer as JourneyMethods,
  ShepherdJourneyContext
};
