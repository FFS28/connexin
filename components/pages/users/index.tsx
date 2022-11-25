import type { NextPage } from "next";

import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../utils/providers/context";

const User: NextPage = () => {
  const { appState, setAppState } = useContext(AppContext);
  useEffect(() => {}, []);

  if (appState.user.type == "guest") return <div>This is Guest</div>;

  return <div>This is Customer</div>;
};

export default User;
