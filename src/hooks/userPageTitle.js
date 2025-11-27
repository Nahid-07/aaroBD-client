import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | AaroShop`;
  }, [title]);
};

export default usePageTitle;