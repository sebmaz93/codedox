import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "reduxState";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
