import { createContext, useCallback, useEffect, useState } from 'react'
import { GroupService } from '../../../services/group.services.js'
import Footer from '../../ui/Footer.jsx'
import Header from '../../ui/Header.jsx'
import TopBar from '../../ui/TopBar.jsx'
import DataItem from './DataItem.jsx'
import styles from './Groups.module.css'
import GroupItem from './group-item/GroupItem.jsx'

export const AddItemContext = createContext(null)
export const AddGroupContext = createContext(null)
export const ItemContext = createContext(null)

const Groups = () => {
	const [groups, setGroups] = useState([])
	const [data, setData] = useState([])
	const [showResults, setShowResults] = useState([])
	const [changeGroupInfo, setChangeGroupInfo] = useState(null)
	const [addItem, setAddItem] = useState(false)
	const [addGroup, setAddGroup] = useState(false)

	const clearGroups = useCallback(
		() => () => {
			setGroups([])
		},
		[groups]
	)

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
			<AddGroupContext.Provider value={{ addGroup, setAddGroup }}>
				<TopBar />
			</AddGroupContext.Provider>

			{addGroup ? (
				<ItemContext.Provider value={{ groups, setGroups, showResults, setShowResults, setChangeGroupInfo, setAddGroup, setAddItem }}>
					<DataItem disabled={false} />
				</ItemContext.Provider>
			) : null}

			{groups.length ? (
				groups.map(group => (
					<div key={group.id}>
						<ItemContext.Provider value={{ groups, setGroups, showResults, setShowResults, setChangeGroupInfo, setAddGroup, setAddItem }}>
							<DataItem groupInfo={group} disabled={changeGroupInfo != group.id} />
						</ItemContext.Provider>

						<AddItemContext.Provider value={{ addItem, setAddItem }}>
							{(Array.isArray(showResults) ? showResults.includes(group.id) : false) ? (
								<div className={styles.block_extended}>
									<GroupItem group_id={group.id} />
								</div>
							) : null}
						</AddItemContext.Provider>
					</div>
				))
			) : (
				<p>Empty</p>
			)}

			<Footer />
		</div>
	)
}

export default Groups
