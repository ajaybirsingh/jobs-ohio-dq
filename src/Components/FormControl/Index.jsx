import React, { useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  Radio,
  FormControlLabel,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const FormControlSelect = ({
  formControlData: {
    value,
    handleChange,
    selectedData,
    handleCheckboxChange,
    dataList,
    checked,
    isRevenue,
    type,
    dataListType,
  },
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  if (!dataList) {
    return (
      <FormControl disabled sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={value}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          IconComponent={KeyboardArrowDownIcon}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
          }}
        >
          <MenuItem className="hidedata" value="">
            <em>{placeholder}</em>
            {selectedData?.length === 0 ? (
              <p>Select</p>
            ) : (
              <p>{selectedData?.length} Selected</p>
            )}
          </MenuItem>
        </Select>
      </FormControl>
    );
  }
  return (
    <FormControl
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      sx={{ m: 1, minWidth: 120 }}
    >
      <Select
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        value={value}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        IconComponent={KeyboardArrowDownIcon}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        }}
      >
        <MenuItem className="hidedata" value="">
          <em>{placeholder}</em>
          {selectedData?.length === 0 ? (
            <p>Select</p>
          ) : (
            <p>{selectedData?.length} Selected</p>
          )}
        </MenuItem>
        <div className="AI-leade-checkbox-and-data-list-outter">
          <div>
            {dataList &&
              dataList.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="AI-leade-checkbox-and-data-list">
                      <div  className="checkbox-select-data">
                     
                        <FormControlLabel
                       
                          control={
                            <Checkbox
                            checked={checked.includes(item)}
                              value={item}
                              onChange={(event) =>
                                handleCheckboxChange(event, item)
                              }
                              className="checkbox-green"
                              color="success"
                            />
                          }
                          
                          label={
                        <MenuItem className="menuitems">
                           { 
                            dataListType === "josf_status"
                              ? item === "True"
                                ? "In Salesforce"
                                : " Not In Salesforce"
                              : dataListType === "decision_maker"
                              ? item === "True"
                                ? "Decision Maker"
                                : "Non-Decision Maker"
                              : item}
                        </MenuItem>
                          }
                        />
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      </Select>
    </FormControl>
  );
};
export default FormControlSelect;

// import React, { useState } from "react";
// import FormLabel from '@mui/material/FormLabel';
// import RadioGroup from '@mui/material/RadioGroup';

// import {
//   FormControl,
//   Select,
//   MenuItem,
//   Checkbox,
//   Radio,
//   FormControlLabel,
// } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// const FormControlSelect = ({
//   formControlData: {
//     value,
//     handleChange,
//     selectedData,
//     handleCheckboxChange,
//     dataList,
//     checked,
//     isRevenue,
//     type,
//     dataListType,
//   },
//   placeholder,
// }) => {
//   const [open, setOpen] = useState(false);
//   if (!dataList) {
//     return (
//       <FormControl disabled sx={{ m: 1, minWidth: 120 }}>
//         <Select
//           value={value}
//           onChange={handleChange}
//           displayEmpty
//           inputProps={{ "aria-label": "Without label" }}
//           IconComponent={KeyboardArrowDownIcon}
//           MenuProps={{
//             anchorOrigin: {
//               vertical: "bottom",
//               horizontal: "left",
//             },
//             transformOrigin: {
//               vertical: "top",
//               horizontal: "left",
//             },
//           }}
//         >
//           <MenuItem className="hidedata" value="">
//             <em>{placeholder}</em>
//             {selectedData?.length === 0 ? (
//               <p>Select</p>
//             ) : (
//               <p>{selectedData?.length} Selected</p>
//             )}
//           </MenuItem>
//         </Select>
//       </FormControl>
//     );
//   }
//   return (
//     <FormControl
//       onMouseEnter={() => setOpen(true)}
//       onMouseLeave={() => setOpen(false)}
//       sx={{ m: 1, minWidth: 120 }}
//     >
//       <Select
//         open={open}
//         onClose={() => setOpen(false)}
//         onOpen={() => setOpen(true)}
//         value={value}
//         onChange={handleChange}
//         displayEmpty
//         inputProps={{ "aria-label": "Without label" }}
//         IconComponent={KeyboardArrowDownIcon}
//         MenuProps={{
//           anchorOrigin: {
//             vertical: "bottom",
//             horizontal: "left",
//           },
//           transformOrigin: {
//             vertical: "top",
//             horizontal: "left",
//           },
//         }}
//       >
//         <MenuItem className="hidedata" value="">
//           <em>{placeholder}</em>
//           {selectedData?.length === 0 ? (
//             <p>Select</p>
//           ) : (
//             <p>{selectedData?.length} Selected</p>
//           )}
//         </MenuItem>
//         <div className="AI-leade-checkbox-and-data-list-outter">
//           <div>
//             {dataList &&
//               dataList.map((item, index) => {
//                 return (
//                   <React.Fragment key={index}>
//                     <div className="AI-leade-checkbox-and-data-list">
//                       <div  className="checkbox-select-data">
//                      { dataListType === "josf_status" ||
//                             dataListType === "decision_maker" ? <>
//                                <FormControl>
//       <RadioGroup
//          aria-labelledby="demo-radio-buttons-group-label"
//          value={value} 
//          name="radio-buttons-group"
//          onChange={handleChange} 
//       >
//         <FormControlLabel  value={item} control={<Radio />} label={
//                      <MenuItem className="menuitems">
//                         { 
//                          dataListType === "josf_status"
//                            ? item === "True"
//                              ? "In Salesforce"
//                              : " Not In Salesforce"
//                            : dataListType === "decision_maker"
//                            ? item === "True"
//                              ? "Decision Maker"
//                              : "Non-Decision Maker"
//                            : item}
//                      </MenuItem>
//                        } />
        
//       </RadioGroup>
//     </FormControl>
                    
//                             </>  : 
//                             <>
//                                 <FormControlLabel
                       
//                        control={
//                          <Checkbox
//                            checked={checked?.find((i) => i === item)}
//                            value={item}
//                            onChange={(event) =>
//                              handleCheckboxChange(event, item)
//                            }
//                            className="checkbox-green"
//                            color="success"
//                          />
//                        }
                       
//                        label={
//                      <MenuItem className="menuitems">
//                         { 
//                          dataListType === "josf_status"
//                            ? item === "True"
//                              ? "In Salesforce"
//                              : " Not In Salesforce"
//                            : dataListType === "decision_maker"
//                            ? item === "True"
//                              ? "Decision Maker"
//                              : "Non-Decision Maker"
//                            : item}
//                      </MenuItem>
//                        }
//                      />
//                             </>}
                    
//                       </div>
//                     </div>
//                   </React.Fragment>
//                 );
//               })}
//           </div>
//         </div>
//       </Select>
//     </FormControl>
//   );
// };
// export default FormControlSelect;