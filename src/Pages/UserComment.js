import { Button, Dialog, DialogActions, DialogTitle, Grid, IconButton } from "@mui/material";
import MainContent from "../Components/MainContent";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from "react-router-dom";
import DataTable from "../Components/DataTable";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { deleteComment, getAllComment } from "../Servive/UserCommentService";
import { enqueueSnackbar } from "notistack";

const UserComment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [payload, setPayload] = useState([]);
    const [comments, setComments] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    //pagination
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
    const Add = () => {
        navigate("/addUserComment");
    }

    const handleView = (id) => {
        navigate(`/viewUserComment/${id}`)
    }

    const handleDelete = (id) => {
        setSelectedId(id);
        setOpenDialog(true);
    }
    const handleDeleteConfirm = () => {
        if (selectedId !== null) {
            deleteComment(selectedId).then((res) => {
                enqueueSnackbar("Comment Deleted SuccessFully", { variant: "success" })
            })
            setOpenDialog(false);
        }
    }

    const handleDeleteCancel = () => {
        setOpenDialog(false);
    }

    const handleEdit = (id) => {
        navigate(`/editUserComment/${id}`)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllComment(page, pageSize);
                setPayload(res?.data?.data?.objects || []);
                setRowCount(res?.data?.data?.totalCount);
            } catch (error) {
                console.error('Failed to fetch comments:', error);
            }
        };
        fetchData();
    }, [page, pageSize]);

    useEffect(() => {
        if (payload.length > 0) {
            const processedComments = payload.map(item => ({
                id: item.cid,
                comment: item.comment
            }));
            setComments(processedComments);
        }
    }, [payload]);

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "comment", headerName: "Comment", width: 250 },
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
    ];

    return (
        <MainContent title="Comment">
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <IconButton onClick={Add}>
                        <AddIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <DataTable
                columns={columns}
                rows={comments}
                page={page}
                totalRecords={rowCount}
                rowsPerPage={pageSize}
                onPageChange={(pn) => handlePageChange(pn)}
                onPageSizeChange={(ps) => handlePageSize(ps)}
                onSelection={() => console.log("")}
            // onSelection={(selection) => {
            //     console.log('Row selection:', selection);
            // }}
            />
            <Dialog open={openDialog} onClose={handleDeleteCancel}>
                <DialogTitle>Are you sure To delete Record</DialogTitle>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </MainContent>
    );
}

export default UserComment;
