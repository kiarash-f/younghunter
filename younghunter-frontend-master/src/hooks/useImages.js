import { useQuery } from "@tanstack/react-query";
import getImagesApi from "../services/imageService";

export default function useImages() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["images"],
    queryFn: getImagesApi,
  });
 

  const images  = data?.images || data || [];
  return { images, isLoading, isError, error };
}
