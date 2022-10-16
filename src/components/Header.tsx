import HeaderCover from '../assets/HeaderCover.png'

export function Header() {
  return (
    <div className="flex items-center w-full max-w-[1440px] my-0 mx-auto bg-base-profile">
      <img src={HeaderCover} alt="" />
    </div>
  )
}
