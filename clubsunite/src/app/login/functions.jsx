export const onButtonClick = (buttonId, setActionType, setRole) => {
  if (buttonId === 1) {
    setActionType("login");
    setRole("student");
  } else if (buttonId === 2) {
    setActionType("login");
    setRole("club");
  } else {
    setActionType("login");
    setRole(null);
  }
};
