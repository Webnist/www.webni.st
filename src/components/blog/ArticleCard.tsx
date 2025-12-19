import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import type { BlogPost } from '@/types/blog';

interface ArticleCardProps {
  post: BlogPost;
  href: string;
  tags?: string[];
  categoryLabel?: string;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}.${month}.${day}`;
}

/**
 * 記事カード
 */
export function ArticleCard({
  post,
  href,
  tags = [],
  categoryLabel,
}: ArticleCardProps) {
  const imageUrl = post.meta?.og_image;
  const displayTags = tags.slice(0, 3);
  const resolvedCategoryLabel =
    categoryLabel ?? post.articleMeta?.article_kind ?? post.category;

  return (
    <Card
      variant="default"
      className="relative overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(129deg,rgba(15,18,28,0.85)_0%,rgba(10,12,18,0.75)_100%)] p-0 shadow-[0px_8px_32px_rgba(0,0,0,0.4),0px_2px_8px_rgba(0,0,0,0.2)]"
    >
      <Link href={href} className="block h-full">
        <div className="relative h-[210px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0d14] to-[#050609]" />
          {imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-70"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,150,0,0.12),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.12),transparent_45%)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,6,9,0.8)] via-[rgba(0,0,0,0)] to-[rgba(0,0,0,0)]" />
          <span className="absolute left-[16px] top-[19px] inline-flex h-[26px] items-center rounded-full border border-[rgba(255,150,0,0.2)] bg-[rgba(255,255,255,0.05)] px-[13px] py-[5px] text-[12px] font-medium leading-[16px] text-[#ff9600]">
            {resolvedCategoryLabel}
          </span>
        </div>

        <div className="px-[24px] pb-[24px] pt-[16px]">
          <h3
            className="line-clamp-2 text-[20px] font-bold leading-[28px] text-[#f5f5f7]"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          <div
            className="mt-[12px] line-clamp-2 text-[14px] leading-[22.75px] text-[#a0a3b1]"
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />

          <div className="mt-[12px]">
            <div className="flex items-center gap-3 text-[12px] leading-[16px] text-[#6b6e7d]">
              <span className="font-['JetBrains_Mono',monospace]">{formatDate(post.date)}</span>
              <span className="h-[4px] w-[4px] rounded-full bg-[#6b6e7d]" />
            </div>
            {displayTags.length > 0 && (
              <div className="mt-[12px] flex flex-wrap gap-2">
                {displayTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex h-[26px] items-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] px-[13px] py-[5px] text-[12px] font-medium leading-[16px] text-[#a0a3b1]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 shadow-[inset_0px_1px_0px_rgba(255,255,255,0.05)]" />
      </Link>
    </Card>
  );
}
