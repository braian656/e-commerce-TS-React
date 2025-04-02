import { createContext ,ReactNode, useState} from "react";

import {CurrentInfo} from "./types/typesApi";

// Exportamos la CurrentInfo o si no hay data. devolvemos un undefined
export const contextProducts = createContext<CurrentInfo | undefined>(undefined)

  
// export const contextProducts = createContext<CurrentInfo>(
//     {} as CurrentInfo // 👈 Evita `undefined`
//   );