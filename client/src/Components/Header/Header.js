import React from "react";
import "./header.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useMainCtx } from "../../Context/MainCtx";

const Header = () => {
  const { logout, isAuth, user } = useMainCtx();
  const navigate = useNavigate()

  console.log(user);

  const logoutHandler = () => {
    logout();
  };

  return (
    <div className="container-fluid mt-2 ">
      <Navbar expand="md" variant="dark" className="p-0 -skew-x-6">
        <Container fluid={true} className="header__bg m-0">
          <NavLink
            to="/"
            className="logo__container lg:text-5xl md:text-4xl text-5xl"
          >
            Tourist
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active_link nav-link link" : "nav-link link"
                }
              >
                All Users
              </NavLink>

              {(isAuth ===  false ) ? (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "active_link nav-link link" : "nav-link link"
                    }
                  >
                    <span>Login</span>
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? "active_link nav-link link" : "nav-link link"
                    }
                  >
                    <span>Register</span>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to={`/my_places/${user._id}`}
                    className={({ isActive }) =>
                      isActive ? "active_link nav-link link" : "nav-link link"
                    }
                  >
                    <span>Add Place</span>
                  </NavLink>

                  <NavLink
                    to="/my_places"
                    className={({ isActive }) =>
                      isActive ? "active_link nav-link link" : "nav-link link"
                    }
                  >
                    <span>My Place</span>
                  </NavLink>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "active_link nav-link link" : "nav-link link"
                    }
                    onClick={logoutHandler}
                  >
                    <span>Logout</span>
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
