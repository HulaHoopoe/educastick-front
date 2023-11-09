import { useCallback, useEffect, useState, useContext, createContext } from 'react'
import styles from '../Groups.module.css'
import Item from '../Item'
import Input from '../../../ui/Input'
import BtnImg from '../../../ui/BtnImg'
import BtnText from '../../../ui/BtnText'
import { GroupService } from '../../../../services/group.services.js'
import { AddItemContext } from '../Groups'

export const StudentsContext = createContext(null);

const GroupItem = ({ group_id }) => {
	const { addItem, setAddItem } = useContext(AddItemContext)
	const [students, setStudents] = useState([])
	const [showResults, setShowResults] = useState([])
	const [changeInfo, setChangeInfo] = useState([])

	const deleteItem = (e, id) => {
		setStudents(students.filter(value => value.id != id))
		e.stopPropagation()
	}

	const clearStudents = useCallback(
		() => () => {
			setStudents([])
		},
		[students]
	)

	useEffect(() => {
		const fetchData = async () => {
			const data = await GroupService.getStudentsByGroup(group_id)

			setStudents(data)			
		}

		fetchData()

		return clearStudents
	}, [])

	const showOnClick = (e, key) => {
		console.log(students)
		e.preventDefault
		showResults.includes(key) ? setShowResults(prev => prev.filter(value => value != key)) : setShowResults(prev => [...prev, key])
	}

	const changeStudentInfo = (e, key) => {
		changeInfo.includes(key) ? setChangeInfo(prev => prev.filter(value => value != key)) : setChangeInfo(prev => [...prev, key])
		e.stopPropagation()
	}

	const clearResults = useCallback(
		() => () => {
			setShowResults([])
		},
		[showResults]
	)

	return (
		<div>     
			<StudentsContext.Provider
            value={{
							students,
							setStudents,
            }}
        >   
			{addItem ? (
				<div>
				<div className={styles.block_item} onClick={e => showOnClick(e, null)}>
					<form action='' className={styles.item_form}>
						<div className={styles.btn_block}>
							<Input placeholder={'Новый ученик'} disabled={true}/>
							<Input placeholder={'Новый ученик'} disabled={true}/>
						</div>
						<div className={styles.btn_block}>
						</div>
					</form>
				</div>
				
				<Item disabled={false} setChangeInfo={setChangeInfo} />
			
			</div>
			) : null}
			{students.length ? (
				students.map(student => (
					<div key={student.id}>
						<div className={styles.block_item} onClick={e => showOnClick(e, student.id)}>
							<form action='' className={styles.item_form}>
								<div className={styles.btn_block}>
									<Input placeholder={'Имя'} value={student.name} disabled={true}/>
									<Input placeholder={'Фамилия'} value={student.surname} disabled={true}/>
								</div>
								<div className={styles.btn_block}>
									<BtnImg src='/edit_white.svg' alt='Изменить' onClick={e => changeStudentInfo(e, student.id)} 
									disabled={changeInfo.includes(student.id)} />
									<BtnImg src='/delete_white.svg' alt='Удалить' onClick={e => deleteItem(e, student.id)} />
								</div>
							</form>
						</div>
						{(Array.isArray(showResults) ? showResults.includes(student.id) : false) ? <Item studentInfo={student} disabled={!changeInfo.includes(student.id)} setChangeInfo={setChangeInfo} /> : null}
					</div>
				))
			) : (
				<p>Empty</p>
			)}
			</StudentsContext.Provider>
		</div>
	)
}

export default GroupItem
