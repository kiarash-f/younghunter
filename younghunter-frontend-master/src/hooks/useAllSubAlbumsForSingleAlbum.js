import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAllSubAlbumsForSingleAlbumApi } from "../services/albumService";
import { useEffect } from "react";

export default function useAllSubAlbums() {
  const { id: albumId } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["all-subAlbums-single-album", albumId],
    queryFn: () => getAllSubAlbumsForSingleAlbumApi(albumId),
    retry: 1,
    enabled: !!albumId,
  });

  useEffect(() => {
    if (albumId) {
      queryClient.invalidateQueries(["all-subAlbums-single-album"]);
    }
  }, [albumId, queryClient]);

  const subAlbums = data?.subAlbums || []

  return {
    subAlbums,
    isLoading,
    isError,
    error,
  };
}
