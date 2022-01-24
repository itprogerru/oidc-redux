import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../service/oidcServices";
import {getUserManager} from "../service/authenticationService";
import {sessionTerminated, UserState} from "../Reducer/Reducer";

export const useOidc = () => {
    const state:UserState  = useSelector((state: any) => state.oidc)
    const dispatch = useDispatch()

    const logout = async ()=> {
        dispatch(sessionTerminated());
        localStorage.removeItem('oidc');
        await logoutUser(getUserManager());
    }

    return {
        state, logout
    }
}
