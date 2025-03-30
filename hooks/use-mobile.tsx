import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 500;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false); // Inicializa como `false` para evitar problemas en SSR

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Establece el estado inicial en el cliente
    setIsMobile(mql.matches);

    // Escucha cambios en el tamaño de la ventana
    mql.addEventListener('change', onChange);

    // Limpia el evento al desmontar
    return () => {
      mql.removeEventListener('change', onChange);
    };
  }, []);

  return isMobile;
}
