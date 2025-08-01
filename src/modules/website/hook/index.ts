import { useQuery } from "@tanstack/react-query";

import { getFaqs, getMe, type FAQ, type Me } from "@/modules/website";

export const useMeQuery = () => {
  return useQuery<Me>({
    queryKey: ["me"],
    queryFn: getMe,
  });
};

export const useFaqsQuery = () => {
  return useQuery<FAQ[]>({
    queryKey: ["faqs"],
    queryFn: getFaqs,
  });
};
