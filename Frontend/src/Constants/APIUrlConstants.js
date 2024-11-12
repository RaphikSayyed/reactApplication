import { apiBaseUrl } from "../Profiles/Profile";

const baseUrl = apiBaseUrl.dev

const APIUrl = {
    welcome: baseUrl + "welcome",
    addStudent: baseUrl + "addStudent",
    getAllStudents: baseUrl + "getAllStudents?page={pageNumber}&limit={limit}",
    getStudentById: baseUrl + "getStudentById/{id}",
    deleteStudent: baseUrl + "deleteStudent/{id}",
    updateStudent: baseUrl + "updateStudent",
    
    welcomeMarks: baseUrl + "welcomeMarks",
    addMarks: baseUrl + "addMarks",
    getMarksByStudentId: baseUrl + "getMarksByStudentID/{studentId}",
    updateMarksByStudentID: baseUrl + "updateMarksByStudentID",
    deleteMarksByStudentID: baseUrl + "deleteMarksByStudentID/{id}"
};


export default APIUrl;