import { faqs } from "@/data/faqs";
import type { FAQ } from "@/types";

export function getFaqs(): Promise<FAQ[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(faqs);
    }, 800);
  });
}
