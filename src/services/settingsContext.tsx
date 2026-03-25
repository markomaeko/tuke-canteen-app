import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_SETTINGS, loadSettings, saveSettings, type AppSettings } from "./settingsStorage";

type SettingsCtx = {
  settings: AppSettings;
  ready: boolean;
  update: (patch: Partial<AppSettings>) => Promise<void>;
};

const Ctx = createContext<SettingsCtx | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadSettings()
      .then((s) => setSettings(s))
      .catch((e) => console.error("Failed to load settings:", e))
      .finally(() => setReady(true));
  }, []);

  const update = useCallback(async (patch: Partial<AppSettings>) => {
    // funkčný update => nevzniká stale state problém
    let next: AppSettings = DEFAULT_SETTINGS;

    setSettings((prev) => {
      next = { ...prev, ...patch };
      return next;
    });

    // persist rovnaký "next" ako v UI
    await saveSettings(next);
  }, []);

  const value = useMemo(() => ({ settings, ready, update }), [settings, ready, update]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSettings() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSettings must be used inside SettingsProvider");
  return v;
}
