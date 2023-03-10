'use client';

import { useRouter } from 'next/navigation';
import ILevel from '../(models)/level.interface';
import { cacheLevel } from '../../../lib/cache';

export default function LevelButton({
  level = undefined,
  isAI = false,
  customClass = '',
}: {
  level?: ILevel;
  isAI?: boolean;
  customClass?: string;
}) {
  const router = useRouter();

  const goToLevel = () => {
    if (isAI) {
      return router.push('/ai');
    }
    if (level) {
      cacheLevel(level);
      return router.push(`/level`);
    }
  };

  return (
    <button
      aria-label={`level button: level ${level?.name ?? 'ai'}`}
      data-testid={`level-link-${level?.name ?? 'ai'}`}
      className={`${
        isAI && 'unicorn-color'
      } h-full w-full text-xs lg:text-2xl px-2 py-2 lg:px-10 lg:py-4 break-words ${customClass}`}
      onClick={() => goToLevel()}
    >
      {isAI ? 'AI Mode' : level?.name}
    </button>
  );
}
