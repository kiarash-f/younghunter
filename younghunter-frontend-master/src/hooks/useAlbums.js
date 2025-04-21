import { useQuery } from "@tanstack/react-query";
import getAlbumsApi from "../services/albumService";

export default function useAlbums() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbumsApi,
  });

  const  albums  = data?.albums  || [];
  return { albums, isLoading, isError, error };
}
