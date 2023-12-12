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
	questions: []
}

const DataItemTests = ({testInfo, disabled}) => {
	const { tests, setTests, showResults, setShowResults, setChangeInfo, setAddTest, setAddItem } = useContext(ItemContext)
	const [data, setData] = useState(clearData)
	const [test, setTest] = useState(clearData)

	const showOnClick = (e, key) => {
		e.preventDefault
		showResults.includes(key) ? setShowResults(prev => prev.filter(value => value != key)) : setShowResults(prev => [...prev, key])
	}

	const deleteItem = (e, id) => {
		setTests(tests.filter(value => value.id != id))

		e.stopPropagation()
	}

	const updateItem = (e, id) => {
		e.preventDefault()
		if (disabled) setChangeInfo(id)
		e.stopPropagation()
	}

	const addStudent = (e, key) => {
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
		if (key) {
			setChangeTestInfo(null)
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
		if (key) {
			setChangeTestInfo(null)
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
										<Input
											placeholder={'Название теста'}
											value={data.name || ''}
											disabled={disabled}
											onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
										/>
										<Input placeholder={'Название предмета'} value={data.subject || ''} disabled={disabled} />
										<Input placeholder={'Тип теста'} value={data.type || ''} disabled={disabled} />
									</div>

										<div className={styles.btn_block}>
											<BtnText text='Добавить ответы' disabled={!disabled} onClick={e => addStudent(e, test.id)} />
											<BtnImg src='/edit_white.svg' alt='Изменить' disabled={!disabled} onClick={e => updateItem(e, test.id)} />
											<BtnImg src='/delete_white.svg' alt='Удалить' disabled={!disabled} onClick={e => deleteItem(e, test.id)} />
										</div>
								</form>
							</div>
	)
}

export default DataItemTests
