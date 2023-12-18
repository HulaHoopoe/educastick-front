import { useContext } from 'react'
import BtnText from '../../ui/BtnText'
import { AddTestContext } from './Tests'

const TopBar = ({ props }) => {
	const { addTest, setAddTest } = useContext(AddTestContext)
	const onAdd = () => {
		setAddTest(true)
	}

	return (
		<div>
			<div className='topbar'>
				<h1>Тесты</h1>
				<div className='topbar_items'>
					<BtnText text={'Фильтр'} />
					<BtnText text={'Создать Тест'} onClick={onAdd} />
				</div>
			</div>
			<div className='half_line'></div>
		</div>
	)
}

export default TopBar
