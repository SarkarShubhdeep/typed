import { createContext, useContext } from 'react';

export function getStrictContext<T>(name: string) {
  const Context = createContext<T | undefined>(undefined);

  const Provider = Context.Provider;

  const useStrictContext = () => {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error(`use${name} must be used within a ${name}Provider`);
    }
    return context;
  };

  return [Provider, useStrictContext] as const;
}
