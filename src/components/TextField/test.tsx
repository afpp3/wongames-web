import { Email } from '@styled-icons/material-outlined'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from 'utils/tests/helpers'

import TextField from '.'

describe('<TextField />', () => {
  it('should render with label', () => {
    renderWithTheme(<TextField label="label" labelFor="field" id="field" />)

    expect(screen.getByLabelText('label')).toBeInTheDocument()
  })

  it('should render without label', () => {
    renderWithTheme(<TextField />)

    expect(screen.queryByLabelText('label')).not.toBeInTheDocument()
  })

  it('should render with placeholder', () => {
    renderWithTheme(<TextField placeholder="placeholder" />)

    expect(screen.getByPlaceholderText('placeholder')).toBeInTheDocument()
  })

  it('should render with icon', () => {
    renderWithTheme(<TextField icon={<Email data-testid="icon" />} />)

    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should render with icon on right position', () => {
    renderWithTheme(
      <TextField icon={<Email data-testid="icon" />} iconPosition="right" />
    )

    expect(screen.getByTestId('icon').parentElement).toHaveStyle({
      order: 1
    })
  })

  it('should change value when typing', async () => {
    const onInput = jest.fn()
    renderWithTheme(
      <TextField label="label" labelFor="field" id="field" onInput={onInput} />
    )

    const input = screen.getByRole('textbox')
    const text = 'Text here'
    userEvent.type(input, text)

    await waitFor(() => {
      expect(input).toHaveValue(text)
      expect(onInput).toHaveBeenCalledTimes(text.length)
    })
    expect(onInput).toHaveBeenCalledWith(text)
  })

  it('does not shanges its value when disabled', async () => {
    const onInput = jest.fn()
    renderWithTheme(
      <TextField
        label="label"
        labelFor="field"
        id="field"
        onInput={onInput}
        disabled
      />
    )

    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()

    const text = 'Text here'
    userEvent.type(input, text)

    await waitFor(() => {
      expect(input).not.toHaveValue(text)
    })
    expect(onInput).not.toHaveBeenCalledWith(text)
  })

  it('should render with error', () => {
    const { container } = renderWithTheme(
      <TextField
        icon={<Email data-testid="icon" />}
        label="label"
        labelFor="field"
        id="field"
        error="Error Message"
      />
    )
    expect(screen.getByText('Error Message')).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('should be accessible by tab', async () => {
    renderWithTheme(<TextField label="label" labelFor="field" id="field" />)

    const input = screen.getByLabelText('label')
    expect(document.body).toHaveFocus()

    userEvent.tab()
    expect(input).toHaveFocus()
  })

  it('should not be accessible by tab when disabled', async () => {
    renderWithTheme(
      <TextField label="label" labelFor="field" id="field" disabled />
    )

    const input = screen.getByLabelText('label')
    expect(document.body).toHaveFocus()

    userEvent.tab()
    expect(input).not.toHaveFocus()
  })
})
