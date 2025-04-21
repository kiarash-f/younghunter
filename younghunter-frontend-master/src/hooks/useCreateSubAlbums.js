import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubAlbumApi } from "../services/subAlbumService";
import { toast } from "react-hot-toast";

export default function useCreateSubAlbums() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutateAsync: createSubAlbum } = useMutation({
    mutationFn: createSubAlbumApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["albums"],
      });
    },

    onError: (error) => toast.error(error?.response?.data?.message),
  });

  return { isCreating, createSubAlbum };
}
