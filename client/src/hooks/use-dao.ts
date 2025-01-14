import { useEffect, useState } from "react";
import type { DaoData, DaoDataWithInvite } from "@/validation/dao.validation";
import { useToast } from "./use-toast";
import DAOAPI from "@/request/dao/dao.api";

const useDao = () => {
  const [daos, setDaos] = useState<DaoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const api = new DAOAPI();

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

  const fetchAllDaoData = async (): Promise<DaoData[]> => {
    try {
      const response = await api.getAllDAOs();
      return response;
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
      const response = await api.getSingleDAO(id);
      return response;
    } catch (error) {
      toast({
        title: "Failed to fetch dao entry",
        variant: "destructive",
      });
      return null;
    }
  };

  const createDao = async (
    data: DaoDataWithInvite
  ): Promise<DaoData | null> => {
    try {
      const response = await api.createDAO(data);
      return response;
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
      const response = await api.removeDAO(id);
      return response;
    } catch (error) {
      toast({
        title: "Failed to delete dao",
        variant: "destructive",
      });
    }
  };

  const updateDaoValue = async (id: string, value: Partial<DaoData>) => {
    try {
      const response = await api.updateDAO(id, value);;
      return response;
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
    createDao,
    deleteDao,
    updateDaoValue,
  };
};

export { useDao };
