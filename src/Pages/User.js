import axios from "axios";
import { useEffect, useState } from "react";
import MainContent from "../Components/MainContent";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DataTable from "../Components/DataTable";

const User = () => {
    const [payload, setPayload] = useState([]);
    //for pagination
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const [rowCount, setRowCount] = useState(0);
    const [filters, setFilters] = useState({
        pagNumber: 0,
        pageSize: 8
    })

    const defaultFilters = {
        pagNumber: 0,
        pageSize: 8
    }

    const handlePageChange = (e) => {
        setPage(e)
    }
    const handlePageSize = (e) => {
        setFilters({
            ...defaultFilters,
            pagNumber: defaultFilters.pagNumber,
            pageSize: e,
        })
    }
    const [error, setError] = useState({
        email: "",
        password: "",
        name: "",
        about: ""
    })
    useEffect(() => {
        loadData(page, pageSize);
    }, [page, pageSize])
    const loadData = (page, pageSize) => {
        axios.get("http://localhost:8089/api/v2/get/all?page=" + page + "&pageSize=" + pageSize, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authToken")
            }
        }).then((res) => {
            setPayload(res?.data?.data?.objects);
            setRowCount(res?.data?.data?.totalCount);
        })
    }

    const columns = [{ field: "id", headerName: "id", width: 90 },
    { field: "name", headerName: "name", width: 150, editable: true },
    { field: "email", headerName: "email", width: 150, editable: true },
    { field: "password", headerName: "password", width: 150, editable: true }
    ]

    const getId = row => row.id;
    return (
        <MainContent title={"USER"}>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataTable
                    rows={payload}
                    columns={columns}
                    page={page}
                    totalRecords={rowCount}
                    rowsPerPage={pageSize}
                    onPageChange={(pn) => handlePageChange(pn)}
                    onPageSizeChange={(ps) => handlePageSize(ps)}
                    onSelection={() => console.log("")}
                >
                </DataTable>
            </Box>
        </MainContent>
    )
}
export default User;