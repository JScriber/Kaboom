/** Description of an alteration. */
interface Alteration {
  name: string;
  key: string;
  description: string;
}

/** List of all the alterations. */
export interface ListAllAlterations {
  bonus: Alteration[];
  penalties: Alteration[];
}

