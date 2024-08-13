import { Button, Dialog, DialogContent } from "@mui/material";
import UpdatePassword from "../Pages/UpdatePassword";
import { useState } from "react";

const Sidebar = () => {
    const [open, setOpen]= useState(false);

    const handlePopUp = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
        <div className="sidebar">
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/user">User</a></li>
                <li><a href="/category">Category</a></li>
                <li><a href="/post">Post</a></li>
                <li><a href="/comment">Comment</a></li>
            </ul>
            <ul>
                <li><Button onClick={handlePopUp}>UpdatePassword</Button></li>
            </ul>
        </div>
        <Dialog open={open} onClick={handlePopUp} onClose={handleClose}>
            <DialogContent>
                <UpdatePassword open={open} setOpen={setOpen}/>
            </DialogContent>
        </Dialog>
        </>
    )
}
export default Sidebar;