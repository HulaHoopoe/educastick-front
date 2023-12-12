import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { GroupService } from '../../../../services/group.services.js'
import BtnImg from '../../../ui/BtnImg.jsx'
import BtnText from '../../../ui/BtnText.jsx'
import Input from '../../../ui/Input.jsx'
import InputAlt from '../../../ui/InputAlt.jsx'
import Item from '../Item.jsx'
import { AddItemContext } from '../Tests.jsx'
import styles from '../Tests.module.css'

export const StudentsContext = createContext(null)

const TestItem = ({ itemData, disabled }) => {
	const [data, setData] = useState(itemData)
	const [tempData, setTempData] = useState(itemData)
	const [showResults, setShowResults] = useState([])
	const [changeInfo, setChangeInfo] = useState([])

	useEffect(() => {
		console.log(data)
	}, [data])

	const clearData = useCallback(
		() => () => {
			setData([])
		},
		[data]
	)

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
											onChange={e =>
												{
													const updatedQuestions = tempData.questions.map((q, i) => {
														if (i === index) {
															return {
																...q,
																description: e.target.value // Update the description for the specific question
															};
														}
														return q;
													});
											
													setTempData(prev => ({
														...prev,
														questions: updatedQuestions
													}));
												}
											}
										/>
									</li>
									<p className={styles.paragraph}></p>

									<p className={styles.paragraph}> Ответы:</p>
									<ol type='a' className={styles.questions}>
										{item.answers.map((answer, answerIndex) => (
											<li key={answer.id}>
												<InputAlt
													placeholder={'Описание вопроса'}
													value={answer.description || ''}
													disabled={disabled}
													onChange={e =>
														{
															const updatedQuestions = tempData.questions.map((q, qIndex) => {
																if (qIndex === index) {
																	const updatedAnswers = q.answers.map((a, aIndex) => {
																		if (aIndex === answerIndex) { // Identify the specific answer index here
																			return {
																				...a,
																				description: e.target.value // Update the description for the specific answer
																			};
																		}
																		return a;
																	});
													
																	return {
																		...q,
																		answers: updatedAnswers
																	};
																}
																return q;
															});
													
															setTempData(prev => ({
																...prev,
																questions: updatedQuestions
															}));
														}
													}
												/>
												{answer.correct ? (
													<button className='btn_disabled' style={{ padding: '0 10px' }} disabled>
														<img src='/checkmark.svg' alt='checkmark' width={20} height={20} />
													</button>
												) : null}
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
					<BtnText text='Сохранить' onClick={e => saveChanges(e, student.id)} />
					<BtnText text='Отменить' onClick={e => discardChanges(e, student.id)} />
				</div>
			) : null}
		</div>
	)
}

export default TestItem
