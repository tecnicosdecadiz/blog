import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
} from 'react-router-dom';
import HomeScreen from './User/Screens/HomeScreen';
import BlogScreen from './User/Screens/BlogScreen';
import UserHeader from './User/Layout/UserHeader';
import AdminLoginScreen from './Admin/Screens/AdminLoginScreen';
import AdminHomeScreen from './Admin/Screens/AdminHomeScreen';
import AddPostScreen from './Admin/Screens/AddPostScreen';
import EditPostScreen from './Admin/Screens/EditPostScreen';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UserHeader />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/blog/:blogId" element={<BlogScreen />} />
      </Route>

      <Route path="/admin" element={<AdminLoginScreen />}>
        <Route path="/admin" element={<AdminHomeScreen />} />
        <Route path="/admin/newPost" element={<AddPostScreen />} />
        <Route path="/admin/editPost/:blogId" element={<EditPostScreen />} />
      </Route>
    </Routes>
  );
}
