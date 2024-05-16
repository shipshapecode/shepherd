import { createContext, FC, useContext, type ReactNode } from 'react';

import Shepherd from 'shepherd.js';
import type ShepherdPro from 'shepherd.js';

interface ShepherdProviderProps {
  apiKey: string;
  apiPath?: string;
  properties?: Record<string, unknown>;
  children?: ReactNode;
}

interface ShepherdContextType {
  Shepherd: typeof ShepherdPro;
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

  const { Shepherd: shepherd } = context;

  return shepherd;
};

export const ShepherdJourneyProvider: FC<ShepherdProviderProps> = ({
  apiKey,
  apiPath,
  properties,
  children
}: ShepherdProviderProps) => {
  if (typeof window !== 'undefined') {
    Shepherd.init(apiKey, apiPath, properties);
  }

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
