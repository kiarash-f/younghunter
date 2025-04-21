import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleSubAlbumApi } from "../services/albumService";

export default function useSingleAlbum() {
  const { albumId, subAlbumId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["single-sub-album", albumId, subAlbumId],
    queryFn: () => getSingleSubAlbumApi(albumId, subAlbumId),
    retry: 1,
    enabled: !!albumId && !!subAlbumId,
  });


  const  subAlbum  = data?.subAlbum || {};
  
  return { subAlbum, isLoading, isError, error };
}
