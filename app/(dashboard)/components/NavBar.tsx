'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: '图片生成', href: '/image' },
    { label: '视频生成', href: '/video' },
    { label: '动作控制', href: '/video-motion-control' },
  ];

  const isActive = (href: string) => pathname.endsWith(href.replace('/', ''));

  return (
    <div className="h-16 border-b border-[#2a2a2a] flex items-center px-6 gap-8 bg-[#0e0f0f] flex-shrink-0">
      <div className="flex gap-8">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => router.push(item.href)}
            className={`text-sm transition ${
              isActive(item.href)
                ? 'text-white border-b-2 border-[#6366f1] pb-1'
                : 'text-[#a0a0a0] hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
