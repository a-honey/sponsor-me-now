import PostItem from '../../../components/common/PostItem';
import styles from '../styles/Main.News.module.scss';
import { QueryFunction, useInfiniteQuery } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import { AxiosResponse } from 'axios';

interface PostsDataType {
  pages: {
    totalPage: number;
    currentPage: number;
    posts: {
      id: number;
      title: string;
      content: string;
      createdAt: string;
      updatedAt: string;
      authorId: number;
      viewCount: number;
      postImg: null | string;
    }[];
  }[];
}
export interface IRepository {
  total_count: number;
  incomplete_results: boolean;
  items: PostsDataType[];
}

const News = () => {
  const page = 1;

  const fetchRepositories: QueryFunction<
    IRepository,
    [string, string, string]
  > = async ({ queryKey }) => {
    const [_, page, search] = queryKey;
    return await instance
      .get<IRepository>(
        `/post/list?page=${page}&limit=7${search && `&search=${search}`}`,
      )
      .then((res) => res.data);
  };
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...result
  } = useInfiniteQuery<IRepository, Error, PostsDataType>({
    queryKey: ['postList', page.toString(), 'all'] as [string, string, string],
    queryFn: fetchRepositories,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
  });

  console.log(result?.data);
  return (
    <div className={styles.container}>
      {result?.data?.pages[0].posts.map((item) => (
        <PostItem key={item.id} data={item} />
      ))}
    </div>
  );
};

export default News;
