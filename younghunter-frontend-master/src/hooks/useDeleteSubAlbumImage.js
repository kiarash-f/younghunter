import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeSubAlbumImageApi } from "../services/subAlbumService";

export default function useDeleteSubAlbumImage() {
  const queryClient = useQueryClient();

  const { isPending: isRemoving, mutateAsync: deleteSubAlbumImage } = useMutation({
    mutationFn: removeSubAlbumImageApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
      queryClient.invalidateQueries({
        queryKey: ["albums"]
      })
    },
    onError: (error) => toast.error(error?.response?.data?.message || error.message),
  }); 

  return { isRemoving, deleteSubAlbumImage };
}
