import { useCallback, useEffect, useState } from 'react'
import styles from '../Groups.module.css'
import Item from '../Item'
import Input from '../../../ui/Input'
import BtnImg from '../../../ui/BtnImg'
import BtnText from '../../../ui/BtnText'
import { GroupService } from '../../../../services/group.services.js'

const GroupItem = ({ group_id, addItem }) => {
	const [students, setStudents] = useState([])
	const [showResults, setShowResults] = useState([])
	const [changeInfo, setChangeInfo] = useState([])

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
			{addItem ? (
				<div>
				<div className={styles.block_item} onClick={e => showOnClick(e, null)}>
					<form action='' className={styles.item_form}>
						<div className={styles.btn_block}>
							<Input placeholder={'Имя'} disabled={true}/>
							<Input placeholder={'Фамилия'} disabled={true}/>
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
									<BtnImg src='/delete_white.svg' alt='Удалить' />
								</div>
							</form>
						</div>
						{(Array.isArray(showResults) ? showResults.includes(student.id) : false) ? <Item student_id={student.id} disabled={!changeInfo.includes(student.id)} setChangeInfo={setChangeInfo} /> : null}
					</div>
				))
			) : (
				<p>Empty</p>
			)}
		</div>
	)
}

export default GroupItem
