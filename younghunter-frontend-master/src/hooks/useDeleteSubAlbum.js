import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeSubAlbumApi } from "../services/subAlbumService";
import toast from "react-hot-toast";

export default function useDeleteSubAlbum() {
  const queryClient = useQueryClient();

  const { isPending: isRemoving, mutateAsync: deleteSubAlbum } = useMutation({
    mutationFn: removeSubAlbumApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["albums"],
      });
    },
    onError: (error) => toast.error(error?.response?.data?.message || error.message),
  }); 

  return { isRemoving, deleteSubAlbum };
}
