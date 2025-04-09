import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Courses from './components/Courses';
import Btech from './components/Btech';
import Mtech from './components/Mtech';
import Mba from './components/Mba';
import SideBar from './components/SideBar';
import { MenuContext, menu } from './context/MenuContext';
import BottomNav from './components/BottomNav';
import CollegeList from './components/CollegeList';
import LectureCategory from './components/Lectures/LectureCategory';
import LecturePlaylist from './components/Lectures/LecturePlaylist';
import Lectures from './components/Lectures/Lectures';
import LectureVideos from './components/Lectures/LectureVideos';
import GoogleDriveFiles from './components/Lectures/GoogleDriveFiles';
import NotesFolder from './components/Notes/NotesFolder';
import Notes from './components/Notes/Notes';
import LecturePlaylistView from './components/Lectures/LecturePlalistView';
import TopColleges from './components/TopColleges';
import HelpDesk from './components/HelpDesk';
import Login from './components/Login';
import Register from './components/Register';
import AuthProvider from './context/AuthProvider';
import Profile from './components/Profile';

const App = () => {
  const [openHam, setOpenHam] = useState(menu.open);

  function toggleMenu() {
    openHam === menu.open ? setOpenHam(!menu.open) : setOpenHam(menu.open)
  }

  return (
    <MenuContext.Provider value={{ openHam, toggleMenu, setOpenHam }}>
      <Router>
        <AuthProvider>
          <SideBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/btech" element={<Btech />} />
            <Route path="/mtech" element={<Mtech />} />
            <Route path="/mba" element={<Mba />} />
            <Route path="/collegelist" element={<CollegeList />} />
            <Route path="/lectures" element={<Lectures />} />
            <Route path="/lectures/:category" element={<LectureCategory />} />
            <Route path="/lectures/:category/:playlist" element={<LecturePlaylist />} />
            <Route path="/lectures/:category/:playlist/:playlistId" element={<LecturePlaylistView />} />
            <Route path="/lectures/:category/:playlist/:playlistId/:videoId" element={<LectureVideos />} />
            <Route path="/notes/:folderId" element={<NotesFolder />} />
            <Route path="/notes/:folderId/:notesFolderId" element={<Notes />} />
            <Route path="/drive" element={<GoogleDriveFiles />} />
            <Route path="/topcolleges" element={<TopColleges />} />
            <Route path="helpdesk" element={<HelpDesk />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
          <BottomNav />
        </AuthProvider>
      </Router>
    </MenuContext.Provider>
  );
};

export default App;
