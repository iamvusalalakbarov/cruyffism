"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { getArticles, deleteArticle } from "@/actions/article-actions";
import { formatDate } from "@/lib/utils";
import { useToastContext } from "@/contexts/toast-context";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function ArticlesPage() {
  const { addToast } = useToastContext();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      setIsLoading(true);
      const { articles, error } = await getArticles();

      if (error) {
        setError(error);
        addToast({
          title: "Error",
          description: error,
          type: "destructive",
        });
      } else {
        setArticles(articles);
      }

      setIsLoading(false);
    }

    fetchArticles();
  }, [addToast]);

  const handleDeleteClick = (articleId: number) => {
    setArticleToDelete(articleId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (articleToDelete) {
      const { success, error } = await deleteArticle(articleToDelete);

      if (success) {
        // Remove the deleted article from the state
        setArticles(articles.filter((article) => article.id !== articleToDelete));
        addToast({
          title: "Success",
          description: "Article deleted successfully",
          type: "success",
        });
      } else {
        setError(error || "Failed to delete article");
        addToast({
          title: "Error",
          description: error || "Failed to delete article",
          type: "destructive",
        });
      }

      setArticleToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-md">Error: {error}</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Articles</h2>
        <Link href="/admin/dashboard/articles/new">
          <Button className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700">
            <Plus className="mr-2 h-4 w-4" />
            New Article
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white dark:bg-neutral-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
            <tr className="bg-gray-50 dark:bg-neutral-700">
              <th className="text-left p-3 font-medium">Title</th>
              <th className="text-left p-3 font-medium">Date</th>
              <th className="text-left p-3 font-medium">Views</th>
              <th className="text-left p-3 font-medium">Tags</th>
              <th className="text-right p-3 font-medium">Actions</th>
            </tr>
            </thead>
            <tbody>
            {articles.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No articles found. Create your first article to get started.
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr key={article.id} className="border-t dark:border-gray-700">
                  <td className="p-3">
                    <Link
                      href={`/articles/${article.slug}`}
                      className="hover:text-orange-600 dark:hover:text-orange-400"
                      target="_blank"
                    >
                      <span className="line-clamp-1">{article.title}</span>
                    </Link>
                  </td>
                  <td className="p-3 whitespace-nowrap">{formatDate(article.date_published)}</td>
                  <td className="p-3">{article.view_count.toLocaleString()}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {article.tags &&
                        article.tags
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((tag: string) => (
                            <span
                              key={tag}
                              className="inline-block rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                            >
                                {tag}
                              </span>
                          ))}
                      {article.tags && article.tags.filter(Boolean).length > 2 && (
                        <span
                          className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                            +{article.tags.filter(Boolean).length - 2}
                          </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/dashboard/articles/edit/${article.id}`}>
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                        onClick={() => handleDeleteClick(article.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Article"
        message="Are you sure you want to delete this article? This action cannot be undone."
      />
    </div>
  );
}
