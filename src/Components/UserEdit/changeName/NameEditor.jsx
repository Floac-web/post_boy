import React from 'react'
import "./name-editor.css"

export const NameEditor = ({curentUserName, className, setCurentName}) => {

  return (
    <div className={`${className} name-editor`}>
        <label htmlFor="name-editor__input">Ім'я</label>
        <input type="text" id="name-editor__input" className="input"
        maxLength={30} value={curentUserName}
        onInput={(e) => setCurentName(e.target.value)}/>
    </div>
  )
}
