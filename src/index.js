import { render } from 'react-dom'
import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import useMeasure from './useMeasure'
import './styles.css'

function App() {
  const [open, toggle] = useState(false)
  const [containerBind, containerProps] = useMeasure()
  const [barBind, barProps] = useMeasure()
  const [message, setMessage] = useState('click me')

  useEffect(() => {
    const completed = barProps.width / containerProps.width

    if (completed < 0.1) {
      setMessage('')
    }
    if (completed > 0.1 && completed < 0.3) {
      setMessage('Keep Hyping!')
    }
    if (completed > 0.3 && completed < 0.6) {
      setMessage("Don't give up!")
    }
    if (completed > 0.6) {
      setMessage('Almost done!!')
    }
  }, [barProps.width])

  const props = useSpring({ width: open ? containerProps.width : 0, config: { duration: 3000 } })
  const messageProps = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } })

  return (
    <div>
      <div {...containerBind} className="main" onClick={() => toggle(!open)}>
        <animated.div {...barBind} className="fill" style={props} />
        <animated.div style={messageProps} class="content">
          {message}
        </animated.div>
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'))
