import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignIn from './SignIn';
import Home from './Home';
import MainLayout from './Components/MainLayout';
import User from './Pages/User';
import Category from './Pages/Category';
import ViewCtegory from './Pages/ViewCtegory';
import AddCategory from './Pages/AddCategory';
import EditCategory from './Pages/EditCategory';
import Post from './Pages/Post';
import AddPost from './Pages/AddPost';
import ViewPost from './Pages/ViewPost';
import EditPost from './Pages/EditPost';
import UserComment from './Pages/UserComment';
import AddUserComment from './Pages/AddUserComment';
import UpdatePassword from './Pages/UpdatePassword';
import UserCommentView from './Pages/UserCommentView';
import EditUserComment from './Pages/EditUserComment';
import ResendMail from './Pages/ResendMail';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/signIn" element={<SignIn />}></Route>
                <Route path="/mainLayout" element={<MainLayout />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/user" element={<User />}></Route>
                <Route path="/category" element={<Category />}></Route>
                <Route path="/viewCategory/:id" element={<ViewCtegory />}></Route>
                <Route path='/addCAtegory' element={<AddCategory />}></Route>
                <Route path='/editCategory/:id' element={<EditCategory />}></Route>
                <Route path='/post' element={<Post />}></Route>
                <Route path='/addpost' element={<AddPost />}></Route>
                <Route path='/viewpost/:id' element={<ViewPost />}></Route>
                <Route path='/editPost/:id' element={<EditPost />}></Route>
                <Route path='/comment' element={<UserComment />}></Route>
                <Route path="/addUserComment" element={<AddUserComment />}></Route>
                <Route path="/viewUserComment/:id" element={<UserCommentView />}></Route>
                <Route path='/editUserComment/:id' element={<EditUserComment />}></Route>
                <Route path='/resendmail' element={<ResendMail />}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes;