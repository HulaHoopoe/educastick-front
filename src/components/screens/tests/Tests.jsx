import { createContext, useCallback, useEffect, useState } from 'react'
import { TestService } from '../../../services/test.services.js'
import Footer from '../../ui/Footer.jsx'
import Header from '../../ui/Header.jsx'
import TopBar from './TopBar.jsx'
import DataItemTests from './DataItemTests.jsx'
import styles from './Tests.module.css'
import TestItem from './group-item/TestItem.jsx'

export const AddItemContext = createContext(null)
export const AddTestContext = createContext(null)
export const ItemContext = createContext(null)

const Tests = () => {
	const [tests, setTests] = useState([])
	const [showResults, setShowResults] = useState([])
	const [addItem, setAddItem] = useState(false)
	const [addTest, setAddTest] = useState(false)

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
		const fetchData = async () => {
			const tests = await TestService.getTests()

			const testsWithData = await Promise.all(
				tests.map(async test => {
					const questions = await TestService.getQuestions(test.id)

					const questionsWithAnswers = await Promise.all(
						questions.map(async question => {
							const answers = await TestService.getAnswers(question.id)
							return { ...question, answers }
						})
					)

					return { ...test, questions: questionsWithAnswers }
				})
			)

			setTests(testsWithData)
		}

		console.log(tests)
		fetchData()

		return clearTests
	}, [])

	useEffect(() => {
		console.log(tests)
	}, [tests])

	return (
		<div>
			<Header />
			<AddTestContext.Provider value={{ addTest, setAddTest }}>
				<TopBar />
			</AddTestContext.Provider>

			{addTest ? (
				<div>
				<ItemContext.Provider value={{ tests, setTests, showResults, setShowResults, setAddItem, setAddTest }}>
					<DataItemTests />
				</ItemContext.Provider>

			</div>
			) : null}

			{tests.length ? (
				tests.map(test => (
					<div key={test.id}>
						<ItemContext.Provider value={{ tests, setTests, showResults, setShowResults, setAddItem, setAddTest }}>
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
