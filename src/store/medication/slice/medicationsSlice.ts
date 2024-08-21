import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import MedicationService from '../../../api/MedicationService';
import {
  IMedication,
  IMedicationWithoutTracking,
  Medications,
} from '../types/medicationSchema';

interface MedicationState {
  medications: Medications;
  loading: boolean;
  error: string | null;
}

const initialState: MedicationState = {
  medications: [],
  loading: false,
  error: null,
};

export const fetchMedications = createAsyncThunk<Medications>(
  'medications/fetchMedications',
  async () => {
    const response = await MedicationService.getMedications();
    return response.data;
  },
);

export const updateMedications = createAsyncThunk<
  IMedication,
  IMedicationWithoutTracking
>('medications/fetchMedications', async medication => {
  const response = await MedicationService.updateMedication(medication);
  return response.data;
});

const medicationsSlice = createSlice({
  name: 'medications',
  initialState,
  reducers: {
    setMedications: (state, action: PayloadAction<Medications>) => {
      state.medications = action.payload;
    },
    addMedication: (state, action: PayloadAction<IMedication>) => {
      state.medications.push(action.payload);
    },
    deleteMedication: (state, action: PayloadAction<number>) => {
      state.medications = state.medications.filter(
        medication => medication.id !== action.payload,
      );
    },
    updateMedication: (
      state,
      action: PayloadAction<{ id: number; updatedMedication: IMedication }>,
    ) => {
      const { id, updatedMedication } = action.payload;
      const index = state.medications.findIndex(
        medication => medication.id === id,
      );
      if (index !== -1) {
        state.medications[index] = updatedMedication;
      }
    },
    updateMedicationCount: (
      state,
      action: PayloadAction<{
        id: number;
        key: 'initial_count' | 'current_count' | 'destination_count';
        type: 'increase' | 'decrease';
      }>,
    ) => {
      const { id, key, type } = action.payload;
      const index = state.medications.findIndex(
        medication => medication.id === id,
      );

      if (index !== -1) {
        const medication = state.medications[index];
        const updatedMedication = {
          ...medication,
          [key]:
            type === 'increase' ? medication[key] + 1 : medication[key] - 1,
        };

        state.medications[index] = updatedMedication;
      }
    },

    clearAllMedications: state => {
      state.medications = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMedications.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedications.fulfilled, (state, action) => {
        state.medications = action.payload;
        state.loading = false;
      })
      .addCase(fetchMedications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch medications';
      });
    builder.addCase(updateMedications.fulfilled, (state, action) => {
      const index = state.medications.findIndex(
        medication => medication.id === action.payload.id,
      );
      if (index !== -1) {
        state.medications[index] = action.payload;
      }
    });
  },
});

export const {
  setMedications,
  addMedication,
  deleteMedication,
  updateMedication,
  clearAllMedications,
  updateMedicationCount,
} = medicationsSlice.actions;

export default medicationsSlice.reducer;
