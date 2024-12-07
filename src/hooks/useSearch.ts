// Tạo hook để lấy search params từ url sử dụng Object.fromEntries

import { useSearchParams } from "next/navigation";

export const useSearch = () => {
  const [params, setSearchParams] = useSearchParams();
  const searchParams = Object.fromEntries(params.entries());
  return { searchParams, setSearchParams };
};
