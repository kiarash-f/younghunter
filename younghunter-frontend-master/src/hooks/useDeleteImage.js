import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeImageApi } from "../services/imageService";
import toast from "react-hot-toast";

export default function useDeleteImage() {
  const queryClient = useQueryClient();

  const { isPending: isRemoving, mutateAsync: deleteImage } = useMutation({
    mutationFn: removeImageApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || error.message),
  });

  return { isRemoving, deleteImage };
}
