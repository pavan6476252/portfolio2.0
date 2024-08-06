import { twMerge } from "tailwind-merge";

export const cn = (...data: (string | undefined)[]) => twMerge(...data);
