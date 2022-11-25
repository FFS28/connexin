import type { NextPage } from "next";

import CustomTheme from "../utils/providers/theme";
import ConnexinHome from "../components/pages/home";
import { AppProvider } from "../utils/providers/context";

const Home: NextPage = () => {
  return (
    <CustomTheme>
      <AppProvider>
        <ConnexinHome />
      </AppProvider>
    </CustomTheme>
  );
};

export default Home;
