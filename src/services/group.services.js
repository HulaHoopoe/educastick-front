import axios from "axios";

export const GroupService = {
    async getGroups() {
        const response = await axios.get('http://localhost:3000/groups')
        const group_student = await axios.get(`http://localhost:3000/group-student`)

        response.data.forEach(group => {
            group.students_count = group_student.data.filter(e => e.group_id == group.id).length
        });

        return response.data
    },

    async getGroupLength(id) {
        const group_student = await axios.get(`http://localhost:3000/group-student?group_id=${id}`)

        return group_student.data.length
    },

    async getGroupById(id) {
        const response = await axios.get(`http://localhost:3000/groups?id=${id}`)

        return response.data[0]
    },

    async getStudentsByGroup(id) {
        const group_student = await axios.get(`http://localhost:3000/group-student?group_id=${id}`)
        const students = await  axios.get(`http://localhost:3000/students`)
        return students.data.filter((element) => group_student.data.some(e => e.student_id === element.id))
    },

    async getStudent(id) {
        const response = await axios.get(`http://localhost:3000/students?id=${id}`)
        
        return response.data[0]
    }
}