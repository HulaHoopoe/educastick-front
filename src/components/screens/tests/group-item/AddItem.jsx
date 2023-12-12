const AddItem = () => {
 return (
	<div className={styles.block_extended}>
			{students.length ? (
				students.map(student => (
					<div key={student.id}>
						<div className={styles.block_item} onClick={e => showOnClick(e, student.id)}>
							<form action='' className={styles.item_form}>
								<div className={styles.btn_block}>
									<Input placeholder={'Имя'} value={student.name} />
									<Input placeholder={'Фамилия'} value={student.surname} />
								</div>
								<div className={styles.btn_block}>
									<BtnImg src='/edit_white.svg' alt='Изменить' onClick={e => changeStudentInfo(e, student.id)} 
									disabled={changeInfo.includes(student.id)} />
									<BtnImg src='/delete_white.svg' alt='Удалить' />
								</div>
							</form>
						</div>
						{(Array.isArray(showResults) ? showResults.includes(student.id) : false) ? <Item student_id={student.id} disabled={!changeInfo.includes(student.id)} setChangeInfo={setChangeInfo} /> : null}
					</div>
				))
			) : (
				<p>Empty</p>
			)}
		</div>
 )
}

export default AddItem