import { allPosts } from "contentlayer/generated";
import { getPagination } from "@/app/utils/pagination";

import PostsLists from "@/app/components/PostsLists";
import Pagination from "@/app/components/Pagination";

import { notFound } from "next/navigation";

interface Props {
  params: {
    number: string;
  };
}

export const generateStaticParams = () => {
  return Array.from({ length: allPosts.length }).map((_, index) => ({
    number: `${index + 1}`,
  }));
};

const LayoutPages = ({ params }: Props) => {
  let arrayCurrentPosts;
  let totalPagesNumber;
  try {
    const { currentItems, totalPages } = getPagination(
      allPosts,
      2,
      params.number
    );
    arrayCurrentPosts = currentItems;
    totalPagesNumber = totalPages;
  } catch (error) {
    notFound();
  }

  return (
    <div className="grid gap-4">
      <PostsLists posts={arrayCurrentPosts} />

      {totalPagesNumber > 1 && (
        <Pagination
          totalPages={totalPagesNumber}
          currentPage={parseInt(params.number)}
        />
      )}
    </div>
  );
};
export default LayoutPages;
