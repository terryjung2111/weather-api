import React from 'react';
import TextField from '@material-ui/core/TextField';

const InputComponent = ({placeholder, name, value, onChange}) => {
  return (
    <div>
      <TextField
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  )
}

export default InputComponent;