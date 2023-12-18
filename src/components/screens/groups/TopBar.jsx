import { useContext } from 'react'
import BtnText from '../../ui/BtnText'
import { AddGroupContext } from './Groups'

const TopBar = ({ props }) => {
	const { AddGroup, setAddGroup } = useContext(AddGroupContext)
	const onAdd = () => {
		setAddGroup(true)
	}

	return (
		<div>
			<div className='topbar'>
				<h1>Группы</h1>
				<div className='topbar_items'>
					<BtnText text={'Фильтр'} />
					<BtnText text={'Создать группу'} onClick={onAdd} />
				</div>
			</div>
			<div className='half_line'></div>
		</div>
	)
}

export default TopBar
