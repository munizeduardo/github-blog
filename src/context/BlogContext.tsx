import axios from 'axios'
import {
  createContext,
  ReactNode,
  ChangeEvent,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { formatDistanceToNow } from 'date-fns'

export const api = axios.create({
  baseURL: 'https://api.github.com/',
})

interface ProfileProps {
  login: string
  name: string
  avatar_url: string
  html_url: string
  bio: string
  followers: number
}

interface PostInfo {
  title: string
  url: string
  date: string
  content: string
  id: number
  number: number
}

interface BlogContextProps {
  user: ProfileProps
  posts: PostInfo[]
  filterPosts: PostInfo[]
  specificPost: PostInfo
  findPost(number: number): PostInfo
  handleFilterPosts(e: ChangeEvent<HTMLInputElement>): void
  fetchSpecificPost(number: number): void
}

interface BlogProviderProps {
  children: ReactNode
}

const BlogContext = createContext({} as BlogContextProps)

export function BlogContextProvider({ children }: BlogProviderProps) {
  const [user, setUser] = useState({} as ProfileProps)
  const [posts, setPosts] = useState<PostInfo[]>([])
  const [specificPost, setSpecificPost] = useState<PostInfo>({} as PostInfo)
  const [filterPosts, setFilterPosts] = useState(posts)

  const getUserInfo = async () => {
    const { data } = await api.get('users/munizeduardo')

    if (data) {
      setUser(data)
    }
  }

  const findPost = useCallback(
    (number: number): PostInfo => {
      const post = posts.find((item) => item.number === number)
      return post!
    },
    [posts],
  )

  const fetchBlogPosts = async () => {
    const { data } = await api.get('repos/munizeduardo/github-blog/issues')
    if (data) {
      const blogPosts = data.map((post: any) => ({
        date: formatDistanceToNow(new Date(post.created_at), {
          addSuffix: true,
        }),
        title: post.title,
        url: post.html_url,
        content: post.body,
        id: post.id,
        number: post.number,
      }))
      setPosts(blogPosts)
    }
  }

  async function fetchSpecificPost(number: number) {
    const { data } = await api.get(
      `repos/munizeduardo/github-blog/issues/${number}`,
    )
    if (data) {
      const selectedPost = {
        date: formatDistanceToNow(new Date(data.created_at), {
          addSuffix: true,
        }),
        title: data.title,
        url: data.html_url,
        content: data.body,
        id: data.id,
        number: data.number,
      }
      setSpecificPost(selectedPost)
    }
  }

  // const fetchSpecificPost = async (number: number) => {
  //   const data = await api
  //     .get(`repos/munizeduardo/github-blog/issues/${number}`)
  //     .then((res) => {
  //       setSpecificPost(res.data)
  //     })
  // }

  const handleFilterPosts = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setFilterPosts((state) => [
        ...posts.filter((item) => item.title.includes(e.target.value)),
      ])
    } else {
      setFilterPosts(posts)
    }
  }

  useEffect(() => {
    getUserInfo()
    fetchBlogPosts()
  }, [])

  useEffect(() => {
    setFilterPosts(posts)
  }, [posts])

  return (
    <BlogContext.Provider
      value={{
        user,
        posts,
        findPost,
        handleFilterPosts,
        filterPosts,
        fetchSpecificPost,
        specificPost,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}

export const useBlogContext = () => {
  const context = useContext(BlogContext)

  return context
}
