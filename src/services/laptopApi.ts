import axios, { AxiosError } from "axios";
import { Laptop } from "../hooks/useData";

class laptopServices {
  http = axios.create({
    baseURL: "http://localhost:8080/api/",
  });

  async getLaptops() {
    const response = await this.http.get("/laptops");
    return response.data;
  }

  async AddLaptops(laptop: Laptop) {
    const response = await this.http.post("/laptops", laptop);
    return response.data;

  }

  async editLaptops(id: string, laptop: Laptop): Promise<Laptop> {
    const response = await this.http.put(`/laptops/${id}`, laptop);
    return response.data;
  }

  async deleteLaptops(id: string) {
    try {
      const response = await this.http.delete(`/laptops/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        console.error(`Laptop with ID ${id} is not found.`);
      } else {
        console.error(
          `Error removing laptop: ${axiosError.response?.status} - ${axiosError.response?.statusText}`
        );
      }
      throw error;
    }
  }
}

export default new laptopServices();
