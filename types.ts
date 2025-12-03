export interface Activity {
  id: string;
  time: string;
  description: string;
  location?: string; // If present, shows Google Maps button
  note?: string;
}

export interface DaySchedule {
  id: string;
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  title: string;
  activities: Activity[];
}

export interface ItineraryState {
  days: DaySchedule[];
}