import BtnText from './BtnText'



const TopBar = ({ onClick }) => {
	const { AddGroup, setAddGroup } = useContext(AddGroupContext)
	return (
		<div className='topbar'>
			<h1>Группы</h1>
			<div className='topbar_items'>
				<BtnText text={'Фильтр'} />
				<BtnText text={'Создать группу'} onClick={onClick} />
			</div>
		</div>
	)
}

export default TopBar
