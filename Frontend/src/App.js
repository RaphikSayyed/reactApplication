import React, { useState } from 'react';
import StudentList from './Components/StudentList';

const App = () => {
    // const [currentStudent, setCurrentStudent] = useState(null);
    // const [refreshList, setRefreshList] = useState(false);

    // const handleEditStudent = (student) => {
    //     setCurrentStudent(student);
    // };

    return (
        <div className="container mt-5">
            <h2>Student Management</h2>
            <StudentList />
        </div>
    );
};

export default App;
