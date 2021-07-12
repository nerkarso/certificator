import nullPresetObject from '@/utils/nullPresetObject';
import { createContext, useState } from 'react';

const defaultValue = {
  presetId: nullPresetObject._id,
  details: nullPresetObject.details,
  settings: nullPresetObject.settings,
  designContents: '',
  setPresetId: () => {},
  setDetails: () => {},
  setSettings: () => {},
  setDesignContents: () => {},
  setReceiverName: () => {},
  setReceiverFontSize: () => {},
  setReceiverFontColor: () => {},
  setReceiverFontFamily: () => {},
  setParagraph: () => {},
  setParagraphMaxWidth: () => {},
  setDateAwarded: () => {},
};

export const BuilderPropertiesContext = createContext(defaultValue);

export default function BuilderPropertiesProvider({ children }) {
  const [presetId, setPresetId] = useState(defaultValue.presetId);
  const [details, setDetails] = useState(defaultValue.details);
  const [settings, setSettings] = useState(defaultValue.settings);
  const [designContents, setDesignContents] = useState(
    defaultValue.designContents,
  );

  return (
    <BuilderPropertiesContext.Provider
      value={{
        presetId,
        details,
        settings,
        designContents,
        setPresetId,
        setDetails,
        setSettings,
        setDesignContents,
        setReceiverName: (value) => {
          setDetails((state) => ({
            ...state,
            receiverName: value,
          }));
        },
        setReceiverFontSize: (value) => {
          setSettings((state) => ({
            ...state,
            receiverFontSize: value,
          }));
        },
        setReceiverFontColor: (value) => {
          setSettings((state) => ({
            ...state,
            receiverFontColor: value,
          }));
        },
        setReceiverFontFamily: (value) => {
          setSettings((state) => ({
            ...state,
            receiverFontFamily: value,
          }));
        },
        setParagraph: (value) => {
          setDetails((state) => ({
            ...state,
            paragraph: value,
          }));
        },
        setParagraphMaxWidth: (value) => {
          setSettings((state) => ({
            ...state,
            paragraphMaxWidth: value,
          }));
        },
        setDateAwarded: (value) => {
          setDetails((state) => ({
            ...state,
            dateAwarded: value,
          }));
        },
      }}>
      {children}
    </BuilderPropertiesContext.Provider>
  );
}
