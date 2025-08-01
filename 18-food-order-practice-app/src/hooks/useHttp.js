import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }
  return resData;
}

export function useHttp(url, config, initialData) {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(payload) {
      setIsLoading(true);
      try {
        const data = await sendHttpRequest(url, { ...config, body: payload });
        setData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data" });
      }

      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && config.method === "GET") || !config.method || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return { isLoading, data, error, sendRequest, clearData };
}
