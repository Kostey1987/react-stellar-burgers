import userSliceReducer, {
  initialState,
  setAuthChecked,
  setUser,
  setLogoutUser,
  setLogoutRequest,
  setUserRequest,
  setResetConfirmed,
  setResetRequest,
  setChangePassword,
  setChangePasswordRequest,
  setUpdateUser,
  setUpdateUserRequest,
} from "./user-slice";

describe("Тестирование userSlice", () => {
  it("тест setAuthChecked", () => {
    const nextState = userSliceReducer(initialState, setAuthChecked(true));

    expect(nextState.isAuthChecked).toEqual(true);
  });
  it("sтест setUser", () => {
    const nextState = userSliceReducer(
      initialState,
      setUser({ email: "test@example.com", name: "Test User" })
    );

    expect(nextState.user).toEqual({
      email: "test@example.com",
      name: "Test User",
    });
  });
  it("тест setLogoutUser", () => {
    const nextState = userSliceReducer(initialState, setLogoutUser());

    expect(nextState.userData.email).toEqual("");
    expect(nextState.userData.name).toEqual("");
  });
  it("тест logoutRequest", () => {
    const nextState = userSliceReducer(initialState, setLogoutRequest(true));

    expect(nextState.logoutRequest).toEqual(true);
  });
  it("тест setUserRequest", () => {
    const nextState = userSliceReducer(initialState, setUserRequest(true));

    expect(nextState.userRequest).toEqual(true);
  });
  it("тест setResetConfirmed", () => {
    const nextState = userSliceReducer(initialState, setResetConfirmed(true));

    expect(nextState.resetConfirmed).toEqual(true);
  });
  it("тест setResetRequest", () => {
    const nextState = userSliceReducer(initialState, setResetRequest(true));

    expect(nextState.resetRequest).toEqual(true);
  });

  it("тест setChangePassword", () => {
    const nextState = userSliceReducer(initialState, setChangePassword(true));

    expect(nextState.changePassword).toEqual(true);
  });
  it("тест setChangePasswordRequest", () => {
    const nextState = userSliceReducer(
      initialState,
      setChangePasswordRequest(true)
    );

    expect(nextState.changePasswordRequest).toEqual(true);
  });
  it("should handle setUpdateUser", () => {
    const nextState = userSliceReducer(
      initialState,
      setUpdateUser({ email: "test@example.com", name: "Test User" })
    );
    expect(nextState.userData.email).toEqual("test@example.com");
    expect(nextState.userData.name).toEqual("Test User");
  });
  it("тест setUpdateUserRequest", () => {
    const nextState = userSliceReducer(
      initialState,
      setUpdateUserRequest(true)
    );

    expect(nextState.updateRequest).toEqual(true);
  });
});
