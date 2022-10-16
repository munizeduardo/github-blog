import {
  Calendar,
  CaretLeft,
  ChatCircle,
  GithubLogo,
  LinkSimple,
} from 'phosphor-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useBlogContext } from '../context/BlogContext'

export function Post() {
  const { user, fetchSpecificPost, specificPost } = useBlogContext()
  const { issueNumber } = useParams()
  // const post = findPost(Number(issueNumber))

  useEffect(() => {
    fetchSpecificPost(Number(issueNumber))
  }, [])

  return (
    <div className="flex flex-col w-full max-w-[864px] h-screen my-0 mx-auto">
      <div className="flex items-center justify-center my-[-88px] mb-0">
        <div className="flex flex-col flex-1 max-w-[864px] py-8 px-10 bg-base-profile rounded-lg drop-shadow">
          <div className="flex justify-between text-base-blue text-link mb-5">
            <Link to="/" className="flex gap-2 items-center">
              <CaretLeft weight="bold" />
              GO BACK
            </Link>

            <div className="flex gap-2 items-center">
              <a href={specificPost.url}>VIEW ON GITHUB</a>
              <LinkSimple />
            </div>
          </div>
          <h2 className="mb-2 text-xl text-base-title font-bold">
            {specificPost.title}
          </h2>
          <div className="flex gap-8 items-center">
            <a
              href={user.html_url}
              className="flex items-center gap-2 text-base-span"
            >
              <GithubLogo size={18} weight="fill" color="#3A536B" />
              {user.login}
            </a>
            <span className="flex items-center gap-2 text-base-span">
              <Calendar size={18} weight="fill" color="#3A536B" />
              {specificPost.date}
            </span>
            <span className="flex items-center gap-2 text-base-span">
              <ChatCircle size={18} weight="fill" color="#3A536B" /> 2 comments
            </span>
          </div>
        </div>
      </div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className="py-10 px-8 whitespace-pre-wrap"
      >
        {specificPost.content}
      </ReactMarkdown>
    </div>
  )
}
