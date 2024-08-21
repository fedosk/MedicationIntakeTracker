import { AxiosResponse } from 'axios';

import {
  IMedication,
  IMedicationWithoutTracking,
  Medications,
} from '../store/medication/types/medicationSchema';

import api from '.';

export default class MedicationService {
  static async getMedication(id: number): Promise<AxiosResponse<IMedication>> {
    try {
      const response = await api.get<IMedication>(`/medication/${id}`);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getMedications(): Promise<AxiosResponse<Medications>> {
    try {
      const response = await api.get<Medications>('/medications');
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async postMedication(
    medication: IMedicationWithoutTracking,
  ): Promise<AxiosResponse<IMedication>> {
    try {
      const response = await api.post<IMedication>('/medication', medication);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async updateMedication(
    id: number,
    medication: IMedicationWithoutTracking,
  ): Promise<AxiosResponse<IMedication>> {
    try {
      const response = await api.put<IMedication>(
        `/medication/${id}`,
        medication,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async updateMedicationCount(
    id: number,
    current_count: number,
  ): Promise<AxiosResponse<IMedication>> {
    try {
      const response = await api.put<IMedication>(`/medication/${id}`, {
        current_count,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteMedication(id: number): Promise<number> {
    try {
      await api.delete(`/medication/${id}`);
      return id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
