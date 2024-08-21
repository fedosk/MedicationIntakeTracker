import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
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

export const updateMedication = createAsyncThunk<
  IMedication,
  { id: number; medication: IMedicationWithoutTracking }
>('medications/updateMedication', async ({ id, medication }) => {
  const response = await MedicationService.updateMedication(id, medication);
  return response.data;
});

export const createMedication = createAsyncThunk<
  IMedication,
  IMedicationWithoutTracking
>('medications/createMedication', async medication => {
  const response = await MedicationService.postMedication(medication);
  return response.data;
});

export const deleteMedication = createAsyncThunk<number, number>(
  'medications/deleteMedication',
  async (id: number) => {
    const response = await MedicationService.deleteMedication(id);
    return response;
  },
);

export const updateMedicationCount = createAsyncThunk<
  IMedication,
  {
    id: number;
    type: 'increase' | 'decrease';
  },
  {
    state: RootState;
    rejectValue: { error: string };
  }
>('medications/updateMedicationCount', async (payload, thunkAPI) => {
  const { id, type } = payload;

  const state = thunkAPI.getState();
  const medication = state.medications.medications.find(m => m.id === id);

  if (!medication) {
    return thunkAPI.rejectWithValue({ error: 'Medication not found' });
  }

  const currentCount = medication.current_count || 0;
  const adjustment = type === 'increase' ? 1 : -1;
  const newCount = currentCount + adjustment;

  try {
    const response = await MedicationService.updateMedicationCount(
      id,
      newCount,
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: (error as Error).message });
  }
});

const medicationsSlice = createSlice({
  name: 'medications',
  initialState,
  reducers: {},
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
      })
      .addCase(updateMedication.fulfilled, (state, action) => {
        const index = state.medications.findIndex(
          medication => medication.id === action.payload.id,
        );
        if (index !== -1) {
          state.medications[index] = action.payload;
        }
      })
      .addCase(updateMedicationCount.fulfilled, (state, action) => {
        const index = state.medications.findIndex(
          medication => medication.id === action.payload.id,
        );
        if (index !== -1) {
          state.medications[index] = action.payload;
        }
      })
      .addCase(createMedication.fulfilled, (state, action) => {
        state.medications.push(action.payload);
      })
      .addCase(deleteMedication.fulfilled, (state, action) => {
        state.medications = state.medications.filter(
          medication => medication.id !== action.payload,
        );
      });
  },
});

export default medicationsSlice.reducer;
