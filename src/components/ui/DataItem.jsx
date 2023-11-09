const DataItem = ({inputs, btns, onClick, onAdd, onUpdate, onDelete}) => {
	return (
		<div className={styles.block_item} onClick={e => showOnClick(e, group.id)}>
			<form action='' className={styles.item_form}>
				<div className={styles.btn_block}>
					<Input placeholder={'Наимtнование группы'} value={group.name} disabled={true} />
					<Input placeholder={'Количество человек'} value={group.students_count} disabled={true} />
				</div>
				<div className={styles.btn_block}>
					<BtnText text='Добавить студента' onClick={e => addStudent(e)} />
					<BtnImg src='/edit_white.svg' alt='Изменить' />
					<BtnImg src='/delete_white.svg' alt='Удалить' onClick={e => deleteItem(e, group.id)} />
				</div>
			</form>
		</div>
	)
}

export default DataItem
