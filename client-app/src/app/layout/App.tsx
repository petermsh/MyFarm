import ModalContainer from "../common/ModalContainer";
import {ToastContainer} from "react-toastify";
import HomePage from "../../features/home/HomePage";
import NavBar from "./NavBar";
import {Container} from "semantic-ui-react";
import {Outlet} from "react-router-dom";

function App() {

  return (
      <>
        <ModalContainer />
        <ToastContainer position={'bottom-right'} hideProgressBar theme={'colored'} />
        {location.pathname === '/' ? <HomePage /> : (
            <>
              <NavBar  />
              <Container style={{marginTop: '7em'}}>
                <Outlet />
              </Container>
            </>
        )}
      </>
  )
}

export default App
