import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "../store";

import Header from "../components/Header";
import MenuMobile from "../components/Modals/MenuMobile";
import MenuDesktop from "../components/UI/MenuDesktop";
import SidebarToggle from "../components/UI/SidebarToggle";
import ViewTask from "../components/Modals/ViewTask";
import AddTask from "../components/Modals/AddTask";
import AddBoard from "../components/Modals/AddBoard";
import EditTask from "../components/Modals/EditTask";
import EditBoard from "../components/Modals/EditBoard";
import DeleteTask from "../components/Modals/DeleteTask";
import DeleteBoard from "../components/Modals/DeleteBoard";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        defaultTheme='system'
        enableSystem={true}
        attribute='class'
      >
        {/* Portals */}
        <MenuMobile />
        <ViewTask />
        <AddTask />
        <EditTask />
        <DeleteTask />
        <AddBoard />
        <EditBoard />
        <DeleteBoard />

        {/* Sidebar Toggle */}
        <SidebarToggle />

        {/* Main */}
        <div className='flex min-h-screen'>
          <MenuDesktop />
          <div className='flex-1'>
            <Header />
            <Component {...pageProps} />
          </div>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
