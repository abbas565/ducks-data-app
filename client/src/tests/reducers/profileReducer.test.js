import profileReducer from "../../reducers/profileReducer";

test("should set default state", () => {
  const initialState = {
    profile: null,
    profiles: null,
    loading: false
  };

  const state = profileReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual(initialState);
});

test("should load profile", () => {
  const initialState = {
    profile: null,
    profiles: null,
    loading: false
  };

  const action = {
    type: "PROFILE_LOADING",
    state: initialState
  };
  const state = profileReducer(state, action);
  expect(state).toEqual({
    ...state,
    loading: true
  });
});
