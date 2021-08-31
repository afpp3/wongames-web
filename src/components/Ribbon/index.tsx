import * as S from './styles'

export type RibbonColors = 'primary' | 'secondary'
export type RibbonSizes = 'normal' | 'small'

export type RibbonProps = {
  children: React.ReactNode
  backgroundColor?: RibbonColors
  size?: RibbonSizes
}

const Ribbon = ({
  children,
  backgroundColor = 'primary',
  size = 'normal'
}: RibbonProps) => (
  <S.Wrapper backgroundColor={backgroundColor} size={size}>
    {children}
  </S.Wrapper>
)

export default Ribbon
