import { createStore } from "vuex";
import { user, UserState } from "@/store/modules/user"


export interface RootState {
    User: UserState;
    isAuthenticated: boolean;
}

export default createStore({
    modules:{
        user,
    }
});