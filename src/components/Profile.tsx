import { GithubLogo, LinkSimple, Users } from 'phosphor-react'
import { useBlogContext } from '../context/BlogContext'

export function Profile() {
  const { user } = useBlogContext()

  return (
    <div className="flex items-center flex-1 max-w-[864px]  gap-8 py-8 px-10 bg-base-profile rounded-lg drop-shadow">
      <img src={user.avatar_url} alt="" className="max-w-[148px] rounded" />
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center">
          <h2 className="text-base-title text-xl font-bold mb-2">
            {user.name}
          </h2>
          <div>
            <a
              href={user.html_url}
              className="flex items-center gap-2 text-base-blue text-link"
            >
              GITHUB
              <LinkSimple />
            </a>
          </div>
        </div>

        <p className="mb-6 text-sm">{user.bio}</p>

        <footer className="flex gap-6">
          <div className="flex gap-2 items-center text-sm text-base-subtitle">
            <GithubLogo size={18} weight="fill" className="text-base-label" />
            <span>{user.login}</span>
          </div>

          {/* <div className="flex gap-2 items-center text-sm text-base-subtitle">
            <Buildings size={18} weight="fill" className="text-base-label" />
            <span>TBA</span>
          </div> */}

          <div className="flex gap-2 items-center text-sm text-base-subtitle">
            <Users size={18} weight="fill" className="text-base-label" />
            <span>{user.followers} followers</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
