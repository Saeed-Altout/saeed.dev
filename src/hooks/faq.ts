import { useQuery } from "@tanstack/react-query";

import { getFaqs } from "@/api/faq";
import type { FAQ } from "@/types";

export const useFaqsQuery = () => {
  return useQuery<FAQ[]>({
    queryKey: ["faqs"],
    queryFn: getFaqs,
  });
};
