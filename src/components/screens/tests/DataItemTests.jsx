import { useCallback, useContext, useEffect, useState } from 'react'
import BtnImg from '../../ui/BtnImg'
import BtnText from '../../ui/BtnText'
import Input from '../../ui/Input'
import styles from './DataItemTests.module.css'
import { ItemContext } from './Tests'

const clearData = {
	id: '',
	name: '',
	theme: '',
	module: '',
	type: '',
	questions: [],
}

const DataItemTests = ({ testInfo }) => {
	const { tests, setTests, showResults, setShowResults, setAddTest, setAddItem } = useContext(ItemContext)
	const [disabled, setDisabled] = useState(true)
	const [data, setData] = useState(clearData)
	const [test, setTest] = useState(clearData)

	useEffect(() => {
		!testInfo ? setDisabled(false) : setDisabled(true)
	}, [])

	const showOnClick = (e, key) => {
		e.preventDefault
		showResults.includes(key) ? setShowResults(prev => prev.filter(value => value != key)) : setShowResults(prev => [...prev, key])
	}

	const deleteItem = (e, id) => {
		e.preventDefault()
		setTests(tests.filter(value => value.id != id))

		e.stopPropagation()
	}

	const updateItem = e => {
		e.preventDefault()
		if (disabled) setDisabled(false)
		e.stopPropagation()
	}

	const addStudent = (e, key) => {
		e.preventDefault()
		setAddItem(true)
		if (!showResults.includes(key)) showOnClick(e, key)
		e.stopPropagation()
	}

	const clearTests = useCallback(
		() => () => {
			setTests([])
		},
		[tests]
	)

	const saveChanges = (e, key) => {
		e.preventDefault()
		if (testInfo) {
			setDisabled(true)
			setTest(data)
		} else {
			setTests(prev => [
				...prev,
				{
					id: prev.length + 1,
					...data,
				},
			])

			setAddTest(false)
		}
		e.stopPropagation()
	}

	const discardChanges = (e, key) => {
		e.preventDefault()
		if (key) {
			setDisabled(true)
			setData(test)
		} else {
			setAddTest(false)
		}
		e.stopPropagation()
	}

	useEffect(() => {
		if (!testInfo) return

		setTest(testInfo)
		setData(testInfo)

		return setTest[clearData], setData[clearData]
	}, [])

	return (
		<div className={styles.block_item} onClick={e => showOnClick(e, test.id)}>
			<form action='' className={styles.item_form}>
				<div className={styles.btn_block}>
					<Input placeholder={'Название теста'} value={data.name || ''} disabled={disabled} onChange={e => setData(prev => ({ ...prev, name: e.target.value }))} />
					<Input placeholder={'Название предмета'} value={data.subject || ''} disabled={disabled} onChange={e => setData(prev => ({ ...prev, subject: e.target.value }))} />
					<Input placeholder={'Тип теста'} value={data.type || ''} disabled={disabled} onChange={e => setData(prev => ({ ...prev, type: e.target.value }))} />
				</div>
				{disabled ? (
					<div className={styles.btn_block}>
						<BtnText text='Добавить ответы' disabled={!disabled} onClick={e => addStudent(e, test.id)} />
						<BtnImg src='/edit_white.svg' alt='Изменить' onClick={e => updateItem(e, test.id)} />
						<BtnImg src='/delete_white.svg' alt='Удалить' onClick={e => deleteItem(e, test.id)} />
					</div>
				) : (
					<div className={styles.btn_block}>
						<BtnText text='Сохранить' onClick={e => saveChanges(e, test.id)} />
						<BtnText text='Отменить' onClick={e => discardChanges(e, test.id)} />
					</div>
				)}
			</form>
		</div>
	)
}

export default DataItemTests
