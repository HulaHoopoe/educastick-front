import FramePost from "./FrameInfo";
import { useEffect, useState, useCallback } from 'react'
import { MainService } from '../../../services/main.services';
import styles from './main_page.module.css'

export default function MainPage() {
    const [info, setInfo] = useState([])

    useEffect(() => {
        const fetchData = async () => {
			const data = await MainService.getInfo()

			setInfo(data)
		}
        
		fetchData()
    }, [])

    return (
        <div>
            <div className={styles.about}>
                <div></div>
                <div className={styles.txt}>
                    <h2>Что это такое - EducaStick?</h2>
                    <p><b>EducaStick</b> - это Ваша волшебная палочка, которая поможет с проверкой ответов на тестовые
                        задания. Она не
                        только сама проверит правильность ответов учащихся, но и подготовит для Вас статистику по
                        каждому
                        отдельному
                        вопросу, ученику или группе. Вам требуется только отправить фотографии с ответами.</p>
                    <p><b>Мы ценим Ваше время и силы, поэтому всегда готовы помочь!</b></p>
                </div>
                <div className={styles.log_reg}>
                    <input className={styles.home_page_input} type="button" value="Авторизоваться"/>
                    <input className={styles.home_page_input}  type="button" value="Зарегистрироваться"/>
                </div>
                <div></div>
            </div>
            
            <div className={styles.content}>
                {info.length ? (
                    info.map((p) => (
                        <FramePost key={p.id} info={p}/>
                    ))
                ) : (
                    <div>
                        Empty
                    </div>
                )}
            </div>
        </div>
    )
}

