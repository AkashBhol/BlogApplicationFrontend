import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Pagination, InputLabel, Select, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { ReactComponent as NoResultFound } from "../assets/images/no_result_found.svg";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useEffect } from "react";
import { ReactComponent as DownArrow } from "../assets/images/arrow_icon.svg";

const customDataGridStyle = {
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#ECECED!important",
    color: "#474B4F!important",
    borderRadius: "8px 8px 0px 0px",
  },
  ".MuiDataGrid-columnHeader:focus-within": { outline: "none" },
  ".MuiDataGrid-cell": { borderBottom: "0px", color: "#304669" },
  ".MuiDataGrid-cell:focus-within": {
    outline: "none!important",
    color: "#2faeed!important",
  },
  ".MuiDataGrid-columnSeparator": { display: "none !important" },
  ".MuiSvgIcon-root": { backgroundColor: "transparent" },
  ".MuiDataGrid-root": { padding: "8px", borderRadius: "4px" },
  ".MuiDataGrid-row": {
    borderBottom: "1px solid #E7EBF0",
    maxHeight: "48px!important",
    minHeight: "48px!important",
  },
  ".MuiCheckbox-root": { color: "#D1D1D1" },
  ".MuiDataGrid-cellContent": {
    color: "#2faeed!important",
    fontFamily: "Roboto",
    letterSpacing: "0.4px",
    fontSize: "14px",
  },
  ".MuiDataGrid-virtualScrollerRenderZone": { backgroundColor: "#FFFF" },
  ".MuiDataGrid-footerContainer": {
    display: "block",
    width: "100%",
    border: "0px",
  },
  ".MuiTablePagination-spacer": { display: "none" },
  ".MuiTablePagination-actions": {
    position: "absolute",
    right: "0px",
    backgroundColor: "#FFF",
  },
  ".MuiTablePagination-displayedRows": { position: "absolute", right: "90px" },
  ".MuiDataGrid-virtualScroller": { overflow: "auto" },
  ".MuiTablePagination-select": {
    backgroundColor: "#F0F1F4",
    borderRadius: "4px!important",
  },
  ".MuiTablePagination-toolbar": { paddingLeft: "0px" },
  ".MuiIconButton-root.Mui-disabled": {
    backgroundColor: "#F0F1F4",
    borderRadius: "0px",
  },
  ".MuiIconButton-root": { borderRadius: "0px" },
  ".Mui-checked": { color: "#2faeed!important" },
  ".MuiDataGrid-root": {
    height: "none !important",
  },
};
export default function DataTable(props) {
  const [loader, setLoader] = useState(false);

  const setLoaderFunction = () => {
    const isLoading = localStorage.getItem("isLoading");
    setLoader(isLoading === "true");
  };

  useEffect(() => {
    setLoader(true);
    const timerId = setTimeout(() => {
      setLoader(false);
      localStorage.setItem("isLoading", "false");
    }, 1500);

    window.addEventListener("storage", setLoaderFunction);
    return () => {
      clearTimeout(timerId);
      window.removeEventListener("storage", setLoaderFunction);
    };
  }, []);

  const theme = useTheme();
  const { t } = useTranslation();
  const getPageDetails = () => {
    var pageRange = "0 - 0 of 0";
    var page = props.page + 1;
    if (props.totalRecords > 0) {
      let lastRecordIndex = page * props.rowsPerPage;
      if (lastRecordIndex <= props.totalRecords) {
        let firstRecordIndex = lastRecordIndex - props.rowsPerPage + 1;
        pageRange =
          firstRecordIndex +
          "-" +
          lastRecordIndex +
          " of " +
          props.totalRecords;
      } else {
        let firstRecordIndex = lastRecordIndex - props.rowsPerPage + 1;
        pageRange =
          firstRecordIndex +
          "-" +
          props.totalRecords +
          " of " +
          props.totalRecords;
      }
    }
    return pageRange;
  };

  const noResultFound = (message) => {
    return (
      <div style={{ position: "relative", height: "100%" }}>
        <NoResultFound
          message={message}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    );
  };

  return (
    <Grid
      style={{
        overflowY: "visible",
        top: "315px",
        left: "360px",
        width: "auto",
        height: "450px",
        opacity: "1",
      }}
    >
      <DataGrid
        {...props}
        disableRowSelectionOnClick={props.disableRowSelectionOnClick}
        key={props.key}
        hideFooter="true"
        paginationMode="server"
        page={props.page}
        rows={props.rows}
        columns={props.columns}
        rowHeight={50}
        width="1530px"
        top="100px"
        left="360px"
        background="#ECECED 0% 0% no-repeat padding-box"
        border-radius=" 8px 8px 0px 0px"
        opacity="1"
        pagination
        rowCount={props.totalRecords}
        checkboxSelection={props.checkboxSelection}
        isRowSelectable={props.isRowSelectable}
        selectionModel={props.selectionModel}
        disableColumnMenu
        style={{ border: "none", maxHeight: "70vh" }}
        sx={customDataGridStyle}
        hideFooterSelectedRowCount={true}
        pageSize={props.rowsPerPage}
        onPageSizeChange={(newPageSize) => props.onPageSizeChange(newPageSize)}
        onRowSelectionModelChange={(params) => {
          props.onSelection(params);
        }}
        onPageChange={(params) => props.onPageChange(params)}
        components={{
          NoRowsOverlay: () =>
            noResultFound(
              props.noResultFoundMessage
                ? props.noResultFoundMessage
                : `${("No Record Found.")}`
            ),
        }}
        loading={loader}
      />
      {props.hidePagination === undefined && (
        <Grid
          sx={{
            display: { xs: "block", md: "flex" },
            pt: { xl: "120px", md: "10px" },
          }}
          justifyItems="center"
        >
          <Grid item flexGrow={1} pl={2} display="flex">
            <Grid pl={1} pt={1}>
              <InputLabel htmlFor="filled-age-native-simple">
                {t("No of Records Per Page")}
              </InputLabel>
            </Grid>
            <Grid pl={1}>
              <Select
                native
                size="small"
                value={props.rowsPerPage}
                //onChange={handleChange}
                inputProps={{
                  name: "age",
                  id: "filled-age-native-simple",
                }}
                sx={{
                  "& .MuiNativeSelect-select.MuiInputBase-input.MuiOutlinedInput-input":
                    {
                      padding: "6px",
                      paddingRight: "40px",
                      paddingLeft: "20px",
                      border: "0px solid #B9B9B9",
                    },
                  borderRadius: "5px",
                  backgroundColor: "#F5F6F6 ",

                  "&:hover": {
                    "&& fieldset": {
                      border: "0px solid #B9B9B9",
                    },
                  },
                }}
                IconComponent={(props) => (
                  <DownArrow
                    style={{
                      fontSize: "38px",
                      color: "#000",
                      backgroundColor: "none",
                      position: "absolute",
                      right: 0,
                      marginTop: "0px",
                      marginRight: "16px",
                    }}
                  />
                )}
                onChange={(e) => props.onPageSizeChange(e.target.value)}
              >
                <option value={8}>8</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                {/* <option value={props.rowsPerPage}>{props.rowsPerPage}</option> */}
              </Select>
            </Grid>
            <Box pl={1} pt={1}>
              <InputLabel htmlFor="filled-age-native-simple">
                {getPageDetails()}
              </InputLabel>
            </Box>
          </Grid>
          <Grid item pr={1} sx={{ pb: { xs: "10px", md: "0px" } }}>
            <Pagination
              count={Math.ceil(props.totalRecords / props.rowsPerPage)}
              sx={[
                () => ({
                  button: {
                    backgroundColor: "#F2F2F2",
                    color: "#637381",
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    border: "0px solid #B9B9B9",
                  },
                }),
                () => ({
                  ul: {
                    "& .Mui-selected": {
                     // background: "linear-gradient(45deg, #1487CA, #78BC27)",
                      color: "red",
                      backgroundColor:"gray"
                    },
                  },
                }),
                () => ({
                  ul: {
                    "&:hover": {
                      "& .Mui-selected": {
                        backgroundColor:
                          "transparent linear-gradient(270deg, #1487CA 0%, #78BC27 100%) 0% 0% no-repeat padding-box",
                      },
                    },
                  },
                }),
              ]}
              shape="rounded"
              page={props.page + 1}
              onChange={(e, v) => props.onPageChange(v - 1)}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
DataTable.defaultProps = {
  rows: [],
  columns: [],
};
