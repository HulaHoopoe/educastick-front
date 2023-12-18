import axios from "axios";

export const TestService = {
    async getTests() {
        const response = await axios.get('http://localhost:3000/tests')

        return response.data
    },

    async getQuestions(id) {
			const test_question = await axios.get(`http://localhost:3000/test-question?id_test=${id}`)
			const questions = await axios.get(`http://localhost:3000/questions`)
			return questions.data.filter((element) => test_question.data.some(e => e.id_question === element.id))
    },

    async getAnswers(id) {
        const question_answer = await axios.get(`http://localhost:3000/question-answer?id_question=${id}`)
        const answers = await axios.get(`http://localhost:3000/answers`)
        return answers.data.filter((element) => question_answer.data.some(e => e.id_answer === element.id))
},

    async getMaxQuestionId(){
        const questions = await axios.get(`http://localhost:3000/questions`)
        let maxId = 0
        questions.data.map(value => value.id > maxId ? maxId = value.id : maxId = maxId)

        return maxId
        
    },

    async getMaxAnswerId(){
        const answers = await axios.get(`http://localhost:3000/answers`)
        let maxId = 0
        answers.data.map(value => value.id > maxId ? maxId = value.id : maxId = maxId)

        return maxId        
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
    },

    async addStudent(student, group_id) {
        const studentAdd = await axios.post(`http://localhost:3000/students`, student)
        const group_studentAdd = await axios.post(`http://localhost:3000/group-student`, {group_id: group_id, student_id: 6})
        
        return studentAdd.data
    }
}