import { BuilderPropertiesContext } from '@/context/BuilderPropertiesContext';
import { useContext } from 'react';

export default function useBuilderProperties() {
  return useContext(BuilderPropertiesContext);
}
