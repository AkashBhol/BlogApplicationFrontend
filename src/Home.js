import { Box, Grid, paginationClasses } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import MainContent from "./Components/MainContent";

const Home = () => {
    const data = [{ id: 1, name: "Akash" },
    { id: 2, name: "Akash" },
    { id: 2, name: "Akash" },
    { id: 2, name: "Akash" },
    { id: 2, name: "Akash" },
    { id: 2, name: "Akash" },
    { id: 2, name: "Akash" },
    { id: 2, name: "Akash" },
    { id: 2, name: "Akash" },
    { id: 2, name: "Akash" },
    { id: 2, name: "Akash" },
    { id: 2, name: "Akash" },
    { id: 2, name: "Akash" },
    { id: 2, name: "Akash" },
    { id: 2, name: "Akash" }
]
    const columns =
        [{ field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name', headerName: 'First name',
            width: 150, editable: true,
        },]
    return (
    <MainContent title={"Home"} >
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                pageSizeOptions={[5, 10, 15, 20]} >
            </DataGrid>
        </Box>
    </MainContent>)
}
export default Home;