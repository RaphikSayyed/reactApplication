import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { APICall } from '../APIMethods/APIMethods';
import APIUrl from '../Constants/APIUrlConstants';
import './StudentList.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(5);

    useEffect(() => {
        fetchStudents();
    }, [currentPage, entriesPerPage]);

    const fetchStudents = async () => {
        const url = APIUrl.getAllStudents
            .replace('{pageNumber}', currentPage)
            .replace('{limit}', entriesPerPage)
            .replace('{searchQuery}', searchQuery);

        APICall(url, 'GET').then((res) => {
            setStudents(res.students);
            setTotalPages(res.totalPages);
        });
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
            closeButtonHtml: '<span aria-hidden="true">&times;</span>',
            customClass: {
                cancelButton: 'btn btn-secondary',
                confirmButton: 'btn btn-danger',
                closeButton: 'btn-close'
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    APICall(APIUrl.deleteStudent.replace('{id}', id), 'DELETE')
                        .then((res) => {
                            if (res.success) {
                                Swal.fire('Deleted!', res.message, 'success');
                                fetchStudents();
                            } else {
                                Swal.fire('OOPS!', res.message, 'danger');
                            }
                        });
                } catch (error) {
                    Swal.fire('Error', 'Could not delete student', 'error');
                }
            }
        });
    };

    const handleEdit = (student) => {
        Swal.fire({
            title: 'Edit Student',
            closeButtonHtml: '<span aria-hidden="true">&times;</span>',
            showCancelButton: true,
            cancelButtonText: 'Close',
            confirmButtonText: 'Submit',
            customClass: {
                cancelButton: 'btn btn-warning',
                confirmButton: 'btn btn-success',
                closeButton: 'btn-close'
            },
            html: `
                <label htmlFor="name">Name</label>
                <input id="name" class="swal2-input" value="${student.name}" placeholder="Name">
                <label htmlFor="email">Email</label>
                <input id="email" class="swal2-input" value="${student.email}" placeholder="Email">
                <label htmlFor="standard">Standard</label>
                <input id="standard" class="swal2-input" value="${student.standard}" placeholder="Standard">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const name = Swal.getPopup().querySelector('#name').value;
                const email = Swal.getPopup().querySelector('#email').value;
                const _id = student._id;
                const standard = Swal.getPopup().querySelector('#standard').value;
                return { _id, name, email, standard };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                APICall(APIUrl.updateStudent, 'PUT', result.value).then((res) => {
                    if(res.success){
                        Swal.fire('Updated!', res.message, 'success');
                        fetchStudents();
                    }else{
                        Swal.fire('OOPS!', 'something went wrong', 'warning');
                    }
                });
            }
        });
    };

    const handleAddStudent = () => {
        Swal.fire({
            title: 'Add New Student',
            showCloseButton: true,
            closeButtonHtml: '<span aria-hidden="true">&times;</span>',
            showCancelButton: true,
            cancelButtonText: 'Close',
            confirmButtonText: 'Submit',
            customClass: {
                cancelButton: 'btn btn-warning',
                confirmButton: 'btn btn-success',
                closeButton: 'btn-close'
            },
            html: `
                <label htmlFor="name">Name</label>
                <input id="name" class="swal2-input" placeholder="Name">
                <label htmlFor="email">Email</label>
                <input id="email" class="swal2-input" placeholder="Email">
                <label htmlFor="standard">Standard</label>
                <input id="standard" class="swal2-input" placeholder="Standard">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const name = Swal.getPopup().querySelector('#name').value;
                const email = Swal.getPopup().querySelector('#email').value;
                const standard = Swal.getPopup().querySelector('#standard').value;
                return { name, email, standard };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const newStudent = result.value;
                try {
                    APICall(APIUrl.addStudent, 'POST', newStudent).then((res) => {
                        if(res.success){
                            Swal.fire('Added!', res.message, 'success');
                            fetchStudents();
                        }else{
                            Swal.fire('OOPS!', 'something went wrong', 'warning');
                        }
                    });
                } catch (error) {
                    Swal.fire('Error', 'Could not add student', 'error');
                }
            }
        });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const filteredStudents = students.filter((student) => {
        return (
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const handleEntriesChange = (e) => {
        setEntriesPerPage(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="mt-3">
            <div className="d-flex justify-content-between mb-3">
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button className="btn btn-success" onClick={handleAddStudent}>Add Student</button>
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Standard</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {filteredStudents.length > 0 ? (
                    <tbody>
                        {filteredStudents.map((student) => (
                            <tr key={student._id}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.standard}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(student)}>Edit</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <div>No Data Found</div>
                )}
            </table>

            <div className='bottomMenu'>
                <div className='pageSize'>
                    <label htmlFor="entriesPerPage" className="form-label me-2">Show Entries:</label>
                    <select
                        id="entriesPerPage"
                        className="form-select"
                        value={entriesPerPage}
                        onChange={handleEntriesChange}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <button
                        className="btn btn-secondary me-2"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="align-self-center">Page {currentPage} of {totalPages}</span>
                    <button
                        className="btn btn-secondary ms-2"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentList;
