import { allPosts } from "contentlayer/generated";

const posts = allPosts.sort((a, b) => b.date.localeCompare(a.date));

const totalPosts = posts.length;
const postsPerPage = 2;
export const totalPages = Math.ceil(totalPosts / postsPerPage);

export const getPaginatedPosts = (currentPage: number = 1) => {
  if (currentPage > totalPages || currentPage < 1) {
    throw new Error("Invalid page number");
  }

  const offset = (currentPage - 1) * postsPerPage;
  return posts.slice(offset, offset + postsPerPage);
};
