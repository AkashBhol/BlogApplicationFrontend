import { Box, Grid, IconButton } from "@mui/material";
import MainContent from "../Components/MainContent";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import Swal from "sweetalert2";
import DataTable from "../Components/DataTable";
const Post = () => {
    const [payload, setPayload] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const [rowCount, setRowCount] = useState(0);
    const navigate = useNavigate();
    //for pagination
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

    const Add = () => {
        navigate("/addpost")
    }

    useEffect(() => {
        loadData(page, pageSize);
    }, [page, pageSize])

    const loadData = (page, pageSize) => {
        axios.get("http://localhost:8089/api/v2/get/post?page=" + page + "&pageSize=" + pageSize, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authToken")
            }
        }).then((res) => {
            setPayload(res?.data?.data?.objects)
            setRowCount(res?.data?.data?.totalCount);

        })
    }
    const handleView = (id) => {
        navigate(`/ViewPost/${id}`)
    }
    const handleEdit = (id) => {
        navigate(`/editPost/${id}`)
    }
    const handleDelete = (id) => {
        axios.delete("http://localhost:8089/api/v2/delete/post?id=" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authToken")
            }
        }).then((res) => {
            Swal.fire({
                icon: 'success',
                title: 'User Login Successfully',
                showConfirmButton: false,
                timer: 3500
            });
            loadData();
        })
    }
    const columns = [
        { field: "id", headerName: "id", width: 90 },
        { field: "content", headerName: "content", width: 150, editable: true },
        { field: "about", headerName: "about", width: 450, editable: true },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => (
                <div>
                    <IconButton onClick={() => handleView(params.row.id)}>
                        <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(params.row.id)}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <Delete />
                    </IconButton>
                </div>
            )
        }
    ]
    return (
        <MainContent title={"POST"}>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <IconButton>
                        <AddIcon onClick={Add} />
                    </IconButton>
                </Grid>
            </Grid>
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
export default Post;