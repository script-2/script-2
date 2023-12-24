export function Textarea({
  value,
  setValue,
}: {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}) {
  function handleTextAreaOnChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setValue(event.target.value)
  }
  return (
    <textarea
      name="textarea"
      onChange={handleTextAreaOnChange}
      value={value}
      className="p-4 flex-1 w-full"
    />
  )
}
