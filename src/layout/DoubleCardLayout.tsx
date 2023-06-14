interface DoubleCardLayoutProps {
    name?: string
    
    children?: React.ReactNode
}
function DoubleCardLayout(props: DoubleCardLayoutProps) {
  return (
    <div>DoubleCardLayout{props.children}</div>
  )
}

export default DoubleCardLayout
