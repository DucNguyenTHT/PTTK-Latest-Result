import React from 'react';
import Sidebar from './components/layout/sidebar/Sidebar';
import Navbar from './components/layout/navbar/Navbar';
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import AppState from './context/Appfeature/AppState';
import StudentState from './context/ManageStudent/StudentState'
import TeacherState from './context/ManagerTeacher/TeacherState';
import DepartmentState from './context/ManagerDepartment/DepartmentState';
import MajorState from './context/ManagerMajor/MajorState';
import StudentMajorState from './context/ManagerStudentMajor/StudentMajorState'
import TeacherDepartmentState from './context/ManagerTeacherDepartment/TeacherDepartmentState'
import AuthState from './context/Auth/AuthState';
import ManageTopicState from './context/ManageTopic/ManageTopicState'


import ManageStudent from './components/page/manageStudent/ManageStudent';
import ManageTeacher from './components/page/manageTeacher/ManageTeacher';
import ManageDepartment from './components/page/manageDepartment/ManageDepartment';
import ManageMajor from './components/page/manageMajor/ManageMajor';
import ManageStudentMajor from './components/page/manageStudentMajor/ManageStudentMajor';
import ManagerTeacherDeparment from './components/page/manageTeacherDepartment/ManageTeacherDepartment';
import Profile from './components/page/profile/Profile'
import Auth from './components/auth/Auth';
import ManageTopic from './components/page/manageTopic/ManageTopic'

import PrivateRoute from './components/private/PrivateRoute'
import StudentRegisterTopic from './components/page/StudentRegisterTopic/StudentRegisterTopic';
import TeacherGetAccept from './components/page/TeacherGetAccept/TeacherGetAccept'
import ManageStudentRegisterTopicState from './context/ManageStudentRegisterTopic/ManageStudentRegisterTopicState';
import ManageStudentStatus from './components/page/manageStudentStatus/ManageStudentStatus'
function App() {
  return (
    <AuthState>
      <TeacherState>
        <StudentState>
          <DepartmentState>
            <MajorState>
              <StudentMajorState>
                <TeacherDepartmentState>
                  <ManageTopicState>
                    <ManageStudentRegisterTopicState>
                      <AppState>
                      <BrowserRouter>
                      <Switch>
                        <Route exact path='/login' component={Auth}/>
                        <div className="app">
                              <Sidebar/>
                              <div className="right">
                                <Navbar/>
                                <PrivateRoute exact path='/' component={Profile}/>
                                <Route exact path='/crudtopic' component = {ManageTopic}/>
                                <Route exact path='/sldepartmentteacher' component={ManagerTeacherDeparment}/>
                                <Route exact path='/slmajorstudent' component={ManageStudentMajor}/>
                                <Route exact path='/crudmajor' component={ManageMajor}/>
                                <Route exact path='/cruddepartment' component={ManageDepartment}/>
                                <Route exact path='/crudstudent' component={ManageStudent}/>
                                <Route exact path='/crudteacher' component={ManageTeacher}/>
                                <Route exact path='/studentRegisterTopic' component={StudentRegisterTopic}/>
                                <Route exact path='/acceptregister' component={TeacherGetAccept}/>
                                <Route exact path='/registerstatus' component={ManageStudentStatus}/>
                              </div>
                        </div>
                        </Switch>
                      </BrowserRouter>
                      </AppState>
                    </ManageStudentRegisterTopicState>
                  </ManageTopicState>
                </TeacherDepartmentState>
              </StudentMajorState>
            </MajorState>
          </DepartmentState>
        </StudentState>
      </TeacherState>
    </AuthState>
  );
}

export default App;
