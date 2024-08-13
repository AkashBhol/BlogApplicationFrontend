import { Box, Button, Card, Grid, IconButton, TextField } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react"
import MainLayout from "../Components/MainLayout";
import { DataGrid } from "@mui/x-data-grid";
import MainContent from "../Components/MainContent";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AddIcon from '@mui/icons-material/Add';
import DataTable from "../Components/DataTable";

const Category = () => {
    const navigate = useNavigate();
    const [payload, setPayload] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const [rowCount, setRowCount] = useState(0);
    const [records, setRecords] = useState({
        title: "",
        description: "",
        date: ""
    })
    const [error, setError] = useState({
        title: "",
        description: "",
        date: ""
    })

    const handleChange = (event) => {
        const name = event.target.name;
        setRecords({
            ...records,
            [name]: event.target.value
        })
    }

    const [filters, setFilters] = useState({
        pageNumber: 0,
        pageSize: 8
    });

    const defaultFilters = {
        pageNumber: 0,
        pageSize: 8
    };

    const handlePageChange = (e) => {
        setPage(e)
    };

    const handlePageSize = (e) => {
        setFilters({
            ...defaultFilters,
            pageNumber: defaultFilters.pageNumber,
            pageSize: e,
        });
    };

    useEffect(() => {
        loadData(page, pageSize);
    }, [page, pageSize])

    const loadData = (page, pageSize) => {
        const request = {
            ...records,

        } 
        axios.post("http://localhost:8089/api/v2/get/all/category?page=" + page + "&pageSize=" + pageSize, request, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authToken")
            }
        }).then((res) => {
            console.log(res.data.data.objects);
            setPayload(res.data.data.objects);
            setRowCount(res.data.data.totalCount);
        })
    }

    const handleView = (id) => {
        console.log("View", id);
        navigate(`/viewCategory/${id}`)
    };

    const handleEdit = (id) => {
        navigate(`/editCategory/${id}`)
        console.log("Edit", id);
    };

    const handleDelete = (id) => {
        axios.delete("http://localhost:8089/api/v2/delete?id=" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authToken")
            }
        }).then((res) => {
            Swal.fire({
                icon: 'success',
                title: 'category deleted Successfully',
                showConfirmButton: false,
                timer: 3500
            });
            loadData(page, pageSize);
        })
    };

    const handleFilter = () => {
        loadData(0, 0);
    }
    const columns = [
        { field: "id", headerName: "id", width: 90 },
        { field: "title", headerName: "title", width: 150, editable: true },
        { field: "categoryDescriptions", headerName: "categoryDescriptions", width: 250, editable: true },
        { field: "date", headerName: "date", width: 350, editable: true },
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


    const Add = () => {
        navigate("/addCAtegory")
    }

    return (
        <MainContent title={"CATEGORY"}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <Card style={{ height: "100px" }}>
                        <Grid container spacing={2} alignItems="center" justifyContent="center" pt={3}>
                            <Grid container item xs={12} spacing={2} justifyContent="center">
                                <Grid item xs={2}>
                                    <TextField
                                        fullWidth
                                        id="title1"
                                        name="title"
                                        value={records?.title || null}
                                        onChange={handleChange}
                                        inputProps={{
                                            style: { height: "10px" }
                                        }}
                                        label="Title"
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        fullWidth
                                        id="description"
                                        value={records?.description || null}
                                        onChange={handleChange}
                                        inputProps={{
                                            style: { height: "10px" }
                                        }}
                                        label="CategoryDescription"
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        fullWidth
                                        id="date"
                                        value={records?.date || null}
                                        onChange={handleChange}
                                        inputProps={{
                                            style: { height: "10px" }
                                        }}
                                        placeholder="dd-mm-yyyy"
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="contained" color="primary" fullWidth onClick={handleFilter}>
                                        Find
                                    </Button>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button variant="contained" color="secondary" fullWidth>
                                        Reset
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>



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
                    onSelection={() => console.log("")}>
                </DataTable>
            </Box>
        </MainContent>
    )
}
export default Category;