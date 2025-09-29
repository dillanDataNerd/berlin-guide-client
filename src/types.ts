// Enum
export enum ActivityTag {
  FOOD = "FOOD",
  HISTORIC = "HISTORIC",
  PARTY = "PARTY",
  DILLAN_SPECIAL = "DILLAN_SPECIAL",
  SEASON_SUMMER = "SEASON_SUMMER",
  SEASON_WINTER = "SEASON_WINTER",
  SEASON_ALL = "SEASON_ALL",
}

// Activity type
export type Activity = {
  id: string;
  title: string;
  description: string;
  location: string; // Google Maps link
  latitude?: number | null;
  longitude?: number | null;
  photoUrl: string;
  tags: ActivityTag[];
  fave: boolean;
  trips: Trip[]; // relation
};

// Trip type
export type Trip = {
  id: string;
  title: string;
  guests: string[]; // array of names
  dateStarted: Date;
  daysInBerlin?: number | null;
  highlights?: string | null;
  interestingThings?: string | null;
  photoUrl?: string | null;
  activities: Activity[]; // relation
  updatedAt: Date;
};
