import React from 'react'
import classNames from 'classnames'
import './Button.scss'

function Button({ children, size, color, outline, fullWidth, ...rest }) {
  return (
  <button 
    className={classNames('Button', size, color, { outline, fullWidth })}
    {...rest}
  >
    {children}
  </button>
  )
} // props로 받은 값이 className으로 전달됨

Button.defaultProps = {
  size: 'medium',
  color: 'blue'
}

export default Button