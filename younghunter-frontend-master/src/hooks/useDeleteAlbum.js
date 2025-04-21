import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeAlbumApi } from "../services/albumService";
import toast from "react-hot-toast";

export default function useDeleteAlbum() {
  const queryClient = useQueryClient();

  const { isPending: isRemoving, mutateAsync: deleteAlbum } = useMutation({
    mutationFn: removeAlbumApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["albums"],
      });
    },
    onError: (error) => toast.error(error?.response?.data?.message || error.message)
  });

  return { isRemoving, deleteAlbum };
}
