import Icon from 'widgets/icon'
import { ChangeEventHandler } from 'react'

export default function ProfileImagePicker({
  id,
  upload,
} : {
  id: string,
  upload: ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <label htmlFor={id}>
      <Icon src="add.png" size={14} />
      <input
        id={id}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        style={{ display: 'none' }}
        onChange={upload}
      />
    </label>
  )
}
