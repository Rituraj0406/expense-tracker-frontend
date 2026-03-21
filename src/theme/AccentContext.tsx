import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type AccentContextType = {
  accent: string;
  setAccent: (value: string) => void;
};

const AccentContext = createContext<AccentContextType | undefined>(undefined);

export const AccentProvider = ({ children }: { children: ReactNode }) => {
  const [accent, setAccent] = useState<string>(
    localStorage.getItem("accent") || "default"
  );

  useEffect(() => {
    localStorage.setItem("accent", accent);
  }, [accent]);

  return (
    <AccentContext.Provider value={{ accent, setAccent }}>
      {children}
    </AccentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAccent = () => {
  const context = useContext(AccentContext);
  if (!context) {
    throw new Error("useAccent must be used within AccentProvider");
  }
  return context;
};