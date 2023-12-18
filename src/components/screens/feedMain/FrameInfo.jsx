import styles from './main_page.module.css'

export default function FramePost({info}) {
    let content = <div className={styles.info_page}>
        <div className={styles.line}></div>
        <img alt="" src={info?.img}/>
        <div className={styles.txt}>
            <h2>{info.topic}</h2>
            <p><b>{info.topic}</b>{info.description}</p>
        </div>
    </div>
    if (info.id % 2 === 0) {
        content = <div className={styles.info_page}>
            <div className={styles.line}></div>
            <div className={styles.txt}>
                <h2>{info.topic}</h2>
                <p><b>{info.topic}</b>{info.description}</p>
            </div>
            <img alt="" src={info?.img}/>
        </div>
    }
    return (content);
}

