import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Pages/Back/Dashboard";
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from './Redux/actions/user';
import { getTheme } from './Redux/actions/theme';
import HomeAdmin from './Pages/Back/HomeAdmin';

import DisplayAllPosts from './Pages/Back/DisplayPosts';
import ManageUser from './Pages/Back/ManageUser';
import Index from './Pages/Front/index';
import ThemePersonalisation from './Pages/Back/ThmePersonalisation';
import Createpost from './Pages/Front/CreatePost';
import DisplayPost from './Pages/Front/DisplayPost';
import PendingPosts from './Pages/Back/PendingPosts';
import ProfileDashboard from './Pages/Front/ProfileDashboard';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const theme = useSelector((state) => state.themereducer.theme);
  useEffect(() => {
    const root = document.documentElement; // Select the root element
    root.style.setProperty('--primarycolor', theme.PrimaryColor);
    root.style.setProperty('--secondarycolor', theme.SecondaryColor);
    root.style.setProperty('--thirdcolor', theme.ThirdColor);
    root.style.setProperty('--fourthcolor', theme.FourthColor);
    root.style.setProperty('--Navigation-font-size', `${theme.NavigationFontSize}px`);
    root.style.setProperty('--title-font-size',  `${theme.TitleFontSize}px`);
    root.style.setProperty('--desc-font-size',  `${theme.SubTitleFontSize}px`);
  }, [theme])

useEffect(() => {
    dispatch(currentUser());
    dispatch(getTheme());
}, [dispatch]);
  return (
    <Routes>
      <Route path='/' element={<Index/>}></Route>
      <Route path='/Dashboard' element={<Dashboard/>} user={user}>
        <Route path='/Dashboard/' element={<HomeAdmin/>} />
        <Route path='/Dashboard/Users' element={<ManageUser/>} />
        <Route path='/Dashboard/PendingPosts' element={<PendingPosts/>} /> 
        <Route path="/Dashboard/DisplayAllPosts" element={<DisplayAllPosts />} /> 
        <Route path="/Dashboard/Theme" element={<ThemePersonalisation />} />                                 
      </Route>
      <Route path='/CreatePost' element={<Createpost/>}></Route>
      <Route path='/Post/:id' element={<DisplayPost/>}></Route>
      <Route path='/profile' element={<ProfileDashboard/>}>

      </Route>
    </Routes>
  );
}

export default App;
