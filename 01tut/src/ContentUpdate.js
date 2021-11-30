import { FaTrashAlt } from 'react-icons/fa'

const ContentUpdate = ({items, handleCheck, handleDelete}) => {
    return (
        <main>
            <ul>
                {items.map((item) => (
                    <li className="item" key={item.id}>
                        <input 
                            type="checkbox" 
                            onChange = {()=> handleCheck(item.id)}
                            checked={item.checked} 
                        />
                        <label
                            style={(item.checked) ? {textDecoration: 'line-through'}: null}
                            onDoubleClick={()=>handleCheck(item.id) /* In order to pass id as a parameter we make the use of anonymous function */}
                        >{item.item}</label>   
                        <FaTrashAlt
                            onClick={()=> handleDelete(item.id)} 
                            role="button" 
                            tabIndex="0"
                        />
                    </li>
                ))}
            </ul>

        </main>
            
        
    )
}

export default ContentUpdate
