const Input = (props) => {
	const handleInputClick = (e) => {
    e.stopPropagation(); 
  }
 return <input type='text' className='input' disabled={props?.disabled } placeholder={props?.placeholder} value={props?.value} onChange={props?.onChange} onClick={handleInputClick}/>
}

export default Input