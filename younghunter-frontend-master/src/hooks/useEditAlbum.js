import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editAlbumApi } from "../services/albumService";
import toast from "react-hot-toast";

export default function useEditAlbum() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutateAsync: editAlbum } = useMutation({
    mutationFn: editAlbumApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["albums"],
      });
    },

    onError: (error) => toast.error(error?.response?.data?.message),
  });

  return { isEditing, editAlbum };
}
