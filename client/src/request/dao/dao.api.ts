import instance from "../api/api.instance";
import APIRequest, { APIError } from "../api/APIRequest";
import { DaoData } from "@/validation/dao.validation";

/**
 * DAOAPI class provides methods to:
 * 1) Create a new DAO
 * 2) Update an existing DAO
 * 3) Delete a DAO
 * 4) Get all DAOs
 * 5) Get a single DAO by ID
 */
export default class DAOAPI extends APIRequest {
  constructor() {
    super(instance);
  }

  /**
   * Creates a new DAO with the provided data
   * @param daoData The data for creating the new DAO
   * @throws If required data is missing or if the server response is invalid
   */
  async createDAO(daoData: Partial<DaoData>): Promise<DaoData> {
    const config = {
      url: "/dao",
      method: "POST",
      data: daoData,
    };

    try {
      const response = await this.request<DaoData>(config)
      return response;
    } catch (error) {
      console.error("Failed to create DAO:", error);
      throw error;
    }
  }

  /**
   * Updates an existing DAO
   * @param id The ID of the DAO to update
   * @param updateData The data to update
   * @throws If ID is missing or if server returns an invalid response
   */
  async updateDAO(
    id: string,
    updateData: Partial<DaoData>
  ): Promise<DaoData> {
    if (!id) {
      throw new Error("DAO ID is required for updating");
    }

    const config = {
      url: `/dao/${id}`,
      method: "PUT",
      data: updateData,
    };

    try {
      const response = await this.request<DaoData>(config);
      return response;
    } catch (error) {
      console.error("Failed to update DAO:", error);
      throw error;
    }
  }

  /**
   * Deletes a DAO by ID
   * @param id The ID of the DAO to delete
   * @throws If ID is missing or if server returns an invalid response
   */
  async removeDAO(id: string): Promise<{ message: string }> {
    if (!id) {
      throw new Error("DAO ID is required for deletion");
    }

    const config = {
      url: `/dao/${id}`,
      method: "DELETE",
    };

    try {
      const response = await this.request<{ message: string }>(config);
      return response;
    } catch (error) {
      console.error("Failed to delete DAO:", error);
      throw error;
    }
  }

  /**
   * Retrieves all DAOs
   * @returns Array of DAO objects
   * @throws If server returns an invalid response
   */
  async getAllDAOs(): Promise<DaoData[]> {
    const config = {
      url: "/dao",
      method: "GET",
    };

    try {
      const response = await this.request<DaoData[]>(config, false);
      return response;
    } catch (error) {
      console.error("Failed to fetch DAOs:", error);
      throw error;
    }
  }

  /**
   * Retrieves a single DAO by ID
   * @param id The ID of the DAO to retrieve
   * @returns DAO object
   * @throws If ID is missing or if server returns an invalid response
   */
  async getSingleDAO(id: string): Promise<DaoData> {
    if (!id) {
      throw new Error("DAO ID is required");
    }

    const config = {
      url: `/dao/${id}`,
      method: "GET",
    };

    try {
      const response = await this.request<DaoData>(config, false);
      return response;
    } catch (error) {
      console.error("Failed to fetch DAO:", error);
      throw error;
    }
  }
}
