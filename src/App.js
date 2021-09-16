import React from "react";
import {Route, Switch} from "react-router-dom";

import Entrance from "./pages/Entrance";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import EditProfile from "./pages/EditProfile";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";
import ChangePassword from "./pages/ChangePassword";

function App() {
    return (
        <Layout>
            <Switch>
                <Route exact path='/' >
                    <Entrance/>
                </Route>
                <Route exact path='/change-password' >
                    <ChangePassword/>
                </Route>
                <Route path='/chat'>
                    <Chat/>
                </Route>
                <Route path='/calendar'>
                    <Calendar/>
                </Route>
                <Route exact path='/profile'>
                    <Profile/>
                </Route>
                <Route path='/profile/edit'>
                    <EditProfile/>
                </Route>
                <Route path='/settings'>
                    <Settings/>
                </Route>
                <Route path='*'>
                    <NotFound/>
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
