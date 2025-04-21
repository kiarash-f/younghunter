import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editImageApi } from "../services/imageService";

export default function useEditImage() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutateAsync: editImage } = useMutation({
    mutationFn: editImageApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
      queryClient.invalidateQueries({ queryKey: ["albums"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  return { isEditing, editImage };
}
