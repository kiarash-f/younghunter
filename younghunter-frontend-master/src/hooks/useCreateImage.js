import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createImageApi } from "../services/imageService";
import toast from "react-hot-toast";

export default function useCreateImage() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: createNewImage } = useMutation({
    mutationFn: createImageApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },
    onError: (error) => toast.error(error?.response?.data?.message),
  });

  return { isPending, createNewImage };
}
