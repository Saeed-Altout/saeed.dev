import { db } from "@/modules/website";
import type { FAQ, Me } from "@/modules/website";

export function getMe(): Promise<Me> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(db.me);
    }, 800);
  });
}

export function getFaqs(): Promise<FAQ[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(db.faqs);
    }, 800);
  });
}
