import * as React from "react";
import "../ContactDetailList/ContactDetailList.css";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import linkedin from "../../../Assets/linkedin.svg";
import copypaste from "../../../Assets/copypaste.svg";
import visitLinkImage from "../../../Assets/visit-link.svg";
import Collapse from "@mui/material/Collapse";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import phone from "../../../Assets/phone.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Tooltip from "@mui/material/Tooltip";
export default function ContactDetailList({ item }) {
  const [open, setOpen] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);
  const handleClick = (item) => {
    setOpen(!open);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setOpen(false);
    }, 800);
  };
  const handleCopy = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    setClicked(true);
  };
  return (
    <>
      <div className="ContactDetailList-dropdown" onBlur={handleBlur}>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          className="list-main-container"
        >
          {item ? (
            <ListItemButton className="list-button-item-start">
              <ListItemText className="list-text-item" />
              <div
                className="email-number-accordian-div"
                onClick={() => handleClick(item)}
              >
                <p className="email-in-accordian">
                  {item?.linkedin
                    ? item?.linkedin.length > 28
                      ? item?.linkedin.substr(28, 28) ||
                        item?.linkedin.length > 20 + "..."
                      : item?.linkedin
                    : "Not Available"}
                </p>
                <p className="number-in-accordian">
                  {item?.email
                    ? item?.email.length > 26
                      ? item?.email.substr(0, 26) + "..."
                      : item?.email
                    : "Not Available"}
                </p>
              </div>
              <KeyboardArrowDownIcon
                className="arrow-down-of-suspect-select"
                onClick={handleClick}
              />
            </ListItemButton>
          ) : (
            <p>-</p>
          )}
          <Collapse
            className="lkjhgfdxfgy"
            in={open}
            timeout="auto"
            unmountOnExit
          >
            <List
              component="div"
              disablePadding
              className="dropdownbox-main-container"
            >
              <ListItemButton
                sx={{ pl: 4 }}
                className="buttons-of-the-list-item-last"
              >
                <ListItemText className="list-text-item" />
                <div className="email-id-and-paste">
                  <div className="inner-icons-and-mail-ids">
                    <p className="icons-in-dropdown">
                      <img
                        src={linkedin}
                        alt=""
                        className="select-icon-arrow"
                      />
                    </p>
                    <Tooltip
                      title={item.linkedin ? item.linkedin : "not available"}
                    >
                

                {item?.linkedin
                    ? item?.linkedin.length > 28
                      ? item?.linkedin.substr(28, 28) ||
                        item?.linkedin.length > 20 + "..."
                      : item?.linkedin
                    : "Not Available"}

                      
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip title={"Visit link"}>
                      <p
                        onClick={() =>
                          item?.linkedin && window?.open(item?.linkedin)
                        }
                      >
                        <img src={visitLinkImage} alt="" />
                      </p>
                    </Tooltip>
                  </div>
                </div>
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                className="buttons-of-the-list-item"
              >
                <ListItemText className="list-text-item" />
                <div className="email-id-and-paste">
                  <div className="inner-icons-and-mail-ids">
                    <p className="icons-in-dropdown">
                      <EmailOutlinedIcon className="select-icon-arrow" />
                    </p>
                    <Tooltip title={item.email ? item.email : "not available"}>
                      <p className="email-id-only-accordian">
                        {item?.email
                          ? item?.email.length > 27
                            ? item?.email.substr(0, 27) + "..."
                            : item?.email
                          : "Not Available"}
                      </p>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip title={clicked ? "Copyed" : "Copy"}>
                      <p onClick={() => handleCopy(item?.email)}>
                        <img src={copypaste} alt="" />
                      </p>
                    </Tooltip>
                  </div>
                </div>
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                className="buttons-of-the-list-item"
              >
                <ListItemText className="list-text-item" />
                <div className="email-id-and-paste">
                  <div className="inner-icons-and-mail-ids">
                    <p className="icons-in-dropdown">
                      <img src={phone} alt="" className="select-icon-arrow" />
                    </p>
                    <Tooltip
                      title={item.phone_no ? item.phone_no : "not available"}
                    >
                      <p className="email-id-only-accordian">
                        {item?.phone_no
                          ? item?.phone_no.length > 27
                            ? item?.phone_no.substr(0, 27) + "..."
                            : item?.phone_no
                          : "Not Available"}
                      </p>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip title={clicked ? "Copyed" : "Copy"}>
                      <p onClick={() => handleCopy(item?.phone_no)}>
                        <img src={copypaste} alt="" />
                      </p>
                    </Tooltip>
                  </div>
                </div>
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </div>
    </>
  );
}
