import styles from './Groups.module.css'
import InputAlt from '../../ui/InputAlt'
import BtnText from '../../ui/BtnText'
import { useEffect, useState } from 'react'
import { GroupService } from '../../../services/group.services.js'
import GroupItem from './group-item/GroupItem'

const clearData = {
	name: '',
	surname: '',
	patronymic: '',
	email: '',
	birth: '',
	sex: ''
}

const Item = ({ student_id, disabled, setChangeInfo }) => {
	const saveChanges = (e, key) => {
		setChangeInfo(prev => prev.filter(value => value != key))
		setStudent(data)
	}

	const discardChanges = (e, key) => {
		setChangeInfo(prev => prev.filter(value => value != key))
		setData(student)
	}

	const [data, setData] = useState(clearData)
	const [student, setStudent] = useState(clearData)

	useEffect(() => {
		if (!student_id) return
		const fetchData = async () => {
			const data = await GroupService.getStudent(student_id)

			setStudent(data)
			setData(data)
		}

		fetchData()

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
