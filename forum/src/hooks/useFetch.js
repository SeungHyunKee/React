import { useEffect, useState } from "react";

export function useFetch(initialValue, fnFetch, param) {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  //useFetch : Component가 실행되자마자 쓰임
  //     -> 한번만 실행되도록 useEffect가 필요함
  useEffect(() => {
    const fetchingData = async () => {
      const json = await fnFetch({ ...param });
      setData(json);
      setIsLoading(false);
    };

    fetchingData();
  }, [fnFetch, param]);

  return { data, isLoading, setData };
}
