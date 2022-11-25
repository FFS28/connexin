import type { NextPage } from "next";

import CustomTheme from "../../utils/providers/theme";
import { AppProvider } from "../../utils/providers/context";
import Admin from "../../components/pages/admins";

const Home: NextPage = () => {
  return (
    <CustomTheme>
      <AppProvider>
        <Admin />
      </AppProvider>
    </CustomTheme>
  );
};

export default Home;
