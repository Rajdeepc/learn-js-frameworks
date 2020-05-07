import React, { useState, useEffect } from "react";
import {
  NavDropdown,
  FormControl,
  Form,
  Nav,
  InputGroup,
  Button,
  Navbar,
  Modal,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import JSLinks from "../../utils/constants";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAction, clearAllErrors } from "../../views/Auth/auth.action";
import "./navbar.scss";
import { BsSearch } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { AiOutlineLogin, AiOutlineBell } from "react-icons/ai";
import AuthConnectedComponent from "../../views/Auth/Auth.component";
import {getSelectionData} from './navbar.action'

const NavbarComponent = (props) => {
  const [show, setShow] = useState(false);
  const [dropdownValue, setDropDownValue] = useState(JSLinks[0].core);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    props.clearAllErrors();
    setShow(true);
  };

  const logout = () => {
    props.logoutAction();
  };

  useEffect(() => {
    if (props.authResponseObj && props.authResponseObj.isLoggedIn) {
      setShow(false);
    }
  }, [props.authResponseObj]);

  useEffect(() => {
    props.getSelectionData(JSLinks[0].value);
  }, []);


  const getDataFromYoutube = (selected) => {
    setDropDownValue(selected.core)
    props.getSelectionData(selected.value);
  };



  return (
    <>
      <Navbar expand="lg" className="navbar-js">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav class="search-nav">
          <InputGroup>
            <FormControl
              placeholder="Search courses.."
              aria-label="Search courses.."
              aria-describedby="basic-addon2"
            />
            <BsSearch />
            <DropdownButton
              as={InputGroup.Append}
              variant="outline-secondary"
              title={dropdownValue}
              id="input-group-dropdown-2"
            >
              
              {(JSLinks || []).map((item) => {
                return (
                  <Dropdown.Item onSelect={(eventKey, event) => getDataFromYoutube(item, event)}>{item.core}</Dropdown.Item>
                );
              })}
            </DropdownButton>
          </InputGroup>
        </Nav>
        <Nav className="ml-auto">
          {!props.authResponseObj.isLoggedIn ? (
            <FiLogIn size={20} onClick={handleShow} />
          ) : (
            <>
              <Nav.Item>
                <AiOutlineBell size={20} />
              </Nav.Item>
              <Nav.Item>
                <FaRegUserCircle size={20} />
              </Nav.Item>

              <NavDropdown
                title={`${props.authResponseObj.loginResponse.email}`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  <Link to="/profile">Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </>
          )}
        </Nav>
      </Navbar>
      {/* // login modal */}
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Body>
          <AuthConnectedComponent />
          <div>
            <strong>
              {props.authResponseObj.loginError &&
                props.authResponseObj.loginError.error}
            </strong>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  authResponseObj: state.AuthReducer,
});

const NavbarConnectedComponent = connect(mapStateToProps, {
  logoutAction,
  clearAllErrors,
  getSelectionData
})(NavbarComponent);

export default NavbarConnectedComponent;
