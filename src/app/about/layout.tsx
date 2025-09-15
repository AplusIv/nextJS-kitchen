import { FC } from "react"

interface IProps {
  children: React.ReactNode
}

const Aboutlayout: FC<IProps> = ({children}) => {
  return (
    <section>{children}</section>
  )
}

export default Aboutlayout