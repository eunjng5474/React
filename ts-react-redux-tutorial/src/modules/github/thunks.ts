import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { GithubAction } from "./types";
import { getUserProfile } from "../../api/github";
import { getUserProfileAsync } from "./actions";
import createAsyncThunk from "../../lib/createAsyncThunk";

// export function getUserProfileThunk(username: string
//   ): ThunkAction<Promise<void>, RootState, null, GithubAction> {
//   return async dispatch => {
//     const { request, success, failure } = getUserProfileAsync
//     dispatch(request())
//     try {
//       const userProfile = await getUserProfile(username)
//       dispatch(success(userProfile))
//     } catch (e: any) {
//       dispatch(failure(e))
//     }
//   }
// }

export const getUserProfileThunk = createAsyncThunk(
  getUserProfileAsync,
  getUserProfile
);