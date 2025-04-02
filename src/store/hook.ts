// crear un archivo para poder acceder a el redux de manera mas sencilla y menos repetitiva
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './index'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()