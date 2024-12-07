import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-toastify";

const useAppParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useCallback(
    (key: string, value?: string) => {
      //   if (!router) return toast.error("Router not mounted");
      const currentQuery = Object.fromEntries(searchParams.entries());

      if (value !== undefined) {
        currentQuery[key] = value;
        router.push(`${pathname}?${new URLSearchParams(currentQuery)}`);
      } else {
        return currentQuery[key];
      }
    },
    [router, pathname, searchParams]
  );

  return params;
};

export default useAppParams;
