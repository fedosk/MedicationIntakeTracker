export interface IMedication {
  id: number;
  user_id: number;
  name: string | null;
  description: string | null;
  initial_count: number;
  current_count: number;
  destination_count: number;
  created_at: string;
  updated_at: string | null;
  is_active: boolean;
}

export type IMedicationWithoutTracking = Omit<
  IMedication,
  'id' | 'user_id' | 'created_at' | 'updated_at' | 'is_active'
>;

export type Medications = IMedication[];
