import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CanteenSlug } from "../constants";
import { useSettings } from "./settingsContext";

type ActiveCanteenCtx = {
  activeCanteen: CanteenSlug;
  setActiveCanteen: (slug: CanteenSlug) => void;
};

const Ctx = createContext<ActiveCanteenCtx | null>(null);

/** Dočasný výber jedálne na prezeranie (neperzistuje sa). */
export function ActiveCanteenProvider({ children }: { children: React.ReactNode }) {
  const { settings, ready } = useSettings();
  const [activeCanteen, setActiveCanteen] = useState<CanteenSlug>(settings.defaultCanteen);
  const [initialized, setInitialized] = useState(false);

  // Inicializácia z uloženého nastavenia (iba raz pri štarte)
  useEffect(() => {
    if (ready && !initialized) {
      setActiveCanteen(settings.defaultCanteen);
      setInitialized(true);
    }
  }, [ready, initialized, settings.defaultCanteen]);

  const value = useMemo(() => ({ activeCanteen, setActiveCanteen }), [activeCanteen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useActiveCanteen() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useActiveCanteen must be used inside ActiveCanteenProvider");
  return v;
}
