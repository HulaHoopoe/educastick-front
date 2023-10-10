const InputAlt = props => {
	return (
			<label className='input_alt_label'>
				<p>{props?.label}</p>
				<input 
					type='text' 
					className='input_alt' 
					disabled={props.disabled} 
					placeholder={props?.placeholder} 
					value={props?.value} 
					onChange={props?.onChange}
					/>
			</label>
	)
}

export default InputAlt
