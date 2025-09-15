import { FC } from "react"

interface IProps {
  children: React.ReactNode
}

const Ingredientslayout: FC<IProps> = ({children}) => {
  return (
    <section>{children}</section>
  )
}

export default Ingredientslayout