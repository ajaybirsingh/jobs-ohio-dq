import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
const FormControlProfile = ({ value, handleChange, dataList, placeholder, isRevenue,disabled
}) => {
  // if (!dataList) {
  //   return (
  //     <FormControl disabled sx={{ m: 1, minWidth: 120 }} className="Limit-people-per-company">
  //       <Select
  //         displayEmpty
  //         inputProps={{ "aria-label": "Without label" }}
  //         className="select-dropdown-leads"
  //         value={value}
  //         onChange={handleChange}
  //         placeholder={placeholder}
  //       >
  //         <MenuItem value="" disabled className="heading-placeholder">
  //           <em className="placeholder-heading">Select</em>
  //         </MenuItem>
  //       </Select>
  //     </FormControl>
  //   );
  // }

  return (

    <FormControl sx={{ m: 1, minWidth: 120 }} className="Limit-people-per-company">
    <Select
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
      className="select-dropdown-leads"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
    >
      <MenuItem value="" disabled className="heading-placeholder">
        <em className="placeholder-heading">Select </em>
      </MenuItem>
      {dataList &&
        dataList.map((item, index) => {
          return (
            <MenuItem
              key={index}
              value={item}
              className="listing-select-data-leads"
            >
              {item}
            </MenuItem>
          );
        })}
    </Select>
  </FormControl>

  
    // <FormControl sx={{ m: 1, minWidth: 120 }} className="Limit-people-per-company">
    //   <Select
    //     displayEmpty
    //     inputProps={{ "aria-label": "Without label" }}
    //     className="select-dropdown-leads"
    //     value={value}
    //     onChange={handleChange}
    //     placeholder={placeholder}
    //   >
    //     <MenuItem value="" disabled className="heading-placeholder">
    //       <em className="placeholder-heading">Select </em>
    //     </MenuItem>
    //     {dataList &&
    //       dataList.map((item, index) => {
    //         const matches = item.match(/\d+(\.\d+)?/g);
    //         let formattedRevenue = item;
    //         if (matches && matches.length === 2) {
    //           const revenue1 = parseFloat(matches[0]);
    //           const revenue2 = parseFloat(matches[1]);
    //           if (item.includes('B')) {
    //             formattedRevenue = `${revenue1}B - ${revenue2}B`;
    //           } else if (item.includes('M')) {
    //             formattedRevenue = `${revenue1}M - ${revenue2}M`;
    //           }
    //         }
    //         return (
    //           <MenuItem
    //             key={index}
    //             value={item}
    //             className="listing-select-data-leads"
    //           >
    //             {isRevenue ? formattedRevenue : item}
    //           </MenuItem>
    //         );
    //       })}
    //   </Select>
    // </FormControl>
  );
};
export default FormControlProfile;