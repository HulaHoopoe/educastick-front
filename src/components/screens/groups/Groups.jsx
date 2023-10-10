import Header from '../../ui/Header.jsx'
import Footer from '../../ui/Footer.jsx'
import Input from '../../ui/Input.jsx'
import BtnText from '../../ui/BtnText.jsx'
import styles from './Groups.module.css'
import { useCallback, useEffect, useState } from 'react'
import { GroupService } from '../../../services/group.services.js'
import GroupItem from './group-item/GroupItem.jsx'
import BtnImg from '../../ui/BtnImg.jsx'

const Groups = () => {
	const [groups, setGroups] = useState([])
	const [showResults, setShowResults] = useState([])
	const [addItem, setAddItem] = useState(false)

	const showOnClick = (e, key) => {
		e.preventDefault
		showResults.includes(key) ? setShowResults(prev => prev.filter(value => value != key)) : setShowResults(prev => [...prev, key])
	}

	const addStudent = (e) => {
		setAddItem(true)

		e.stopPropagation()
	}

	const clearGroups = useCallback(
		() => () => {
			setGroups([])
		},
		[groups]
	)

	const clearResults = useCallback(
		() => () => {
			setShowResults([])
		},
		[showResults]
	)

	useEffect(() => {
		const fetchData = async () => {
			const data = await GroupService.getGroups()
			
			// data.forEach(function(group){
			// 	// const students_count = GroupService.getGroupLength(group.id)
			// 	// group.students_count = students_count
			// 	GroupService.getGroupLength(group.id).then(
			// 		res => group.students_count = res)
			// 	})
			setGroups(data)
		}

		fetchData()

		return clearGroups
	}, [])

	return (
		<div>
			<Header />
			{groups.length ? (
				groups.map(group => (
					<div key={group.id}>
						<div className={styles.block_item} onClick={e => showOnClick(e, group.id)}>
							<form action=''  className={styles.item_form}>
								<div className={styles.btn_block}>
									<Input placeholder={'Наиманование группы'} value={group.name} disabled={true}/>
									<Input placeholder={'Количество человек'} value={group.students_count} 
									disabled={true} />
								</div>
								<div className={styles.btn_block}>
									<BtnText text='Добавить студента' onClick={e => addStudent(e)}/>
									<BtnImg src="/edit_white.svg" alt="Изменить"/>
									<BtnImg src="/delete_white.svg" alt="Удалить"/>
								</div>
							</form>
						</div>
						
						{(Array.isArray(showResults) ? showResults.includes(group.id) : false) ? <div className={styles.block_extended}><GroupItem group_id={group.id} addItem={addItem} /></div> : null}
					</div>
				))
			) : (
				<p>Empty</p>
			)}

			<Footer />
		</div>
	)
}

export default Groups
