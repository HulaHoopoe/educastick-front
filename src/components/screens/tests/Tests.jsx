import { createContext, useCallback, useEffect, useState } from 'react'
import { TestService } from '../../../services/test.services.js'
import Footer from '../../ui/Footer.jsx'
import Header from '../../ui/Header.jsx'
import DataItemTests from './DataItemTests.jsx'
import styles from './Tests.module.css'
import TestItem from './group-item/TestItem.jsx'

export const AddItemContext = createContext(null)
export const AddGroupContext = createContext(null)
export const ItemContext = createContext(null)

const Tests = () => {
	const [tests, setTests] = useState([])
	const [showResults, setShowResults] = useState([])
	const [addItem, setAddItem] = useState(false)
	const [addGroup, setAddGroup] = useState(false)

	const clearTests = useCallback(
		() => () => {
			setTests([])
		},
		[tests]
	)

	const clearResults = useCallback(
		() => () => {
			setShowResults([])
		},
		[showResults]
	)

	useEffect(() => {
		const fetchSubData = async test => {
			const data = await TestService.getQuestions(test.id)

			setTests(prev => (!prev.some(e => e.id == test.id) ? [...prev, { ...test, questions: data }] : prev))
			// setTests(prev => ([...prev, !prev.some(e => e.id == test.id) ? {...test, questions: data} : null]))
		}

		const fetchData = async () => {
			const data = await TestService.getTests()

			data.map(test => fetchSubData(test))
		}

		fetchData()

		return clearTests
	}, [])

	useEffect(() => {
		console.log(tests)
	}, [tests])

	return (
		<div>
			<Header />

			{tests.length ? (
				tests.map(test => (
					<div key={test.id}>
						<ItemContext.Provider value={{ tests, setTests, showResults, setShowResults, setAddGroup, setAddItem }}>
							<DataItemTests testInfo={test} />
						</ItemContext.Provider>

						<AddItemContext.Provider value={{ addItem, setAddItem }}>
							{(Array.isArray(showResults) ? showResults.includes(test.id) : false) ? (
								<div className={styles.block_extended}>
									<TestItem itemData={test} />
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

export default Tests
