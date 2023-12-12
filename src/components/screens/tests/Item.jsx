import { useContext, useEffect, useState } from 'react'
import BtnText from '../../ui/BtnText'
import InputAlt from '../../ui/InputAlt'
import { AddItemContext } from './Tests'
import styles from './Tests.module.css'
import { StudentsContext } from './group-item/TestItem'

const clearData = {
	name: '',
	surname: '',
	patronymic: '',
	email: '',
	birth: '',
	sex: '',
}

const Item = ({ studentInfo, disabled, setChangeInfo }) => {
	const { addItem, setAddItem } = useContext(AddItemContext)
	const { students, setStudents } = useContext(StudentsContext)
	const [data, setData] = useState(clearData)
	const [student, setStudent] = useState(clearData)

	const saveChanges = (e, key) => {
		if (key) {
			setChangeInfo(prev => prev.filter(value => value != key))
			setStudent(data)
		} else {
			setStudents(prev => [
				...prev,
				{
					id: prev.length + 1,
					...data,
				},
			])

			setAddItem(false)
		}
	}

	const discardChanges = (e, key) => {
		if (key) {
			setChangeInfo(prev => prev.filter(value => value != key))
			setData(student)
		} else {
			setAddItem(false)
		}
	}

	useEffect(() => {
		if (!studentInfo) return

		setStudent(studentInfo)
		setData(studentInfo)

		return setStudent[clearData], setData[clearData]
	}, [])

	return (
		<div className={styles.block_extended}>
			<div className={styles.item_info}>
				<form>
					<div className={styles.inputs_div}>
						<InputAlt
							label={'Имя:'}
							placeholder={'Имя'}
							value={data.name || ''}
							disabled={disabled}
							onChange={e =>
								setData(prev => ({
									...prev,
									name: e.target.value,
								}))
							}
						/>
						<InputAlt
							label={'Фамилия:'}
							placeholder={'Фамилия'}
							value={data.surname || ''}
							disabled={disabled}
							onChange={e =>
								setData(prev => ({
									...prev,
									surname: e.target.value,
								}))
							}
						/>
						<InputAlt
							label={'Отчество:'}
							placeholder={'Отчество'}
							value={data.patronymic || ''}
							disabled={disabled}
							onChange={e =>
								setData(prev => ({
									...prev,
									patronymic: e.target.value,
								}))
							}
						/>
						<InputAlt
							label={'Почта:'}
							placeholder={'pochta@mail.ru'}
							value={data.email || ''}
							disabled={disabled}
							onChange={e =>
								setData(prev => ({
									...prev,
									email: e.target.value,
								}))
							}
						/>
						<InputAlt
							label={'Дата рождения:'}
							placeholder={'Дата рождения'}
							value={data.birth || ''}
							disabled={disabled}
							onChange={e =>
								setData(prev => ({
									...prev,
									birth: e.target.value,
								}))
							}
						/>
						<InputAlt
							label={'Пол:'}
							placeholder={'Пол'}
							value={data.sex || ''}
							disabled={disabled}
							onChange={e =>
								setData(prev => ({
									...prev,
									sex: e.target.value,
								}))
							}
						/>
					</div>
					{!disabled ? (
						<div className={styles.btns_div}>
							<BtnText text='Сохранить' onClick={e => saveChanges(e, student.id)} />
							<BtnText text='Отменить' onClick={e => discardChanges(e, student.id)} />
						</div>
					) : null}
				</form>
			</div>
		</div>
	)
}

export default Item
