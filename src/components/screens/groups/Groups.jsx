import Header from '../../ui/Header.jsx'
import Footer from '../../ui/Footer.jsx'
import Input from '../../ui/Input.jsx'
import BtnText from '../../ui/BtnText.jsx'
import styles from './Groups.module.css'
import { useCallback, useEffect, useState, createContext } from 'react'
import { GroupService } from '../../../services/group.services.js'
import GroupItem from './group-item/GroupItem.jsx'
import BtnImg from '../../ui/BtnImg.jsx'
import TopBar from '../../ui/TopBar.jsx'

export const AddItemContext = createContext(null)

const Groups = () => {
	const [groups, setGroups] = useState([])
	const [data, setData] = useState([])
	const [showResults, setShowResults] = useState([])
	const [changeGroupInfo, setChangeGroupInfo] = useState(null)
	const [addItem, setAddItem] = useState(false)

	const showOnClick = (e, key) => {
		e.preventDefault
		showResults.includes(key) ? setShowResults(prev => prev.filter(value => value != key)) : setShowResults(prev => [...prev, key])
	}

	const deleteItem = (e, id) => {
		setGroups(groups.filter(value => value.id != id))

		e.stopPropagation()
	}

	const updateItem = (e, id) => {
		if (changeGroupInfo != id) setChangeGroupInfo(id)
		e.stopPropagation()
	}

	const addStudent = (e, key) => {
		setAddItem(true)
		if (!showResults.includes(key)) showOnClick(e, key)
		e.stopPropagation()
	}

	const clearGroups = useCallback(
		() => () => {
			setGroups([])
		},
		[groups]
	)

	const getValue = group => {
		const value = data.filter(value => value.id == group.id)

		return value[0] ? value[0] : ''
	}

	const clearData = useCallback(
		() => () => {
			setData([])
		},
		[groups]
	)

	const clearResults = useCallback(
		() => () => {
			setShowResults([])
		},
		[showResults]
	)

	const saveChanges = (e, key) => {
		if (key){
			setChangeGroupInfo(null)
			const newGroup = data.filter(value => value.id === key)[0]

			if (newGroup)
			setGroups(prev => prev.map(group => (group.id === key ? newGroup : group)))

		}
		else {
			setGroups(prev => [...prev,{
				id: prev.length + 1, ...data[prev.length + 1],
		}])
		
		setAddItem(false)
		
		}	
		e.stopPropagation()	
	}

	const discardChanges = (e, key) => {		
		if (key){
			setChangeGroupInfo(null)
			setData(groups)
		}
		else {
		setAddItem(false)
		}		
		e.stopPropagation()
	}

	useEffect(() => {
		const fetchData = async () => {
			const data = await GroupService.getGroups()
			setGroups(data)
			setData(data)
		}

		fetchData()

		return clearGroups, clearData
	}, [])

	return (
		<div>
			<Header />
			<TopBar />
			<AddItemContext.Provider value={{ addItem, setAddItem }}>
				{groups.length ? (
					groups.map(group => (
						<div key={group.id}>
							<div className={styles.block_item} onClick={e => showOnClick(e, group.id)}>
								<form action='' className={styles.item_form}>
									<div className={styles.btn_block}>
										<Input
											placeholder={'Наименование группы'}
											value={data.filter(value => value.id == group.id)[0].name}
											disabled={changeGroupInfo != group.id}
											onChange={e => setData(prev => prev.map(obj => (obj.id === group.id ? { ...obj, name: e.target.value } : obj)))}
										/>
										<Input placeholder={'Количество человек'} value={group.students_count} disabled={true} />
									</div>

									{changeGroupInfo != group.id ? (
										<div className={styles.btn_block}>
											<BtnText text='Добавить студента' onClick={e => addStudent(e, group.id)} />
											<BtnImg src='/edit_white.svg' alt='Изменить' onClick={e => updateItem(e, group.id)} />
											<BtnImg src='/delete_white.svg' alt='Удалить' onClick={e => deleteItem(e, group.id)} />
										</div>
									) : (
										<div className={styles.btn_block}>
											<BtnText text='Сохранить' onClick={e => saveChanges(e, group.id)} />
											<BtnText text='Отменить' onClick={e => discardChanges(e, group.id)} />
										</div>
									)}
								</form>
							</div>

							{(Array.isArray(showResults) ? showResults.includes(group.id) : false) ? (
								<div className={styles.block_extended}>
									<GroupItem group_id={group.id} />
								</div>
							) : null}
						</div>
					))
				) : (
					<p>Empty</p>
				)}
			</AddItemContext.Provider>
			<Footer />
		</div>
	)
}

export default Groups
