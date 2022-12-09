export default function PopupModal({
  children,
  id,
}: {
  children: React.ReactNode
  id: string
}) {
  return (
    <>
      <input type='checkbox' id={id} className='modal-toggle' />
      <label
        htmlFor={id}
        className='modal modal-bottom sm:modal-middle cursor-pointer'>
        <label className='modal-box relative' htmlFor=''>
          {children}
        </label>
      </label>
    </>
  )
}
