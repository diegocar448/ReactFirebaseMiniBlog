import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function useQuery(){
    const {search} = useLocation();

    // URLSearchParams objeto que retorno os parâmetros da busca
    return useMemo(() => new URLSearchParams(search), [search]);
}