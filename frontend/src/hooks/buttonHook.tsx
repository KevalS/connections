import { useState } from "react";

export const useButtonHook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
    isLoading,
    setIsLoading,
  };
};
