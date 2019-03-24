import { MapPreview } from '../CreateServerMap.model';

/** Props of the map list. */
export interface IProps {
  selectedId: number | null;
  previews: MapPreview[];
  onSelect: (id: number | null) => void;
}

/** State of the map list. */
export interface IState {
  selectedId: number | null;
  previews: MapPreview[]
}
