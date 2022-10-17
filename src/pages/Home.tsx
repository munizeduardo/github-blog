import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import { Profile } from '../components/Profile'
import { useBlogContext } from '../context/BlogContext'

export function Home() {
  const { posts, handleFilterPosts, filterPosts } = useBlogContext()

  return (
    <div className="flex flex-col w-full max-w-[864px] h-screen my-0 mx-auto">
      <div className="flex items-center justify-center my-[-88px] mb-[72px]">
        <Profile />
      </div>

      <div className="flex justify-between">
        <h3 className="text-md font-bold text-base-subtitle mb-3">Posts</h3>
        <span className="text-xs text-base-span">{posts.length} posts</span>
      </div>

      <input
        type="search"
        className="flex py-3 px-4  bg-base-input h-[50px] mb-12 rounded-md outline-none border-[1px] border-base-border placeholder:text-base-label focus:ring-2 ring-base-blue"
        placeholder="Search posts"
        onChange={handleFilterPosts}
      />

      <div className="grid grid-cols-2 gap-8">
        {filterPosts &&
          filterPosts.map((item) => (
            <Link
              key={item.id}
              to={`post/${item.number}`}
              className="flex flex-1 flex-col p-8 max-w-[416px] max-h-[260px] bg-base-post rounded-[10px]"
            >
              <div className="flex mb-5 items-center justify-between">
                <h2 className="text-lg text-base-title">{item.title}</h2>
                <span className="text-xs text-base-span">{item.date}</span>
              </div>

              <span className="text-sm text-base-text text-ellipsis overflow-hidden">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="whitespace-pre-wrap"
                >
                  {item.content}
                </ReactMarkdown>
              </span>
            </Link>
          ))}
      </div>
    </div>
  )
}
