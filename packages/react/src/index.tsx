import { createContext, FC, useContext, type ReactNode } from 'react';

import ShepherdPro from '@shepherdpro/pro-js';
import Shepherd from 'shepherd.js';
import type ShepherdPro from '@shepherdpro/pro-js';

interface ShepherdProviderProps {
  apiKey?: string;
  apiPath?: string;
  properties?: Record<string, unknown>;
  children?: ReactNode;
}

interface ShepherdContextType {
  Shepherd: typeof ShepherdPro | typeof Shepherd;
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

export const ShepherdJourneyProvider: FC<ShepherdProviderProps> = ({
  apiKey,
  apiPath,
  properties,
  children
}: ShepherdProviderProps) => {
  let JourneyLibrary = Shepherd;
  if (typeof window !== 'undefined') {
    if (apiKey) {
      JourneyLibrary = ShepherdPro;
      ShepherdPro.init(apiKey, apiPath, properties);
    }
  }

  return (
    <ShepherdJourneyContext.Provider value={{ Shepherd: JourneyLibrary }}>
      {children}
    </ShepherdJourneyContext.Provider>
  );
};

// For backwards compatibility, we're also exporting consumer and context
export {
  ShepherdJourneyContextConsumer as JourneyMethods,
  ShepherdJourneyContext
};
