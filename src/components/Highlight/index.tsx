import Button from 'components/Button'
import React from 'react'
import * as S from './styles'

export type HighlightProps = {
  alignment?: 'right' | 'left'
  title: string
  subtitle: string
  backgroundImage: string
  buttonLabel: string
  buttonLink: string
  floatImage?: string
}

const Highlight = ({
  alignment = 'right',
  title,
  subtitle,
  buttonLabel,
  buttonLink,
  backgroundImage,
  floatImage
}: HighlightProps) => (
  <S.Wrapper backgroundImage={backgroundImage} alignment={alignment}>
    {!!floatImage && <S.FloatImage src={floatImage} alt={title} />}
    <S.Content>
      <S.Title>{title}</S.Title>
      <S.Subtitle>{subtitle}</S.Subtitle>
      <Button href={buttonLink} as="a">
        {buttonLabel}
      </Button>
    </S.Content>
  </S.Wrapper>
)

export default Highlight
