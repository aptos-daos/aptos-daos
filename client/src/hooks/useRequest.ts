import { DaoData } from "@/validation/dao.validation";
import axiosInstance from "@/libs/instance";
import { useToast } from "@/components/Toast";

const useRequest = () => {
  const { addToast } = useToast();

  const responseParserData = <T>(
    data: Response<T>,
    onSuccessToast: boolean = false
  ): T => {
    if (onSuccessToast || !data.success)
      addToast(data.message, data.success ? "success" : "error");
    return data.data;
  };

  const fetchAllDaoData = async (): Promise<DaoData[]> => {
    try {
      const response = await axiosInstance.get<Response<DaoData[]>>("/dao");
      return responseParserData(response.data);
    } catch (error) {
      addToast("Failed to fetch timeline data", "error");
      return [];
    }
  };

  const fetchDao = async (id: string): Promise<DaoData | null> => {
    try {
      const response = await axiosInstance.get<Response<DaoData>>(`/dao/${id}`);
      return responseParserData<DaoData>(response.data);
    } catch (error) {
      addToast("Failed to fetch timeline entry", "error");
      return null;
    }
  };

  const addDao = async (data: DaoData): Promise<DaoData | null> => {
    try {
      const response = await axiosInstance.post<Response<DaoData>>(
        "/dao",
        data
      );
      return responseParserData(response.data, true);
    } catch (error) {
      addToast("Failed to add timeline", "error");
      return null;
    }
  };

  const deleteDao = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/dao/${id}`);
      return responseParserData(response.data, true);
    } catch (error) {
      addToast("Failed to delete timeline", "error");
    }
  };

  const updateDaoValue = async (id: string, value: number) => {
    try {
      const response = await axiosInstance.patch<Response<DaoData>>(
        `/dao/${id}`,
        { value }
      );
      return responseParserData<any>(response.data, true);
    } catch (error) {
      addToast("Failed to update timeline value", "error");
    }
  };

  return {
    fetchAllDaoData,
    addDao,
    deleteDao,
    updateDaoValue,
  };
};

export default useRequest;
