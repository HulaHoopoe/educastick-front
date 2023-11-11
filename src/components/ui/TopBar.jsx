import { useContext } from 'react'
import BtnText from './BtnText'
import { AddGroupContext } from '../screens/groups/Groups'

const TopBar = ({ onClick }) => {
	const { AddGroup, setAddGroup } = useContext(AddGroupContext)
	const onAdd = () => {
		setAddGroup(true)
	}

	return (
		<div className='topbar'>
			<h1>Группы</h1>
			<div className='topbar_items'>
				<BtnText text={'Фильтр'} />
				<BtnText text={'Создать группу'} onClick={onAdd} />
			</div>
		</div>
	)
}

export default TopBar
