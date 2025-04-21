import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addImageToSubAlbum } from "../services/subAlbumService";
import toast from "react-hot-toast";

export default function useAddImageToSubAlbum() {
  const queryClient = useQueryClient();

  const { isPending: isAdding, mutateAsync: addImage } = useMutation({
    mutationFn: addImageToSubAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
      queryClient.invalidateQueries({
        queryKey: ["albums"]
      })
    },

    onError: (error) => toast.error(error?.response?.data?.message),
  });

  return { isAdding, addImage };
}
