import { useSearchParams } from 'react-router-dom';

const useQueryParam = (param: string, defaultValue?: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParamValue = (value: string) => {
    searchParams.set(param, value);
    setSearchParams(searchParams);
  };

  const paramValue = searchParams.get(param) || defaultValue;

  return [paramValue, setParamValue] as const;
};

export default useQueryParam;
