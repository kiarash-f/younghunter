import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAlbumApi } from "../services/albumService";
import toast from "react-hot-toast";

export default function useCreateAlbum() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutateAsync: createAlbum } = useMutation({
    mutationFn: createAlbumApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["albums"],
      });
    },

    onError: (error) => toast.error(error?.response?.data?.message),
  });

  return { isCreating, createAlbum };
}
