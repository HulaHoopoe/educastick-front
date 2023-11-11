import Input from './Input'
import BtnText from './BtnText'
import BtnImg from './BtnImg'
import { ItemContext } from '../screens/groups/Groups'
import { useContext, useState, useCallback, useEffect } from 'react'
import styles from './DataItem.module.css'

const clearData = {
	id: '',
	name: '',
	students_count: ''
}

const DataItem = ({groupInfo, disabled}) => {
	const { groups, setGroups, showResults, setShowResults, setChangeGroupInfo, setAddGroup, setAddItem } = useContext(ItemContext)
	const [data, setData] = useState(clearData)
	const [group, setGroup] = useState(clearData)

	const showOnClick = (e, key) => {
		e.preventDefault
		showResults.includes(key) ? setShowResults(prev => prev.filter(value => value != key)) : setShowResults(prev => [...prev, key])
	}

	const deleteItem = (e, id) => {
		setGroups(groups.filter(value => value.id != id))

		e.stopPropagation()
	}

	const updateItem = (e, id) => {
		if (disabled) setChangeGroupInfo(id)
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

	const saveChanges = (e, key) => {
		if (key) {
			setChangeGroupInfo(null)
			setGroup(data)
			
		} else {
			setGroups(prev => [
				...prev,
				{
					id: prev.length + 1,
					...data,
				},
			])

			setAddGroup(false)
		}
		e.stopPropagation()
	}

	const discardChanges = (e, key) => {
		if (key) {
			setChangeGroupInfo(null)
			setData(group)
		} else {
			setAddGroup(false)
		}
		e.stopPropagation()
	}

	useEffect(() => {
		if (!groupInfo) return

		setGroup(groupInfo)
		setData(groupInfo)

		return setGroup[clearData], setData[clearData]
	}, [])


	return (
		<div className={styles.block_item} onClick={e => showOnClick(e, group.id)}>
								<form action='' className={styles.item_form}>
									<div className={styles.btn_block}>
										<Input
											placeholder={'Наименование группы'}
											value={data.name || ''}
											disabled={disabled}
											onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
										/>
										<Input placeholder={'Количество человек'} value={group.students_count || '0'} disabled={true} />
									</div>

									{disabled ? (
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
	)
}

export default DataItem
