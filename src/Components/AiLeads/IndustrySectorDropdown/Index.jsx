import * as React from "react";
import "./Style.css";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

export default function IndustryDropdown({ row }) {
  const categories = row?.categories?.split(",");
  const firstCategory = categories?.[0]?.trim();
  // const remainingCategoriesCount = categories && categories[0] ? `+${categories.length - 1}` : "Not Available";

  const remainingCategoriesCount = categories?.length === 1 && categories?.[0] !== "" ? null : categories?.length > 1 ? `+${categories.length - 1}`  : "Not Available"
  const allCategories = row?.categories;
  const categoriesArray = allCategories?.split(",");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="ContactDetailList-dropdown-industry">
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          className="list-main-container"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          <ListItemButton className="list-button-item-start">
            <ListItemText className="list-text-item" />
            <div>
              {firstCategory && remainingCategoriesCount ? (
                <p className="industry-text-dropdown-head-main-propect">

                  {firstCategory ? firstCategory.length > 10 ? `${firstCategory.substr(0, 10)}...` : firstCategory : "Not Available"}
                  {remainingCategoriesCount}
                </p>
              ) : (
                <p className="industry-text-dropdown-head-main-propect">
                  {firstCategory} {remainingCategoriesCount}
                </p>
              )}

              {/* <p className="industry-text-dropdown-head-main-propect">{firstCategory.substr(0,10) + "..."} {remainingCategoriesCount}</p> */}
            </div>
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              className="dropdownbox-main-container"
            >
              {categoriesArray?.map((item, index) => (
                <ListItemButton
                  key={index}
                  sx={{ pl: 4 }}
                  className="buttons-of-the-list-item"
                >
                  <ListItemText className="list-text-item" />
                  <p className="industry-detail-dropdowntext">{item}</p>
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      </div>
    </>
  );
}
