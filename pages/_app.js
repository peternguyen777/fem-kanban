import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "../store";

import Header from "../components/Header";
import MenuMobile from "../components/Modals/MenuMobile";
import MenuDesktop from "../components/UI/MenuDesktop";
import SidebarToggle from "../components/UI/SidebarToggle";
import ViewTask from "../components/Modals/ViewTask";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        defaultTheme='system'
        enableSystem={true}
        attribute='class'
      >
        <div className='flex'>
          <MenuDesktop />
          <SidebarToggle />
          <div className='relative w-full'>
            <Header />
            <MenuMobile />
            <ViewTask />

            <Component {...pageProps} />
          </div>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
