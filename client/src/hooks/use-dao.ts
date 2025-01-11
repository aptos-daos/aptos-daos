import { useEffect, useState } from "react";
import { type DaoData } from "@/validation/dao.validation";
import instance from "@/request/api/api.instance";
import { useToast } from "./use-toast";

const useDao = () => {
  const [daos, setDaos] = useState<DaoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchAllDaoData()
      .then((resp) => {
        setDaos(resp);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setDaos([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const { toast } = useToast();

  const responseParserData = <T>(
    data: Response<T>,
    onSuccessToast: boolean = false
  ): T => {
    if (onSuccessToast || !data.success)
      toast({
        title: data.message,
        variant: data.success ? "default" : "destructive",
      });
    return data.data;
  };

  const fetchAllDaoData = async (): Promise<DaoData[]> => {
    try {
      const response = await instance.get<Response<DaoData[]>>("/dao");
      return responseParserData(response.data);
    } catch (error) {
      toast({
        title: "Failed to fetch dao data",
        variant: "destructive",
      });
      return [];
    }
  };

  const fetchDao = async (id: string): Promise<DaoData | null> => {
    try {
      const response = await instance.get<Response<DaoData>>(`/dao/${id}`);
      return responseParserData<DaoData>(response.data);
    } catch (error) {
      toast({
        title: "Failed to fetch dao entry",
        variant: "destructive",
      });
      return null;
    }
  };

  const addDao = async (data: DaoData): Promise<DaoData | null> => {
    try {
      const response = await instance.post<Response<DaoData>>(
        "/dao",
        data
      );
      return responseParserData(response.data, true);
    } catch (error) {
      toast({
        title: "Failed to add dao",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteDao = async (id: string) => {
    try {
      const response = await instance.delete(`/dao/${id}`);
      return responseParserData(response.data, true);
    } catch (error) {
      toast({
        title: "Failed to delete dao",
        variant: "destructive",
      });
    }
  };

  const updateDaoValue = async (id: string, value: number) => {
    try {
      const response = await instance.patch<Response<DaoData>>(
        `/dao/${id}`,
        { value }
      );
      return responseParserData<any>(response.data, true);
    } catch (error) {
      toast({
        title: "Failed to update dao value",
        variant: "destructive",
      });
    }
  };

  return {
    daos,
    loading,
    error,
    fetchAllDaoData,
    fetchDao,
    addDao,
    deleteDao,
    updateDaoValue,
  };
};

export { useDao };
