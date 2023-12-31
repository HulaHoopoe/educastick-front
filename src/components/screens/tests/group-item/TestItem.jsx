import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { TestService } from '../../../../services/test.services.js'
import BtnImg from '../../../ui/BtnImg.jsx'
import BtnText from '../../../ui/BtnText.jsx'
import Input from '../../../ui/Input.jsx'
import InputAlt from '../../../ui/InputAlt.jsx'
import Item from '../Item.jsx'
import { AddItemContext } from '../Tests.jsx'
import styles from '../Tests.module.css'

export const StudentsContext = createContext(null)

const TestItem = ({ itemData }) => {
	const [disabled, setDisabled] = useState(true)
	const [data, setData] = useState(itemData)
	const [tempData, setTempData] = useState(itemData)
	const [maxQuestionId, setMaxQuestionId] = useState(0)
	const [maxAnswerId, setMaxAnswerId] = useState(0)
	const [showResults, setShowResults] = useState([])
	const [changeInfo, setChangeInfo] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const data = await TestService.getMaxQuestionId()
			const data2 = await TestService.getMaxAnswerId()

			setMaxQuestionId(data)
			setMaxAnswerId(data2)
		}

		fetchData()
	}, [])

	const clearData = useCallback(
		() => () => {
			setData([])
		},
		[data]
	)

	const addQuestion = (e) => {
		setMaxQuestionId(maxQuestionId + 1)

		const newQuestion = { id: maxQuestionId, description: '', type: 1, answers: []}
		const newQuestions = ([...tempData.questions, newQuestion])
		console.log(newQuestions)
		setTempData(prev => ({...prev, questions: newQuestions.sort((a, b) => {return a.id - b.id})}))
	}

	const deleteQuestion = (e, id) => {

		const newQuestions = tempData.questions.filter(value => value.id != id)
		console.log(newQuestions)
		setTempData(prev => ({...prev, questions: newQuestions.sort((a, b) => {return a.id - b.id})}))
	}

	const addAnswer = (e, id) => {
		setMaxAnswerId(maxAnswerId + 1)

		const question = tempData.questions.filter(value => value.id === id)[0]
		const newAnswer = { id: maxAnswerId, description: '', correct: false}
		const newAnswers = ([...question.answers, newAnswer])
		console.log(newAnswers)
		const newQuestion = ({...question, answers: newAnswers})
		const newQuestions = ([...tempData.questions.filter(value => value.id != id), newQuestion])

		setTempData(prev => ({...prev, questions: newQuestions.sort((a, b) => {return a.id - b.id})}))
	}

	const deleteAnswer = (e, idQuestion, idAnswer) => {
		const question = tempData.questions.filter(value => value.id === idQuestion)[0]
		const newAnswers = question.answers.filter(value => value.id != idAnswer)
		const newQuestion = ({...question, answers: newAnswers})
		const newQuestions = ([...tempData.questions.filter(value => value.id != idQuestion), newQuestion])
		setTempData(prev => ({...prev, questions: newQuestions.sort((a, b) => {return a.id - b.id})}))
	}

	const setCorrect = (e, idQuestion, idAnswer) => {
		const question = tempData.questions.filter(value => value.id === idQuestion)[0]

		const answer = question.answers.filter(value => value.id == idAnswer)[0]
		const newAnswer = {...answer, correct: true}
		const newAnswers = ([...question.answers.map(answer => ({...answer, correct: false})).filter(value => value.id != idAnswer), newAnswer])
		console.log(newAnswers)
		const newQuestion = ({...question, answers: newAnswers.sort((a, b) => {return a.id - b.id})})
		const newQuestions = ([...tempData.questions.filter(value => value.id != idQuestion), newQuestion])

		setTempData(prev => ({...prev, questions: newQuestions.sort((a, b) => {return a.id - b.id})}))
	}

	const saveChanges = (e, key) => {
		setDisabled(true)
		setData(tempData)

	}

	const discardChanges = (e, key) => {
		setDisabled(true)
		setTempData(data)
	}

	return (
		<div>
			{data ? (
				<div className={styles.sub_item}>
					<InputAlt
						label={'Модуль:'}
						placeholder={'Наименование модуля'}
						value={tempData.module || ''}
						disabled={disabled}
						onChange={e =>
							setTempData(prev => ({
								...prev,
								module: e.target.value,
							}))
						}
					/>
					<p className={styles.paragraph}></p>
					<InputAlt
						label={'Тема:'}
						placeholder={'Наименование темы'}
						value={tempData.theme || ''}
						disabled={disabled}
						onChange={e =>
							setTempData(prev => ({
								...prev,
								theme: e.target.value,
							}))
						}
					/>
					<p className={styles.paragraph}></p>
					<p className={styles.paragraph}>Вопросы:</p>
					{!disabled ? <BtnText text='Добавить вопрос' onClick={e => addQuestion(e)} /> : null}
					<p className={styles.paragraph}></p>
					<div className={styles.questions}>
						{tempData.questions.length ? (
							tempData.questions.map((item, index) => (
								<ul key={item.id} className={styles.question_block}>
									<li>
										<InputAlt
											label={'Вопрос №' + (index + 1) + ':'}
											placeholder={'Описание вопроса'}
											value={item.description || ''}
											disabled={disabled}
											onChange={e => {
												const updatedQuestions = tempData.questions.map((q, i) => {
													if (i === index) {
														return {
															...q,
															description: e.target.value, // Update the description for the specific question
														}
													}
													return q
												})

												setTempData(prev => ({
													...prev,
													questions: updatedQuestions,
												}))
											}}
										/>
										{!disabled ? <BtnText text='Удалить вопрос' onClick={e => deleteQuestion(e, item.id)} /> : null}
										
										<p className={styles.paragraph}></p>
									</li>
									<p className={styles.paragraph}></p>

									<p className={styles.paragraph}> Ответы:</p>
									{!disabled ? <BtnText text='Добавить ответ' onClick={e => addAnswer(e, item.id)} /> : null}
									<ol type='a' className={styles.questions}>
										{item.answers.map((answer, answerIndex) => (
											<li key={answer.id}>
												<InputAlt
													placeholder={'Описание вопроса'}
													value={answer.description || ''}
													disabled={disabled}
													onChange={e => {
														const updatedQuestions = tempData.questions.map((q, qIndex) => {
															if (qIndex === index) {
																const updatedAnswers = q.answers.map((a, aIndex) => {
																	if (aIndex === answerIndex) {
																		// Identify the specific answer index here
																		return {
																			...a,
																			description: e.target.value, // Update the description for the specific answer
																		}
																	}
																	return a
																})

																return {
																	...q,
																	answers: updatedAnswers,
																}
															}
															return q
														})

														setTempData(prev => ({
															...prev,
															questions: updatedQuestions,
														}))
													}}
												/>
												{!disabled ? (
														<BtnImg src={'/checkmark.svg'} alt={'correct'} imgWidth={20} imgHeight={20} disabled={answer.correct} onClick={e => setCorrect(e, item.id, answer.id)}/>
												) : answer.correct ? (
													<BtnImg src={'/checkmark.svg'} alt={'correct'} imgWidth={20} imgHeight={20} disabled={true} />
												) : null}
												{!disabled ? <BtnText text='Удалить ответ' onClick={e => deleteAnswer(e, item.id, answer.id)} /> : null}
												<p className={styles.paragraph}></p>
											</li>
										))}
									</ol>
									<p className={styles.paragraph}></p>
								</ul>
							))
						) : (
							<p>Нет вопросов</p>
						)}
					</div>
				</div>
			) : (
				<p>Empty</p>
			)}

			{!disabled ? (
				<div className={styles.btns_div}>
					<BtnText text='Сохранить' onClick={e => saveChanges(e, tempData.id)} />
					<BtnText text='Отменить' onClick={e => discardChanges(e, tempData.id)} />
				</div>
			) : (
				<div className={styles.btns_div}>
					<BtnImg src='/edit_white.svg' alt='Изменить' onClick={e => setDisabled(false)} />
				</div>
			)}
		</div>
	)
}

export default TestItem
